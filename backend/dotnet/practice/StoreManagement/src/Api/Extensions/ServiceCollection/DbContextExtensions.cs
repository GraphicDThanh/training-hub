using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StoreManagement.Data;

namespace StoreManagement.Extensions;
public static class DbContextExtensions
{
    public static IServiceCollection AddDbContextConfig(
        this IServiceCollection services, IConfiguration configuration)
    {
        var conn = configuration.GetConnectionString("DefaultConnection");
        if (conn.IsNullOrEmpty())
        {
            // try get conn from secret
            conn = configuration["ConnectionStrings__DefaultConnection"];
        }
        services.AddDbContext<StoreManagementDbContext>(
            options => options.UseSqlServer(conn));

        return services;
    }
}
