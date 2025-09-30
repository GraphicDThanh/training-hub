using StoreManagement.Enums;

namespace StoreManagement.UnitTests.Services.ShoppingCartTests;

public class ShoppingCartDetailTests : BaseShoppingCartServiceTests
{
    [Fact]
    public async Task GetById_Should_ReturnSuccess_WhenExistsAndAdminRequest()
    {
        // Arrange
        // - admin request
        var user = _fixture.Create<User>();
        MockClaimsPrincipalFindFirst(user.Id);
        MockClaimsPrincipalIsInRole(UserRole.Admin, true);

        var shoppingCart = _fixture.Create<ShoppingCart>();
        var shoppingCartId = shoppingCart.Id;
        MockGetById(shoppingCart.Id, shoppingCart);

        // Act
        var result = await _shoppingCartService.GetShoppingCartById(shoppingCartId, _claimsPrincipalMock);

        // Assert
        // - call repository
        await _shoppingCartRepositoryMock.Received(1).GetByIdAsync(shoppingCartId);
        // call cache set
        _cacheServiceMock.Received(1).Set(CacheKeys.ShoppingCartById(shoppingCartId), shoppingCart);
        // result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(shoppingCart);
    }

    [Fact]
    public async Task GetById_Should_ReturnSuccess_WhenExistsAndOwnerRequest()
    {
        // Arrange
        // - owner request
        var user = _fixture.Create<User>();
        MockClaimsPrincipalFindFirst(user.Id);
        MockClaimsPrincipalIsInRole(UserRole.Admin, false);
        // - shopping cart belong to user
        var shoppingCart = _fixture.Create<ShoppingCart>();
        shoppingCart.UserId = user.Id;
        var shoppingCartId = shoppingCart.Id;
        MockGetById(shoppingCart.Id, shoppingCart);

        // Act
        var result = await _shoppingCartService.GetShoppingCartById(shoppingCartId, _claimsPrincipalMock);

        // Assert
        // - call repository
        await _shoppingCartRepositoryMock.Received(1).GetByIdAsync(shoppingCartId);
        // call cache set
        _cacheServiceMock.Received(1).Set(CacheKeys.ShoppingCartById(shoppingCartId), shoppingCart);
        // result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(shoppingCart);
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
        var shoppingCart = _fixture.Create<ShoppingCart>();
        shoppingCart.UserId = user.Id;
        var shoppingCartId = shoppingCart.Id;
        MockGetById(shoppingCart.Id, shoppingCart);

        // Act
        var result = await _shoppingCartService.GetShoppingCartById(shoppingCartId, _claimsPrincipalMock);

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
        var shoppingCart = _fixture.Create<ShoppingCart>();
        shoppingCart.UserId = user.Id;
        var shoppingCartId = shoppingCart.Id;
        MockGetById(shoppingCart.Id, shoppingCart);

        // Act
        var result = await _shoppingCartService.GetShoppingCartById(shoppingCartId, _claimsPrincipalMock);

        // Assert
        // - call repository
        await _shoppingCartRepositoryMock.Received(1).GetByIdAsync(shoppingCartId);
        // call cache set
        _cacheServiceMock.Received(1).Set(CacheKeys.ShoppingCartById(shoppingCartId), shoppingCart);
        // - result
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ShoppingCartErrorCode.ShoppingCartForbiddenAccess);
        result.Error.Description.Should().Be(ShoppingCartErrorMessage.ShoppingCartForbiddenAccess);
    }


    [Fact]
    public async Task GetById_Should_ReturnSuccess_WhenGetShoppingCartHitCache()
    {
        // Arrange
        // - user has permission on access cart
        var user = _fixture.Create<User>();
        MockClaimsPrincipalFindFirst(user.Id);
        MockClaimsPrincipalIsInRole(UserRole.Admin, true);
        // - cart have data in mock
        var shoppingCart = _fixture.Create<ShoppingCart>();
        var shoppingCartId = shoppingCart.Id;
        MockCacheGet(CacheKeys.ShoppingCartById(shoppingCart.Id), shoppingCart);

        // Act
        var result = await _shoppingCartService.GetShoppingCartById(shoppingCartId, _claimsPrincipalMock);

        // Assert
        // - not call repository
        await _shoppingCartRepositoryMock.Received(0).GetByIdAsync(shoppingCartId);
        // - result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(shoppingCart);
    }

    [Fact]
    public async Task GetById_Should_ReturnFail_WhenNotExist()
    {
        // Arrange
        // - admin request
        var user = _fixture.Create<User>();
        MockClaimsPrincipalFindFirst(user.Id);
        MockClaimsPrincipalIsInRole(UserRole.Admin, true);

        var shoppingCart = _fixture.Create<ShoppingCart>();
        var shoppingCartId = shoppingCart.Id;
        MockGetById(shoppingCartId, null);

        // Act
        var result = await _shoppingCartService.GetShoppingCartById(shoppingCartId, _claimsPrincipalMock);

        // Assert
        // - call cache set
        _cacheServiceMock.Received(1).Set(CacheKeys.ShoppingCartById(shoppingCartId), null);
        // - result
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ShoppingCartErrorCode.ShoppingCartByIdNotFound);
        result.Error.Description.Should().Be(ShoppingCartErrorMessage.ShoppingCartByIdNotFound(shoppingCartId));
    }


    [Fact]
    public async Task GetById_Should_ReturnFail_WhenGetShoppingCartThrowError()
    {
        // Arrange
        // - admin request
        var user = _fixture.Create<User>();
        MockClaimsPrincipalFindFirst(user.Id);
        MockClaimsPrincipalIsInRole(UserRole.Admin, true);
        var shoppingCart = _fixture.Create<ShoppingCart>();
        var shoppingCartId = shoppingCart.Id;
        MockGetByIdAsyncThrowError(shoppingCartId);

        // Act
        var result = await _shoppingCartService.GetShoppingCartById(shoppingCartId, _claimsPrincipalMock);

        // Assert
        // - not call cache set
        _cacheServiceMock.Received(0).Set(CacheKeys.ShoppingCartById(shoppingCartId), shoppingCart);
        // - result
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ErrorCode.InternalError);
        result.Error.Description.Should().Be(ErrorMessage.InternalError);
    }
}
