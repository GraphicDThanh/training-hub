using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using StoreManagement.Entities;
using StoreManagement.Repositories;
using StoreManagement.Data;

namespace StoreManagement.Tests.Repositories;

public class ProductRepositoryTests
{
    private List<Product> products;
    private async Task<StoreManagementDbContext> GetDataContext()
    {
        var options = new DbContextOptionsBuilder<StoreManagementDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        var context = new StoreManagementDbContext(options);
        await context.Database.EnsureCreatedAsync();

        await SeedData(context);

        return context;
    }

    private async Task SeedData(StoreManagementDbContext dbContext)
    {
        products = new List<Product>
        {
            new Product { Id = Guid.NewGuid().ToString(), Name = "Product 1", Price = 10 },
            new Product { Id = Guid.NewGuid().ToString(), Name = "Product 2", Description="Product 2 description", Price = 20 },
            new Product { Id = Guid.NewGuid().ToString(), Name = "Product 3", Price = 30, ImageUrl = "https://www.example.com/image.jpg"}
        };

        await dbContext.Products.AddRangeAsync(products);
        await dbContext.SaveChangesAsync();
    }

    [Fact]
    public async void ProductRepository_GetAllAsync_ReturnList()
    {
        // Arrange
        var context = await GetDataContext();
        var repository = new ProductRepository(context);

        // Act
        var result = await repository.GetAllAsync();

        // Assert
        result.Should().HaveCount(3);
        result.Should().BeOfType<List<Product>>();
        result.Should().ContainSingle(x => x.Name == "Product 1");
    }

    // [Fact(Skip = "Not implemented yet")]
    // public async void ProductRepository_GetAllPaginationAsync_ReturnListPaginated()
    // {
    //     // Arrange
    //     // Act
    //     // Assert
    // }

    [Fact]
    public async Task ProductRepository_GetById_ReturnProduct()
    {
        // Arrange
        var context = await GetDataContext();
        var repository = new ProductRepository(context);

        // Act
        var result = await repository.GetByIdAsync(products[0].Id);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType<Product>();
        result?.Name.Should().Be("Product 1");
    }

    [Fact]
    public async Task ProductRepository_Create_ReturnProduct()
    {
        // Arrange
        var context = await GetDataContext();
        var repository = new ProductRepository(context);
        var product = new Product
        {
            Name = "Product 4",
            Price = 40
        };

        // Act
        var result = await repository.AddAsync(product);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType<Product>();
        result.Name.Should().Be("Product 4");
    }

    [Fact]
    public async Task ProductRepository_Update_ReturnProduct()
    {
        // Arrange
        var context = await GetDataContext();
        var repository = new ProductRepository(context);
        var product = await repository.GetByIdAsync(products[0].Id);
        product.Price = 100;

        // Act
        var result = await repository.UpdateAsync(product);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType<Product>();
        result?.Price.Should().Be(100);
    }

    [Fact]
    public async Task ProductRepository_Delete_ReturnVoid()
    {
        // Arrange
        var context = await GetDataContext();
        var repository = new ProductRepository(context);
        var product = await repository.GetByIdAsync(products[0].Id);
        // Act
        await repository.DeleteAsync(product);

        // Assert
        var result = await context.Products.FindAsync(product.Id);
        result.Should().BeNull();
    }

    [Fact]
    public async Task ProductRepository_Exists_ReturnTrue()
    {
        // Arrange
        var context = await GetDataContext();
        var repository = new ProductRepository(context);

        // Act
        var result = await repository.ExistsAsync(products[0].Id);

        // Assert
        result.Should().BeTrue();
    }

    [Fact]
    public async Task ProductRepository_Exists_ReturnFalse()
    {
        // Arrange
        var context = await GetDataContext();
        var repository = new ProductRepository(context);

        // Act
        var result = await repository.ExistsAsync(Guid.NewGuid().ToString());

        // Assert
        result.Should().BeFalse();
    }
}
