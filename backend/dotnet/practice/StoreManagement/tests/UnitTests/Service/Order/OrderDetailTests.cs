using StoreManagement.Enums;

namespace StoreManagement.UnitTests.Services.OrderTests;

public class OrderDetailTests : BaseOrderServiceTests
{
    [Fact]
    public async Task GetById_Should_ReturnSuccess_WhenExistsAndAdminRequest()
    {
        // Arrange
        var order = _fixture.Create<Order>();
        var orderId = order.Id;
        var user = _fixture.Create<User>();
        MockGetById(orderId, order);
        MockClaimsPrincipalFindFirst(user.Id);
        MockClaimsPrincipalIsInRole(UserRole.Admin, true);

        // Act
        var result = await _service.GetOrderByIdAsync(orderId, _claimsPrincipalMock);

        // Assert
        // - call repository
        await _repositoryMock.Received(1).GetByIdAsync(orderId);
        // call cache set
        _cacheServiceMock.Received(1).Set(CacheKeys.OrderById(orderId), order);
        // result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(order);
    }

    [Fact]
    public async Task GetById_Should_ReturnSuccess_WhenExistsAndOwnerRequest()
    {
        // Arrange
        // - owner request
        var user = _fixture.Create<User>();
        MockClaimsPrincipalFindFirst(user.Id);
        MockClaimsPrincipalIsInRole(UserRole.Admin, false);
        // - order belong to user
        var order = _fixture.Create<Order>();
        order.UserId = user.Id;
        var orderId = order.Id;
        MockGetById(orderId, order);

        // Act
        var result = await _service.GetOrderByIdAsync(orderId, _claimsPrincipalMock);

        // Assert
        // - call repository
        await _repositoryMock.Received(1).GetByIdAsync(orderId);
        // call cache set
        _cacheServiceMock.Received(1).Set(CacheKeys.OrderById(orderId), order);
        // result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(order);
    }

    [Fact]
    public async Task GetById_Should_ReturnFail_WhenNotAdminButMissingClaim()
    {
        // Arrange
        // - owner request
        var user = _fixture.Create<User>();
        MockClaimsPrincipalFindFirst(null!);
        MockClaimsPrincipalIsInRole(UserRole.Admin, false);
        // - shopping cart belong to user
       var order = _fixture.Create<Order>();
        order.UserId = user.Id;
        var orderId = order.Id;
        MockGetById(order.Id, order);

        // Act
        var result = await _service.GetOrderByIdAsync(orderId, _claimsPrincipalMock);

        // Assert
        // - result
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(UserErrorCode.UserNotFound);
        result.Error.Description.Should().Be(UserErrorMessage.UserNotFound);
    }

    [Fact]
    public async Task GetById_Should_ReturnFail_WhenExistsAndNotHavePermission()
    {
        // Arrange
        // - another user has no permission on access cart
        var user = _fixture.Create<User>();
        var anotherUser = _fixture.Create<User>();
        MockClaimsPrincipalFindFirst(anotherUser.Id);
        MockClaimsPrincipalIsInRole(UserRole.Admin, false);

        // - shopping cart belong to user
        var order = _fixture.Create<Order>();
        order.UserId = user.Id;
        var orderId = order.Id;
        MockGetById(order.Id, order);

        // Act
        var result = await _service.GetOrderByIdAsync(orderId, _claimsPrincipalMock);

        // Assert
        // - call repository
        await _repositoryMock.Received(1).GetByIdAsync(orderId);
        // call cache set
        _cacheServiceMock.Received(1).Set(CacheKeys.OrderById(orderId), order);
        // - result
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(OrderErrorCode.OrderForbiddenAccess);
        result.Error.Description.Should().Be(OrderErrorMessage.OrderForbiddenAccess);
    }

    [Fact]
    public async Task GetById_Should_ReturnSuccessFromCache_WhenCacheHit()
    {
        // Arrange
        var order = _fixture.Create<Order>();
        var orderId = order.Id;
        var user = _fixture.Create<User>();
        MockCacheGet(CacheKeys.OrderById(order.Id), order);
        MockClaimsPrincipalFindFirst(user.Id);
        MockClaimsPrincipalIsInRole(UserRole.Admin, true);
        // Act
        var result = await _service.GetOrderByIdAsync(orderId, _claimsPrincipalMock);

        // Assert
        // - not call repository
        await _repositoryMock.Received(0).GetByIdAsync(orderId);
        // - result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(order);
    }

    [Fact]
    public async Task GetById_Should_ReturnFail_WhenNotExist()
    {
        // Arrange
        var order = _fixture.Create<Order>();
        var orderId = order.Id;
        MockGetById(orderId, null);
        MockClaimsPrincipalIsInRole(UserRole.Admin, true);

        // Act
        var result = await _service.GetOrderByIdAsync(orderId, _claimsPrincipalMock);

        // Assert
        // - call cache set
        _cacheServiceMock.Received(1).Set(CacheKeys.OrderById(orderId), null);
        // - result
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(OrderErrorCode.OrderByIdNotFound);
        result.Error.Description.Should().Be(OrderErrorMessage.OrderByIdNotFound(orderId));
    }


    [Fact]
    public async Task GetById_Should_ReturnFail_WhenThrowError()
    {
        // Arrange
        var order = _fixture.Create<Order>();
        var orderId = order.Id;
        MockGetByIdAsyncThrowError(orderId);

        // Act
        var result = await _service.GetOrderByIdAsync(orderId, _claimsPrincipalMock);

        // Assert
        // - not call cache set
        _cacheServiceMock.Received(0).Set(CacheKeys.OrderById(orderId), order);
        // - result
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ErrorCode.InternalError);
        result.Error.Description.Should().Be(ErrorMessage.InternalError);
    }
}
