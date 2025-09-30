using NSubstitute.ReceivedExtensions;
using StoreManagement.Patterns;
using StoreManagement.Specifications;

namespace StoreManagement.UnitTests.Services.ProductTests;

public class ProductListTests : BaseProductServiceTests
{
    [Fact]
    public async Task GetAllAsync_Should_ReturnSuccess()
    {
        // Arrange
        var products = _fixture.CreateMany<Product>(3).ToList();
        MockGetAllSpecificationAsync(products);

        // Act
        var result = await _service.GetAllAsync(null, null);

        // Assert
        // - call repository
        await _repositoryMock.Received(1).GetAllSpecificationAsync(Arg.Any<ProductsSpec>());
        // - result
        result.IsSuccess.Should().BeTrue();
    }

    [Fact]
    public async Task GetAllAsync_Should_ReturnSuccess_FromCache()
    {
        // Arrange
        var products = _fixture.CreateMany<Product>(3).ToList();
        MockCacheGet(CacheKeys.ProductsWithFilters(null, null), products);

        // Act
        var result = await _service.GetAllAsync(null, null);

        // Assert
        // - not call repository
        await _repositoryMock.Received(0).GetAllSpecificationAsync(Arg.Any<ProductsSpec>());
        // - result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(products);
    }

    [Fact]
    public async Task GetAllAsync_Should_ReturnSuccess_WhenFilterBySearchTerm()
    {
        // Arrange
        var products = _fixture.CreateMany<Product>(3).ToList();
        MockGetAllSpecificationAsync(products);

        // Act
        var result = await _service.GetAllAsync("searchTerm", null);

        // Assert
        // - call repository
        await _repositoryMock.Received(1).GetAllSpecificationAsync(Arg.Any<ProductsSpec>());
        // - result
        result.IsSuccess.Should().BeTrue();
    }

    [Fact]
    public async Task GetAllAsync_Should_ReturnSuccess_WhenFilterBySearchTermHitCache()
    {
        // Arrange
        var products = _fixture.CreateMany<Product>(3).ToList();
        var keyCache = CacheKeys.ProductsWithFilters("searchTerm", null);
        MockCacheGet(keyCache, products);

        // Act
        var result = await _service.GetAllAsync("searchTerm", null);

        // Assert
        // - not call repository
        await _repositoryMock.Received(0).GetAllSpecificationAsync(Arg.Any<ProductsSpec>());
        // - not call cache set
        _cacheServiceMock.Received(0).SetAndSyncKeyToList(
            Arg.Any<string>(), Arg.Any<PaginatedList<Product>>(), Arg.Any<string>());
        // - result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(products);
    }

    [Fact]
    public async Task GetAllAsync_Should_ReturnSuccess_WhenOrder()
    {
        // Arrange
        var products = _fixture.CreateMany<Product>(3).ToList();
        MockGetAllSpecificationAsync(products);

        // Act
        var result = await _service.GetAllAsync("searchTerm", "Name");

        // Assert
        // - call repository
        await _repositoryMock.Received(1).GetAllSpecificationAsync(Arg.Any<ProductsSpec>());
        // - result
        result.IsSuccess.Should().BeTrue();
    }

    [Fact]
    public async Task GetAllAsync_Should_ReturnSuccess_WhenOrderHitCache()
    {
        // Arrange
        var products = _fixture.CreateMany<Product>(3).ToList();
        var keyCache = CacheKeys.ProductsWithFilters("searchTerm", "Name");
        MockCacheGet(keyCache, products);

        // Act
        var result = await _service.GetAllAsync("searchTerm", "Name");

        // Assert
        // - not call repository
        await _repositoryMock.Received(0).GetAllSpecificationAsync(Arg.Any<ProductsSpec>());
        // - not call cache set
        _cacheServiceMock.Received(0).SetAndSyncKeyToList(
            Arg.Any<string>(), Arg.Any<PaginatedList<Product>>(), Arg.Any<string>());
        // - result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(products);
    }

    [Fact]
    public async Task GetAllAsync_Should_ReturnFail_WhenThrowError()
    {
        // Arrange
        var products = _fixture.CreateMany<Product>(3);
        MockGetAllSpecificationAsyncThrowError();

        // Act
        var result = await _service.GetAllAsync(null, null);

        // Assert
        // - call repository
        await _repositoryMock.Received(1).GetAllSpecificationAsync(Arg.Any<ProductsSpec>());
        // - not call cache set
        _cacheServiceMock.Received(0).SetAndSyncKeyToList(
            Arg.Any<string>(), Arg.Any<PaginatedList<Product>>(), Arg.Any<string>());
        // - result
        result.IsFailure.Should().BeTrue();
    }
}

public class ProductListPaginationTests : BaseProductServiceTests
{
    [Fact]
    public async Task GetAllAsyncPagination_Should_ReturnSuccess()
    {
        // Arrange
        var products = _fixture.CreateMany<Product>(3).ToList();
        var productsPaginated = new PaginatedList<Product>(products.AsQueryable(), 3, 1, 2);
        MockGetAllSpecificationPaginationAsync(productsPaginated);

        // Act
        var result = await _service.GetAllWithPagingAsync(null, null, 1, 2);

        // Assert
        // - call repository
        await _repositoryMock.Received(1).GetAllSpecificationPaginationAsync(Arg.Any<ProductsSpec>());
        // - result
        result.IsSuccess.Should().BeTrue();
        // todo: check result value
    }

