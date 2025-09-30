namespace StoreManagement.UnitTests.Services.ProductTests;

public class ProductDeleteTests : BaseProductServiceTests
{
    [Fact]
    public async Task Delete_Should_ReturnSuccess()
    {
        // Arrange
        var product = _fixture.Create<Product>();
        // - mock product exist
        MockGetById(product, product);

        // Act
        var result = await _service.Delete(product.Id);

        // Assert
        // - call repository
        await _repositoryMock.Received(1).DeleteAsync(Arg.Is<Product>(p => p.Id == product.Id));
        // - call evict cache list
        _cacheServiceMock.Received(1).Remove(CacheKeys.ProductById(product.Id));
        _cacheServiceMock.Received(1).RemoveList(CacheKeys.Products);
        // - result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(null);
    }

    [Fact]
    public async Task Delete_Should_ReturnFail_WhenProductNotExists()
    {
        // Arrange
        var product = _fixture.Create<Product>();
        var productId = product.Id;
        MockGetById(product, null!);

        // Act
        var result = await _service.Delete(productId);

        // Assert
        // - not call repository
        await _repositoryMock.Received(0).DeleteAsync(product);
        // - not evict cache
        _cacheServiceMock.Received(0).Remove(CacheKeys.ProductById(productId));
        _cacheServiceMock.Received(0).Remove(CacheKeys.Products);
        // - result
        result.IsFailure.Should().BeTrue();
    }

    [Fact]
    public async Task Delete_Should_ReturnFail_WhenErrorFromRepositoryOnGetProduct()
    {
        // Arrange
        var product = _fixture.Create<Product>();
        MockGetByIdAsyncThrowError(product.Id);


        // Act
        var result = await _service.Delete(product.Id);

        // Assert
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ErrorCode.InternalError);
        result.Error.Description.Should().Be(ErrorMessage.InternalError);
    }

    [Fact]
    public async Task Delete_Should_ReturnFail_WhenDeleteThrowError()
    {
        // Arrange
        var product = _fixture.Create<Product>();
        MockGetById(product, product);
        MockDeleteAsyncThrowError(product);

        // Act
        var result = await _service.Delete(product.Id);

        // Assert
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ErrorCode.InternalError);
        result.Error.Description.Should().Be(ErrorMessage.InternalError);
    }
}
