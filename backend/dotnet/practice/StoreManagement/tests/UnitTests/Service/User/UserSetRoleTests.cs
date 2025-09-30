namespace StoreManagement.UnitTests.Services;

public class UserSetRoleTests : BaseUserServiceTests
{
    [Fact]
    public async Task SetRole_Should_ReturnSuccess_WhenRoleIsAdmin()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var roleName = "Admin";
        MockFindRoleByNameAsync(roleName);

        // Act
        var result = await _service.SetRoleAsync(user, roleName);

        // Assert
        // call repository
        await _repositoryMock.Received(1).SetRoleAsync(user, roleName);
        // call evict cache list
        _cacheServiceMock.Received(1).RemoveList(CacheKeys.Users);
        // result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(null);
    }

    [Fact]
    public async Task SetRole_Should_ReturnSuccess_WhenRoleIsUser()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var roleName = "User";
        MockFindRoleByNameAsync(roleName);

        // Act
        var result = await _service.SetRoleAsync(user, roleName);

        // Assert
        // call repository
        await _repositoryMock.Received(1).SetRoleAsync(user, roleName);
        // call evict cache list
        _cacheServiceMock.Received(1).RemoveList(CacheKeys.Users);
        // result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(null);
    }

    [Fact]
    public async Task SetRole_Should_ReturnFail_WhenRoleIsNotSupport()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var roleName = "Advisor";

        // Act
        var result = await _service.SetRoleAsync(user, roleName);

        // Assert
        // call repository
        await _repositoryMock.Received(0).SetRoleAsync(user, roleName);
        // result
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(RoleErrorCode.RoleNotSupport);
        result.Error.Description.Should().Be(RoleErrorMessage.RoleNotSupport);
    }

    [Fact]
    public async Task SetRole_Should_ReturnFail_WhenRoleIsNotFound()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var roleName = "Admin";
        MockFindRoleByNameAsyncReturnNull(roleName);

        // Act
        var result = await _service.SetRoleAsync(user, roleName);

        // Assert
        // call repository
        await _repositoryMock.Received(0).SetRoleAsync(user, roleName);
        // result
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(RoleErrorCode.RoleNotFound);
        result.Error.Description.Should().Be(RoleErrorMessage.RoleNotFound);
    }


    [Fact]
    public async Task SetRole_Should_ReturnFail_WhenRoleFindByNameAsyncThrowError()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var roleName = "Admin";
        MockFindRoleByNameAsyncThrowError(roleName);

        // Act
        var result = await _service.SetRoleAsync(user, roleName);

        // Assert
        // call repository
        await _repositoryMock.Received(0).SetRoleAsync(user, roleName);
        // result
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ErrorCode.InternalError);
        result.Error.Description.Should().Be(ErrorMessage.InternalError);
    }

    [Fact]
    public async Task SetRole_Should_ReturnFail_WhenSetRoleAsyncThrowError()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var roleName = "Admin";
        MockSetRoleAsyncThrowError(user, roleName);

        // Act
        var result = await _service.SetRoleAsync(user, roleName);

        // Assert
        // call repository
        await _repositoryMock.Received(1).SetRoleAsync(user, roleName);
        // not call evict cache list
        _cacheServiceMock.Received(0).RemoveList(CacheKeys.Users);
        // result
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ErrorCode.InternalError);
        result.Error.Description.Should().Be(ErrorMessage.InternalError);
    }
}