    [Fact]
    public async Task GetAllAsyncPagination_Should_ReturnSuccess_FromCache()
    {
        // Arrange
        var products = _fixture.CreateMany<Product>(3).ToList();
        var productsPaginated = new PaginatedList<Product>(products.AsQueryable(), 3, 1, 2);
        MockCacheGet(CacheKeys.ProductsWithFiltersAndPagination(null, null, 1, 2), productsPaginated);

        // Act
        var result = await _service.GetAllWithPagingAsync(null, null, 1, 2);

        // Assert
        // - not call repository
        await _repositoryMock.Received(0).GetAllSpecificationPaginationAsync(Arg.Any<ProductsSpec>());
        // - result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(productsPaginated);
    }

    [Fact]
    public async Task GetAllAsyncPagination_Should_ReturnSuccess_WhenFilterBySearchTerm()
    {
        // Arrange
        var products = _fixture.CreateMany<Product>(3);
        var productsPaginated = new PaginatedList<Product>(products.AsQueryable(), 3, 1, 2);
        MockGetAllSpecificationPaginationAsync(productsPaginated);

        // Act
        var result = await _service.GetAllWithPagingAsync("searchTerm", null, 1, 2);

        // Assert
        // - call repository
        await _repositoryMock.Received(1).GetAllSpecificationPaginationAsync(Arg.Any<ProductsSpec>());
        // - result
        result.IsSuccess.Should().BeTrue();
        // result is null - mock not implemented
        // result.Value.Should().Be(productsPaginated);
    }

    [Fact]
    public async Task GetAllAsyncPagination_Should_ReturnSuccess_WhenFilterBySearchTermHitCache()
    {
        // Arrange
        var products = _fixture.CreateMany<Product>(3).ToList();
        var productsPaginated = new PaginatedList<Product>(products.AsQueryable(), 3, 1, 2);
        var keyCache = CacheKeys.ProductsWithFiltersAndPagination("searchTerm", null, 1, 2);
        MockCacheGet(keyCache, productsPaginated);

        // Act
        var result = await _service.GetAllWithPagingAsync("searchTerm", null, 1, 2);

        // Assert
        // - not call repository
        await _repositoryMock.Received(0).GetAllSpecificationPaginationAsync(Arg.Any<ProductsSpec>());
        // - not call cache set
        _cacheServiceMock.Received(0).SetAndSyncKeyToList(
            Arg.Any<string>(), Arg.Any<PaginatedList<Product>>(), Arg.Any<string>());
        // - result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(productsPaginated);
    }

    [Fact]
    public async Task GetAllAsyncPagination_Should_ReturnSuccess_WhenOrder()
    {
        // Arrange
        var products = _fixture.CreateMany<Product>(3);
        var productsPaginated = new PaginatedList<Product>(products.AsQueryable(), 3, 1, 2);
        MockGetAllSpecificationPaginationAsync(productsPaginated);

        // Act
        var result = await _service.GetAllWithPagingAsync("searchTerm", "Name", 1, 2);

        // Assert
        // - call repository
        await _repositoryMock.Received(1).GetAllSpecificationPaginationAsync(Arg.Any<ProductsSpec>());
        // - result
        result.IsSuccess.Should().BeTrue();
        // result is null - mock not implemented
        // result.Value.Should().Be(productsPaginated);
    }

    [Fact]
    public async Task GetAllAsyncPagination_Should_ReturnSuccess_WhenOrderHitCache()
    {
        // Arrange
        var products = _fixture.CreateMany<Product>(3).ToList();
        var productsPaginated = new PaginatedList<Product>(products.AsQueryable(), 3, 1, 2);
        var keyCache = CacheKeys.ProductsWithFiltersAndPagination("searchTerm", "Name", 1, 2);
        MockCacheGet(keyCache, productsPaginated);

        // Act
        var result = await _service.GetAllWithPagingAsync("searchTerm", "Name", 1, 2);

        // Assert
        // - not call repository
        await _repositoryMock.Received(0).GetAllSpecificationPaginationAsync(Arg.Any<ProductsSpec>());
        // - not call cache set
        _cacheServiceMock.Received(0).SetAndSyncKeyToList(
            Arg.Any<string>(), Arg.Any<PaginatedList<Product>>(), Arg.Any<string>());
        // - result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(productsPaginated);
    }

    [Fact]
    public async Task GetAllAsyncPagination_Should_ReturnFail_WhenThrowError()
    {
        // Arrange
        MockGetAllSpecificationPaginationAsyncThrowError();

        // Act
        var result = await _service.GetAllWithPagingAsync(null, null, 1, 2);

        // Assert
        // - call repository
        await _repositoryMock.Received(1).GetAllSpecificationPaginationAsync(Arg.Any<ProductsSpec>());
        // - not call cache set
        _cacheServiceMock.Received(0).SetAndSyncKeyToList(
            Arg.Any<string>(), Arg.Any<PaginatedList<Product>>(), Arg.Any<string>());
        // - result
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ErrorCode.InternalError);
        result.Error.Description.Should().Be(ErrorMessage.InternalError);
    }
}
