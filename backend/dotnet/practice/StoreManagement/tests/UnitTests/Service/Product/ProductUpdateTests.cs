using StoreManagement.DTOs;

namespace StoreManagement.UnitTests.Services.ProductTests;

public class ProductUpdateTests : BaseProductServiceTests
{
    [Fact]
    public async Task Update_Should_ReturnSuccess()
    {
        // Arrange
        var product = _fixture.Create<Product>();
        var productId = product.Id;
        var productUpdateData = _fixture.Create<UpdateProductDTO>();
        var productCacheKey = CacheKeys.ProductById(productId);
        MockGetById(product, product);

        // Act
        var result = await _service.Update(productId, productUpdateData);

        // Assert
        // set cache
        _cacheServiceMock.Received(1).Set(productCacheKey, product);
        // evict cache
        _cacheServiceMock.Received(1).RemoveList(CacheKeys.Products);
        // result success
        result.IsSuccess.Should().BeTrue();
    }

    [Fact]
    public async Task Update_Should_ReturnFail_WhenProductNotExists()
    {
        // Arrange
        var product = _fixture.Create<Product>();
        var productId = product.Id;
        var productUpdateData = _fixture.Create<UpdateProductDTO>();
        var productUpdate = _mapperMock.Map<Product>(productUpdateData);
        MockGetById(product, null!);

        // Act
        var result = await _service.Update(productId, productUpdateData);

        // Assert
        // - not call repository
        await _repositoryMock.Received(0).UpdateAsync(productUpdate);
        // - not evict cache
        _cacheServiceMock.Received(0).Remove(CacheKeys.ProductById(productId));
        _cacheServiceMock.Received(0).Remove(CacheKeys.Products);
        // - result
        result.IsFailure.Should().BeTrue();
    }

    [Fact]
    public async Task Update_Should_ReturnFail_WhenGetByIdAsyncThrowError()
    {
        // Arrange
        var product = _fixture.Create<Product>();
        var productId = product.Id;
        var productUpdateData = _fixture.Create<UpdateProductDTO>();
        var productUpdate = _mapperMock.Map<Product>(productUpdateData);
        MockGetByIdAsyncThrowError(productId);

        // Act
        var result = await _service.Update(productId, productUpdateData);

        // Assert
        // - not call repository
        await _repositoryMock.Received(0).UpdateAsync(productUpdate);
        // - not evict cache
        _cacheServiceMock.Received(0).Remove(CacheKeys.ProductById(productId));
        _cacheServiceMock.Received(0).Remove(CacheKeys.Products);
        // - result
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ErrorCode.InternalError);
        result.Error.Description.Should().Be(ErrorMessage.InternalError);
    }

    [Fact]
    public async Task Update_Should_ReturnFail_WhenUpdateAsyncThrowError()
    {
        // Arrange
        var product = _fixture.Create<Product>();
        var productId = product.Id;
        var productUpdateData = _fixture.Create<UpdateProductDTO>();
        var productUpdate = _mapperMock.Map<Product>(productUpdateData);
        MockCacheGet(CacheKeys.ProductById(product.Id), product);
        MockUpdateAsyncThrowError(productUpdate);

        // Act
        var result = await _service.Update(productId, productUpdateData);

        // Assert
        // - not evict cache
        _cacheServiceMock.Received(0).Remove(CacheKeys.ProductById(productId));
        _cacheServiceMock.Received(0).Remove(CacheKeys.Products);
        // - result
        result.IsFailure.Should().BeTrue();
        result.Error.Code.Should().Be(ErrorCode.InternalError);
        result.Error.Description.Should().Be(ErrorMessage.InternalError);
    }
}
