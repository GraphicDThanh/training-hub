using Microsoft.AspNetCore.Identity;
using StoreManagement.Data;
using StoreManagement.Entities;

namespace StoreManagement.Extensions;

public static class IdentityExtensions
{

    public static IServiceCollection AddIdentityFramework(this IServiceCollection services)
    {
        services.AddIdentityApiEndpoints<User>(
            options => options.SignIn.RequireConfirmedAccount = true)
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<StoreManagementDbContext>()
                .AddSignInManager()
                .AddDefaultTokenProviders();

        return services;
    }
}
