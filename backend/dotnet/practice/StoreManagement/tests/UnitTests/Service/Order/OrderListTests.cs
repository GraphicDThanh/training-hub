using NSubstitute.ReceivedExtensions;
using StoreManagement.Enums;
using StoreManagement.Patterns;
using StoreManagement.Specifications;

namespace StoreManagement.UnitTests.Services.OrderTests;

public class OrderListTests : BaseOrderServiceTests
{
    [Fact]
    public async Task GetAllAsync_Should_ReturnSuccess()
    {
        // Arrange
        var products = _fixture.CreateMany<Order>(3).ToList();
        var user = _fixture.Create<User>();
        MockGetAllSpecificationAsync(products);
        MockClaimsPrincipalIsInRole(UserRole.Admin, true);
        // Act
        var result = await _service.GetAllAsync(user.Id, null, null, _claimsPrincipalMock);

        // Assert
        // - call repository
        await _repositoryMock.Received(1).GetAllSpecificationAsync(Arg.Any<OrdersSpec>());
        // - result
        result.IsSuccess.Should().BeTrue();
    }

    [Fact]
    public async Task GetAllAsync_Should_ReturnSuccess_FromCache()
    {
        // Arrange
        var products = _fixture.CreateMany<Order>(3).ToList();
        MockCacheGet(CacheKeys.OrdersWithFilters(null, null), products);

        // Act
        var result = await _service.GetAllAsync(null, null, null, _claimsPrincipalMock);

        // Assert
        // - not call repository
        await _repositoryMock.Received(0).GetAllSpecificationAsync(Arg.Any<OrdersSpec>());
        // - result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(products);
    }

    [Fact]
    public async Task GetAllAsync_Should_ReturnSuccess_WhenOrderDefault()
    {
        // Arrange
        var products = _fixture.CreateMany<Order>(3).ToList();
        var user = _fixture.Create<User>();
        MockGetAllSpecificationAsync(products);
        MockClaimsPrincipalIsInRole(UserRole.Admin, true);

        // Act
        var result = await _service.GetAllAsync(user.Id, null, "createdAt", _claimsPrincipalMock);

        // Assert
        // - call repository
        await _repositoryMock.Received(1).GetAllSpecificationAsync(Arg.Any<OrdersSpec>());
        // - result
        result.IsSuccess.Should().BeTrue();
    }

    [Fact]
    public async Task GetAllAsync_Should_ReturnSuccess_WhenOrderHitCache()
    {
        // Arrange
        var products = _fixture.CreateMany<Order>(3).ToList();
        var user = _fixture.Create<User>();
        var keyCache = CacheKeys.OrdersWithFilters(null, "createdAt");
        MockCacheGet(keyCache, products);
        MockClaimsPrincipalIsInRole(UserRole.Admin, true);

        // Act
        var result = await _service.GetAllAsync(user.Id, null, "createdAt", _claimsPrincipalMock);

        // Assert
        // - not call repository
        await _repositoryMock.Received(0).GetAllSpecificationAsync(Arg.Any<OrdersSpec>());
        // - not call cache set
        _cacheServiceMock.Received(0).SetAndSyncKeyToList(
            Arg.Any<string>(), Arg.Any<PaginatedList<Order>>(), Arg.Any<string>());
        // - result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(products);
    }

    [Fact]
    public async Task GetAllAsync_Should_ReturnFail_WhenThrowError()
    {
        // Arrange
        var products = _fixture.CreateMany<Order>(3);
        var user = _fixture.Create<User>();
        MockGetAllSpecificationAsyncThrowError();
        MockClaimsPrincipalIsInRole(UserRole.Admin, true);


        // Act
        var result = await _service.GetAllAsync(user.Id, null, null, _claimsPrincipalMock);

        // Assert
        // - call repository
        await _repositoryMock.Received(1).GetAllSpecificationAsync(Arg.Any<OrdersSpec>());
        // - not call cache set
        _cacheServiceMock.Received(0).SetAndSyncKeyToList(
            Arg.Any<string>(), Arg.Any<PaginatedList<Order>>(), Arg.Any<string>());
        // - result
        result.IsFailure.Should().BeTrue();
    }
}

public class OrderListPaginationTests : BaseOrderServiceTests
{
    [Fact]
    public async Task GetAllAsyncPagination_Should_ReturnSuccess()
    {
        // Arrange
        var products = _fixture.CreateMany<Order>(3).ToList();
        var productsPaginated = new PaginatedList<Order>(products.AsQueryable(), 3, 1, 2);
        MockGetAllSpecificationPaginationAsync(productsPaginated);

        // Act
        var result = await _service.GetAllWithPagingAsync(null, null, null, 1, 2 , _claimsPrincipalMock);

        // Assert
        // - call repository
        await _repositoryMock.Received(1).GetAllSpecificationPaginationAsync(Arg.Any<OrdersSpec>());
        // - result
        result.IsSuccess.Should().BeTrue();
        // todo: check result value
    }

    [Fact]
    public async Task GetAllAsyncPagination_Should_ReturnSuccess_FromCache()
    {
        // Arrange
        var products = _fixture.CreateMany<Order>(3).ToList();
        var productsPaginated = new PaginatedList<Order>(products.AsQueryable(), 3, 1, 2);
        MockCacheGet(CacheKeys.OrdersWithFiltersAndPagination(null, null, 1, 2), productsPaginated);

        // Act
        var result = await _service.GetAllWithPagingAsync(null, null, null, 1, 2, _claimsPrincipalMock);

        // Assert
        // - not call repository
        await _repositoryMock.Received(0).GetAllSpecificationPaginationAsync(Arg.Any<OrdersSpec>());
        // - result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(productsPaginated);
    }

    [Fact]
    public async Task GetAllAsyncPagination_Should_ReturnSuccess_WhenOrder()
    {
        // Arrange
        var products = _fixture.CreateMany<Order>(3);
        var productsPaginated = new PaginatedList<Order>(products.AsQueryable(), 3, 1, 2);
        MockGetAllSpecificationPaginationAsync(productsPaginated);

        // Act
        var result = await _service.GetAllWithPagingAsync(null, null, "CreatedAt", 1, 2, _claimsPrincipalMock);

        // Assert
        // - call repository
        await _repositoryMock.Received(1).GetAllSpecificationPaginationAsync(Arg.Any<OrdersSpec>());
        // - result
        result.IsSuccess.Should().BeTrue();
    }

    [Fact]
    public async Task GetAllAsyncPagination_Should_ReturnFail_WhenThrowError()
    {
        // Arrange
        MockGetAllSpecificationPaginationAsyncThrowError();

        // Act
        var result = await _service.GetAllWithPagingAsync(null, null, null, 1, 2, _claimsPrincipalMock);

        // Assert
        // - call repository
        await _repositoryMock.Received(1).GetAllSpecificationPaginationAsync(Arg.Any<OrdersSpec>());
        // - not call cache set
        _cacheServiceMock.Received(0).SetAndSyncKeyToList(
            Arg.Any<string>(), Arg.Any<PaginatedList<Order>>(), Arg.Any<string>());
        // - result
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ErrorCode.InternalError);
        result.Error.Description.Should().Be(ErrorMessage.InternalError);
    }
}
