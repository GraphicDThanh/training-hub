using NSubstitute.ExceptionExtensions;
using StoreManagement.Patterns;
using StoreManagement.Repositories;
using StoreManagement.Services;
using StoreManagement.Specifications;

namespace StoreManagement.UnitTests.Services.ProductTests;

public abstract class BaseProductServiceTests
    : BaseServiceTests<Product, IProductService, IProductRepository>
{
    internal IProductService _service;

    internal BaseProductServiceTests()
    {
        _repositoryMock = Substitute.For<IProductRepository>();
        _service = new ProductService(_loggerMock, _mapperMock, _repositoryMock, _cacheServiceMock);
    }

    internal void MockGetById(Product product, object value)
    {
        _repositoryMock.GetByIdAsync(product.Id).Returns((Product)value);
    }

    internal void MockGetByIdAsyncThrowError(string productId)
    {
        _repositoryMock
            .When(x => x.GetByIdAsync(productId))
            .Do(x => throw new Exception(ErrorMessage.InternalError));
    }

    internal void MockGetAllSpecificationAsync(IList<Product> products)
    {
        _repositoryMock.GetAllSpecificationAsync(Arg.Any<ProductsSpec>()).Returns(products);
    }

    internal void MockGetAllSpecificationPaginationAsync(PaginatedList<Product> products)
    {
        _repositoryMock.GetAllSpecificationPaginationAsync(Arg.Any<ProductsSpec>()).Returns(products);
    }

    internal void MockGetAllSpecificationAsyncThrowError()
    {
        _repositoryMock.GetAllSpecificationAsync(Arg.Any<ProductsSpec>()).Throws(
            new Exception(ErrorMessage.InternalError));
    }

    internal void MockGetAllSpecificationPaginationAsyncThrowError()
    {
        _repositoryMock.GetAllSpecificationPaginationAsync(Arg.Any<ProductsSpec>()).Throws(
            new Exception(ErrorMessage.InternalError));
    }

    internal void MockDeleteAsyncThrowError(Product product)
    {
        _repositoryMock
            .When(x => x.DeleteAsync(product))
            .Do(x => throw new Exception(ErrorMessage.InternalError));
    }

    internal void MockUpdateAsyncThrowError(Product product)
    {
        _repositoryMock
            .When(x => x.UpdateAsync(product))
            .Do(x => throw new Exception(ErrorMessage.InternalError));
    }

    internal void MockAddAsync(Product product)
    {
        _repositoryMock.AddAsync(product).Returns(product);
    }

    internal void MockAddAsyncThrowError(Product product)
    {
        _repositoryMock
            .When(x => x.AddAsync(product))
            .Do(x => throw new Exception(ErrorMessage.InternalError));
    }
}
