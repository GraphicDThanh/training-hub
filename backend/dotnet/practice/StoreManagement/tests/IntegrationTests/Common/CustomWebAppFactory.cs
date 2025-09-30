using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Testcontainers.SqlEdge;
using StoreManagement.Data;
using StoreManagement.IntegrationTests.Helpers;

namespace StoreManagement.IntegrationTests.Common;

public class CustomWebAppFactory :
    WebApplicationFactory<Program>,
    IAsyncLifetime
{
    private readonly SqlEdgeContainer _dbContainer = new SqlEdgeBuilder()
        .WithImage("mcr.microsoft.com/azure-sql-edge:1.0.7")
        .Build();

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureTestServices(services =>
        {
            // Remove configure in entry point 'Program'
            var dbContextDescriptor = services.SingleOrDefault(
                d => d.ServiceType ==
                    typeof(DbContextOptions<StoreManagementDbContext>));
            if (dbContextDescriptor != null)
                services.Remove(dbContextDescriptor);

            // Add configure for integration testing with test db
            services.AddDbContext<StoreManagementDbContext>(
                options => options.UseSqlServer(
                    "Server=localhost,8002; Database=StoreManagementTest; User Id=sa; Password=1StrongPassword@; TrustServerCertificate=true; MultipleActiveResultSets=true;"));
        });

        builder.UseEnvironment("Test");
    }

    public async Task InitializeAsync()
    {
        await _dbContainer.StartAsync();
    }

    // Tell compiler that
    // this is different method with 'new' keyword
    public new Task DisposeAsync()
    {
        return _dbContainer.StopAsync();
    }
}
