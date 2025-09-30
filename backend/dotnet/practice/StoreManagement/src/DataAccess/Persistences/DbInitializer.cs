using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using StoreManagement.Repositories;

namespace StoreManagement.Data;

public class DbInitializer(IServiceProvider serviceProvider, IWebHostEnvironment env)
{
    private readonly StoreManagementDbContext DbContext = serviceProvider.GetRequiredService<StoreManagementDbContext>();
    private readonly IUserRepository UserRepository = serviceProvider.GetRequiredService<IUserRepository>();
    private readonly IRoleRepository RoleRepository = serviceProvider.GetRequiredService<IRoleRepository>();
    private readonly IConfiguration Configuration = serviceProvider.GetRequiredService<IConfiguration>();
    private readonly IWebHostEnvironment Env = env;

    public async Task SeedAsync()
    {
        try
        {
            // Ensure database is created
            await DbContext.Database.EnsureCreatedAsync();

            // Seed data
            await SeedRolesAsync();
            await SeedAdminUsersAsync();

            // Seed data for development or testing environment
            if (!Env.IsProduction())
                await SeedProductsAsync();
            await SeedNormalUsersAsync();
        }
        catch (Exception error)
        {
            Console.WriteLine("An error {@error} occurred init the DB." + error);
        }
    }

    private async Task SeedRolesAsync()
    {
        if (DbContext.Roles.Any())
            return;

        await RoleRepository.CreateAsync(UserRole.Admin);
        await RoleRepository.CreateAsync(UserRole.User);
        await DbContext.SaveChangesAsync();
    }

    private async Task SeedAdminUsersAsync()
    {
        if (DbContext.Users.Any())
            return;

        if (string.IsNullOrEmpty(Configuration["AdminEmail"]))
        {
            throw new ArgumentException("AdminEmail is null");
        }
        if (string.IsNullOrEmpty(Configuration["AdminPassword"]))
        {
            throw new ArgumentException("AdminPassword is null");
        }

        var admin = new User
        {
            UserName = Configuration["AdminEmail"],
            Email = Configuration["AdminEmail"],
            Name = "Administrator"
        };

        await UserRepository.AddAsync(admin, Configuration["AdminPassword"]!);

        // auto confirm email for admin
        var adminUser = await UserRepository.GetByEmailAsync(Configuration["AdminEmail"]!);
        adminUser!.EmailConfirmed = true;
        DbContext.Users.Attach(adminUser);

        // add admin role
        await UserRepository.SetRoleAsync(adminUser, UserRole.Admin);

        // save changes
        await DbContext.SaveChangesAsync();
    }

    private async Task SeedNormalUsersAsync()
    {
        if (DbContext.Users.Where(user => user.Email != Configuration["AdminEmail"]).Any())
            return;


        var userEmail = "user@store.com";
        var userPassword = "abcABC@123";
        var userName = "User Store";

        var user = new User
        {
            UserName = userEmail,
            Email = userEmail,
            Name = userName
        };

        await UserRepository.AddAsync(user, userPassword);

        // auto confirm email for user
        var normalUser = await UserRepository.GetByEmailAsync(userEmail);
        normalUser!.EmailConfirmed = true;
        DbContext.Users.Attach(normalUser);

        // add admin role
        await UserRepository.SetRoleAsync(normalUser, UserRole.User);

        // save changes
        await DbContext.SaveChangesAsync();
    }

    private async Task SeedProductsAsync()
    {
        if (DbContext.Products.Any())
            return;

        for (int i = 1; i <= 20; i++)
        {
            var product = new Product
            {
                Name = $"product {i}",
                Quantity = i * 1000,
                Price = i * 10
            };
            DbContext.Products.Add(product);
        }

        await DbContext.SaveChangesAsync();
    }
}
