namespace StoreManagement.UnitTests.Services.UserTests;

public class UserAddAsyncTests : BaseUserServiceTests
{
    [Fact]
    public async Task AddAsync_Should_ReturnSuccess()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var userPassword = _fixture.Create<string>();
        MockAddAsync(user, userPassword);

        // Act
        var result = await _service.AddAsync(user, userPassword);

        // Assert
        // call repository
        await _repositoryMock.Received(1).AddAsync(user, userPassword);
        // call evict cache list
        _cacheServiceMock.Received(1).RemoveList(CacheKeys.Users);
        // result
        result.IsSuccess.Should().BeTrue();
    }

    [Fact]
    public async Task AddAsyncShould_ReturnFail_WhenErrorIdentityThrow()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var userPassword = _fixture.Create<string>();
        MockAddAsyncThrowErrorIdentityError(user, userPassword);

        // Act
        var result = await _service.AddAsync(user, userPassword);

        // Assert
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ErrorCode.InternalError);
        result.Error.Description.Should().Be(ErrorMessage.InternalError);
    }


    [Fact]
    public async Task AddAsyncShould_ReturnFail_WhenErrorInternalServerThrow()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var userPassword = _fixture.Create<string>();
        MockAddAsyncThrowErrorInternalServer(user, userPassword);

        // Act
        var result = await _service.AddAsync(user, userPassword);

        // Assert
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ErrorCode.InternalError);
        result.Error.Description.Should().Be(ErrorMessage.InternalError);
    }
}
