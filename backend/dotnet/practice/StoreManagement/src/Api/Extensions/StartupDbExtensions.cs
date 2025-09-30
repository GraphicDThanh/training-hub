using StoreManagement.Data;

namespace StoreManagement.Extensions;

public static class StartupDbExtensions
{
    public static async void DbInitAsync(this IHost host, IWebHostEnvironment env)
    {
        using var scope = host.Services.CreateScope();

        var dbInitializer = new DbInitializer(scope.ServiceProvider, env);
        await dbInitializer.SeedAsync();
    }
}

