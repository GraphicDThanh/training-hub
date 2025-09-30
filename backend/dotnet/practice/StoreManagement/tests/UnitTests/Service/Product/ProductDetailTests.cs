namespace StoreManagement.UnitTests.Services.ProductTests;

public class ProductDetailTests : BaseProductServiceTests
{
    [Fact]
    public async Task GetById_Should_ReturnSuccess_WhenExists()
    {
        // Arrange
        var product = _fixture.Create<Product>();
        var productId = product.Id;
        MockGetById(product, product);

        // Act
        var result = await _service.GetProductById(productId);

        // Assert
        // - call repository
        await _repositoryMock.Received(1).GetByIdAsync(productId);
        // call cache set
        _cacheServiceMock.Received(1).Set(CacheKeys.ProductById(productId), product);
        // result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(product);
    }

    [Fact]
    public async Task GetById_Should_ReturnFail_WhenNotExist()
    {
        // Arrange
        var product = _fixture.Create<Product>();
        var productId = product.Id;
        MockGetById(product, null!);

        // Act
        var result = await _service.GetProductById(productId);

        // Assert
        // - call cache set
        _cacheServiceMock.Received(1).Set(CacheKeys.ProductById(productId), null);
        // - result
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ProductErrorCode.ProductNotFound);
        result.Error.Description.Should().Be(ProductErrorMessage.ProductNotFound(productId));
    }

    [Fact]
    public async Task GetById_Should_ReturnSuccessFromCache_WhenCacheHit()
    {
        // Arrange
        var product = _fixture.Create<Product>();
        var productId = product.Id;
        MockCacheGet(CacheKeys.ProductById(product.Id), product);

        // Act
        var result = await _service.GetProductById(productId);

        // Assert
        // - not call repository
        await _repositoryMock.Received(0).GetByIdAsync(productId);
        // - result
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(product);
    }

    [Fact]
    public async Task GetById_Should_ReturnFail_WhenThrowError()
    {
        // Arrange
        var product = _fixture.Create<Product>();
        var productId = product.Id;
        MockGetByIdAsyncThrowError(productId);

        // Act
        var result = await _service.GetProductById(productId);

        // Assert
        // - not call cache set
        _cacheServiceMock.Received(0).Set(CacheKeys.ProductById(productId), product);
        // - result
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ErrorCode.InternalError);
        result.Error.Description.Should().Be(ErrorMessage.InternalError);
    }
}
