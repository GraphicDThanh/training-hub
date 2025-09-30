using System.Net;
using StoreManagement.Data;
using StoreManagement.IntegrationTests.Helpers;

namespace StoreManagement.IntegrationTests.Common;
public abstract class BaseIntegrationTest : IClassFixture<CustomWebAppFactory>
{
    private readonly IServiceScope _scope;
    private readonly CustomWebAppFactory _factory;
    private readonly StoreManagementDbContext _dbContext;

    protected BaseIntegrationTest(CustomWebAppFactory factory)
    {
        _factory = factory;
        _scope = _factory.Services.CreateScope();
        _dbContext = _scope.ServiceProvider.GetRequiredService<StoreManagementDbContext>();
        _dbContext.Database.EnsureCreatedAsync();


        // seed data
        Utilities.ReinitializeDbForTests(_scope.ServiceProvider);
    }

    public static void AssertOkOrEmpty(HttpResponseMessage response)
    {
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Equal(0, response.Content.Headers.ContentLength);
    }
}
