using StoreManagement.Data;
using StoreManagement.Entities;
using StoreManagement.Enums;
using StoreManagement.Repositories;

namespace StoreManagement.IntegrationTests.Helpers;

public static class Utilities
{
    public static void InitializeDbForTests(StoreManagementDbContext dbContext)
    {
        dbContext.Products.AddRange(GetSeedingProducts());
        dbContext.SaveChanges();
    }

    public static async void ReinitializeDbForTests(IServiceProvider serviceProvider)
    {
        var dbContext = serviceProvider.GetRequiredService<StoreManagementDbContext>();
        var userRepository = serviceProvider.GetRequiredService<IUserRepository>();
        var roleRepository = serviceProvider.GetRequiredService<IRoleRepository>();

        await SeedRolesAsync(dbContext, roleRepository);
        await SeedAdminUserAsync(dbContext, userRepository);
        await SeedNormalUsersAsync(dbContext, userRepository);

        dbContext.Products.RemoveRange(dbContext.Products);
        InitializeDbForTests(dbContext);
    }

    private static async Task SeedRolesAsync(StoreManagementDbContext dbContext, IRoleRepository roleRepository)
    {
        await roleRepository.CreateAsync(UserRole.Admin);
        await roleRepository.CreateAsync(UserRole.User);
        await dbContext.SaveChangesAsync();
    }

    private static async Task SeedAdminUserAsync(StoreManagementDbContext dbContext, IUserRepository userRepository)
    {

        var admin = new User
        {
            UserName = "admin@gmail.com",
            Email = "admin@gmail.com",
            Name = "Admin"
        };

        await userRepository.AddAsync(admin, "abcABC@123");
        // auto confirm email for admin
        var adminUser = await userRepository.GetByEmailAsync("admin@gmail.com");
        adminUser!.EmailConfirmed = true;
        dbContext.Users.Attach(adminUser);

        // add admin role
        await userRepository.SetRoleAsync(adminUser, UserRole.Admin);

        // save changes
        await dbContext.SaveChangesAsync();
    }

    private static async Task SeedNormalUsersAsync(StoreManagementDbContext dbContext, IUserRepository userRepository)
    {
        var userEmail = "user@store.com";
        var userPassword = "abcABC@123";
        var userName = "User Store";

        var user = new User
        {
            UserName = userEmail,
            Email = userEmail,
            Name = userName
        };

        await userRepository.AddAsync(user, userPassword);

        // auto confirm email for user
        var normalUser = await userRepository.GetByEmailAsync(userEmail);
        normalUser!.EmailConfirmed = true;
        dbContext.Users.Attach(normalUser);

        // add admin role
        await userRepository.SetRoleAsync(normalUser, UserRole.User);

        // save changes
        await dbContext.SaveChangesAsync();
    }


    public static List<Product> GetSeedingProducts()
    {
        return new List<Product>()
        {
            new(){
                Name = "product 1",
                Description = "description 1",
                Quantity = 1,
                Price = 10,
                ImageUrl = "http://www.example.com/image1.jpg"
            },
            new(){
                Name = "product 2",
                Description = "description 2",
                Quantity = 2,
                Price = 50,
                ImageUrl = "http://www.example.com/image2.jpg"
            },
        };
    }
}
