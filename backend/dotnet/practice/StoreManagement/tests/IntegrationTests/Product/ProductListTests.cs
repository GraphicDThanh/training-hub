using Microsoft.AspNetCore.Mvc.Testing;
using StoreManagement.IntegrationTests.Common;

namespace StoreManagement.IntegrationTests.ProductTests;

public class ProductsControllerTests : BaseIntegrationTest
{
    private readonly HttpClient _client;

    public ProductsControllerTests(CustomWebAppFactory factory) : base(factory)
    {
        _client = factory.CreateClient(
            new WebApplicationFactoryClientOptions { AllowAutoRedirect = false });
    }

    [Fact]
    public async Task Get_Products()
    {
        // Arrange
        var response = await _client.GetAsync("/api/v1/products");

        // Act
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Contains("product 1", content);
        Assert.Contains("product 2", content);
    }
}
