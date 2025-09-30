namespace StoreManagement.UnitTests.Services;

public class UserDetailTests : BaseUserServiceTests
{
    [Fact]
    public async Task GetByIdAsync_Should_ReturnSuccess_WhenExists()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var userId = user.Id;
        MockGetById(user, user);

        // Act
        var result = await _service.GetByIdAsync(userId);

        // Assert
        // - call repository
        await _repositoryMock.Received(1).GetByIdAsync(userId);
        // call cache set
        _cacheServiceMock.Received(1).Set(CacheKeys.UserById(userId), user);
        // result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(user);
    }

    [Fact]
    public async Task GetByIdAsync_Should_ReturnFail_WhenNotExist()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var userId = user.Id;
        MockGetById(user, null!);

        // Act
        var result = await _service.GetByIdAsync(userId);

        // Assert
        // - call cache set
        _cacheServiceMock.Received(1).Set(CacheKeys.UserById(userId), null);
        // - result
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(UserErrorCode.UserByIdNotFound);
        result.Error.Description.Should().Be(UserErrorMessage.UserByIdNotFound(userId));
    }

    [Fact]
    public async Task GetByIdAsync_Should_ReturnDataFromCache_WhenCacheHit()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var userId = user.Id;
        MockCacheGet(CacheKeys.UserById(user.Id), user);

        // Act
        var result = await _service.GetByIdAsync(userId);

        // Assert
        // - not call repository
        await _repositoryMock.Received(0).GetByIdAsync(userId);
        // - result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(user);
    }

    [Fact]
    public async Task GetByIdAsync_Should_ReturnFail_WhenGetByIdAsyncThrowError()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var userId = user.Id;
        MockGetByIdAsyncThrowError(userId);

        // Act
        var result = await _service.GetByIdAsync(userId);

        // Assert
        // - not call cache set
        _cacheServiceMock.Received(0).Set(CacheKeys.UserById(userId), user);
        // - result
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ErrorCode.InternalError);
        result.Error.Description.Should().Be(ErrorMessage.InternalError);
    }

    [Fact]
    public async Task GetByEmailAsync_Should_ReturnSuccess_WhenExists()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var userId = user.Id;
        var userEmail = user.Email!;
        MockGetByEmail(userEmail, user);

        // Act
        var result = await _service.GetByEmailAsync(userEmail);

        // Assert
        // - call repository
        await _repositoryMock.Received(1).GetByEmailAsync(userEmail);
        // call cache set
        _cacheServiceMock.Received(1).Set(CacheKeys.UserByEmail(userEmail), user);
        _cacheServiceMock.Received(1).Set(CacheKeys.UserById(userId), user);
        // result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(user);
    }

    [Fact]
    public async Task GetByEmailAsync_Should_ReturnNull_WhenNotExist()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var userEmail = user.Email!;
        MockGetByEmail(userEmail, null!);

        // Act
        var result = await _service.GetByEmailAsync(userEmail);

        // Assert
        // - call cache set
        _cacheServiceMock.Received(1).Set(CacheKeys.UserByEmail(userEmail), null);
        _cacheServiceMock.Received(0).Set(CacheKeys.UserById(user.Id), null);
        // - result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(null);
    }

    [Fact]
    public async Task GetByEmailAsync_Should_ReturnDataFromCache_WhenCacheHit()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var userEmail = user.Email!;
        MockCacheGet(CacheKeys.UserByEmail(userEmail), user);

        // Act
        var result = await _service.GetByEmailAsync(userEmail);

        // Assert
        // - not call repository
        await _repositoryMock.Received(0).GetByEmailAsync(userEmail);
        // - result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(user);
    }

    [Fact]
    public async Task GetByEmailAsync_Should_ReturnFail_WhenGetByIdAsyncThrowError()
    {
        // Arrange
        var user = _fixture.Create<User>();
        var userEmail = user.Email!;
        MockGetByEmailAsyncThrowError(userEmail);

        // Act
        var result = await _service.GetByEmailAsync(userEmail);

        // Assert
        // - not call cache set
        _cacheServiceMock.Received(0).Set(CacheKeys.UserByEmail(userEmail), user);
        // - result
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ErrorCode.InternalError);
        result.Error.Description.Should().Be(ErrorMessage.InternalError);
    }
}
