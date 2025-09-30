namespace StoreManagement.UnitTests.Services.ProductTests;

public class ProductCreateTests : BaseProductServiceTests
{
    [Fact]
    public async Task AddAsyncShould_ReturnSuccess()
    {
        // Arrange
        var product = _fixture.Create<Product>();
        MockAddAsync(product);

        // Act
        var result = await _service.AddAsync(product);

        // Assert
        // call repository
        await _repositoryMock.Received(1).AddAsync(product);
        // call evict cache list
        _cacheServiceMock.Received(1).RemoveList(CacheKeys.Products);
        // result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(product);
    }

    [Fact]
    public async Task AddAsyncShould_ReturnFail_WhenErrorFromRepository()
    {
        // Arrange
        var product = _fixture.Create<Product>();
        MockAddAsyncThrowError(product);

        // Act
        var result = await _service.AddAsync(product);

        // Assert
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ErrorCode.InternalError);
        result.Error.Description.Should().Be(ErrorMessage.InternalError);
    }
}
