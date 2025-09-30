using StoreManagement.Enums;

namespace StoreManagement.UnitTests.Services.ShoppingCartTests;

public class ShoppingCartCreateTests : BaseShoppingCartServiceTests
{
    [Fact]
    public async Task Create_Should_ReturnSuccess_WhenAdminTakeAction()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var userAdmin = _fixture.Create<User>();
        var shoppingCart = _fixture.Create<ShoppingCart>();
        MockClaimsPrincipalFindFirst(userAdmin.Id);
        MockClaimsPrincipalIsInRole(UserRole.Admin, true);
        MockUserRepoGetUserById(user.Id, user);
        MockAddAsync(shoppingCart);

        // Act
        var result = await _shoppingCartService.Create(user.Id, _claimsPrincipalMock);

        // Assert
        // call repository
        await _shoppingCartRepositoryMock.Received(1).AddAsync(Arg.Any<ShoppingCart>());
        // result
        result.IsSuccess.Should().BeTrue();
    }

    [Fact]
    public async Task Create_Should_ReturnFail_WhenAdminTakeActionButMissingUserId()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var userAdmin = _fixture.Create<User>();
        MockClaimsPrincipalFindFirst(userAdmin.Id);
        MockClaimsPrincipalIsInRole(UserRole.Admin, true);

        // Act
        var result = await _shoppingCartService.Create(null, _claimsPrincipalMock);

        // Assert
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ShoppingCartErrorCode.AdminCreateShoppingCartMissingUserData);
        result.Error.Description.Should().Be(ShoppingCartErrorMessage.AdminCreateShoppingCartMissingUserData);
    }

    [Fact]
    public async Task Create_Should_ReturnFail_WhenAdminTakeActionButUserIdNotFound()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var userAdmin = _fixture.Create<User>();
        MockClaimsPrincipalFindFirst(userAdmin.Id);
        MockClaimsPrincipalIsInRole(UserRole.Admin, true);

        // Act
        var result = await _shoppingCartService.Create(null, _claimsPrincipalMock);

        // Assert
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ShoppingCartErrorCode.AdminCreateShoppingCartMissingUserData);
        result.Error.Description.Should().Be(ShoppingCartErrorMessage.AdminCreateShoppingCartMissingUserData);
    }

    [Fact]
    public async Task Create_Should_ReturnFail_WhenUserHasActiveShoppingCart()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var userAdmin = _fixture.Create<User>();
        var shoppingCart = _fixture.Create<ShoppingCart>();
        shoppingCart.Status = ShoppingCartStatus.CREATED;
        shoppingCart.UserId = user.Id;

        MockUserRepoGetUserById(user.Id, user);
        MockClaimsPrincipalFindFirst(user.Id);
        MockClaimsPrincipalIsInRole(UserRole.Admin, false);
        MockGetByUserIdAsync(user.Id, shoppingCart);

        // Act
        var result = await _shoppingCartService.Create(user.Id, _claimsPrincipalMock);

        // Assert
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ShoppingCartErrorCode.ShoppingCartExists);
        result.Error.Description.Should().Be(
            ShoppingCartErrorMessage.ShoppingCartExists(user.Id, shoppingCart.Id)
        );
    }

    [Fact]
    public async Task Create_Should_ReturnFail_WhenUserInClaimNotFound()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var userAdmin = _fixture.Create<User>();
        var shoppingCart = _fixture.Create<ShoppingCart>();
        shoppingCart.Status = ShoppingCartStatus.CREATED;
        shoppingCart.UserId = user.Id;

        MockClaimsPrincipalFindFirst(user.Id);
        MockUserRepoGetUserById(user.Id, null);
        MockClaimsPrincipalIsInRole(UserRole.Admin, false);

        // Act
        var result = await _shoppingCartService.Create(user.Id, _claimsPrincipalMock);

        // Assert
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(UserErrorCode.UserByIdNotFound);
        result.Error.Description.Should().Be(UserErrorMessage.UserByIdNotFound(user.Id));
    }

        [Fact]
    public async Task Create_ShouldReturnFail_WhenNotAdminButMissingClaim()
    {
        // Arrange
        // - owner request
        var user = _fixture.Create<User>();
        MockClaimsPrincipalFindFirst(null!);
        MockClaimsPrincipalIsInRole(UserRole.Admin, false);

        // Act
        var result = await _shoppingCartService.Create(user.Id, _claimsPrincipalMock);

        // Assert
        // - result
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(UserErrorCode.UserNotFound);
        result.Error.Description.Should().Be(UserErrorMessage.UserNotFound);
    }


    [Fact]
    public async Task Create_Should_ReturnFail_WhenErrorFromAddAsync()
    {
        // Arrange
        var user = _fixture.Create<User>();
        MockUserRepoGetUserById(user.Id, user);
        MockAddAsyncThrowError();
        MockClaimsPrincipalFindFirst(user.Id);
        MockGetByUserIdAsync(user.Id, null);

        // Act
        var result = await _shoppingCartService.Create(user.Id, _claimsPrincipalMock);

        // Assert
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ErrorCode.InternalError);
        result.Error.Description.Should().Be(ErrorMessage.InternalError);
    }

    [Fact]
    public async Task Create_Should_ReturnFail_WhenErrorFromGetByUserIdAsync()
    {
        // Arrange
        var user = _fixture.Create<User>();
        MockGetByUserIdAsyncThrowError(user.Id);
        MockClaimsPrincipalFindFirst(user.Id);
        MockUserRepoGetUserById(user.Id, user);

        // Act
        var result = await _shoppingCartService.Create(user.Id, _claimsPrincipalMock);

        // Assert
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ErrorCode.InternalError);
        result.Error.Description.Should().Be(ErrorMessage.InternalError);
    }

    [Fact]
    public async Task Create_Should_ReturnFail_WhenErrorFromUserRepoGetByIdAsync()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var shoppingCart = _fixture.Create<ShoppingCart>();
        MockUserRepoGetUserByIdThrowError(user.Id);
        MockClaimsPrincipalFindFirst(user.Id);

        // Act
        var result = await _shoppingCartService.Create(user.Id, _claimsPrincipalMock);

        // Assert
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ErrorCode.InternalError);
        result.Error.Description.Should().Be(ErrorMessage.InternalError);
    }
}
