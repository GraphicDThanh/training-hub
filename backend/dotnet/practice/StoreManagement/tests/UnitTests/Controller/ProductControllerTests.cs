using Moq;
using AutoFixture;
using AutoMapper;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using StoreManagement.DTOs;
using StoreManagement.Entities;
using StoreManagement.Services;
using Microsoft.Extensions.Logging;
using StoreManagement.Patterns;
using StoreManagement.Errors;
using StoreManagement.Controllers;
using StoreManagement.Repositories;
using StoreManagement.Cache;

namespace StoreManagement.Tests.Controllers;

public class ProductsControllerTests
{
    private readonly Mock<ILogger<ProductsController>> _logger;
    private readonly Mock<IMapper> _mapper;
    private readonly Mock<IProductService> _productService;
    private readonly ProductsController _controller;
    private readonly Fixture _fixture;


    public ProductsControllerTests()
    {
        _productService = new Mock<IProductService>();
        _mapper = new Mock<IMapper>();
        _fixture = new Fixture();
        _logger = new Mock<ILogger<ProductsController>>();
        _controller = new ProductsController(_mapper.Object, _logger.Object, _productService.Object);
    }

    // [Fact(Skip = "Not implemented yet")]
    // public void ProductsController_UnAuthenticated_ReturnUnauthorized()
    // {
    //     // Arrange
    //     // Act
    //     // Assert
    // }

    [Fact]
    public async void ProductsController_GetAllAsync_ReturnOk()
    {
        // Arrange
        var products = _fixture.CreateMany<Product>(3).ToList();
        _productService.Setup(x => x.GetAllAsync(null, null)).ReturnsAsync(Result.Success(products));
        var productsList = _fixture.CreateMany<ProductShortFormResponseDTO>(3).ToList();
        _mapper.Setup(x => x.Map<List<ProductShortFormResponseDTO>>(products)).Returns(productsList);

        // Act
        var result = await _controller.GetAllAsync(null, null, 0, 10);

        // Assert
        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async void ProductsController_GetById_ReturnNotFound()
    {
        // Arrange
        var productId = Guid.NewGuid().ToString();
        _productService.Setup(x => x.GetProductById(productId)).ReturnsAsync(
            Result.Failure(ProductError.ProductNotFound(productId))
        );

        // Act
        var result = await _controller.GetById(productId);

        // Assert
        result.Should().BeOfType<ObjectResult>();
        result.As<ObjectResult>().Value.As<ResultFailureDTO>().ErrorCode.Should().Be("ProductError.ProductNotFound");
    }

    [Fact]
    public async void ProductsController_CreateProduct_ReturnCreated()
    {
        // Arrange
        var product = _fixture.Create<Product>();
        var createProductDTO = new CreateProductDTO
        {
            Name = product.Name,
            Description = product.Description,
            Quantity = product.Quantity,
            Price = product.Price,
            ImageUrl = product.ImageUrl
        };
        var createProductResponse = new ProductResponseDTO
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Quantity = product.Quantity,
            Price = product.Price,
        };
        _mapper.Setup(x => x.Map<Product>(createProductDTO)).Returns(product);
        _mapper.Setup(x => x.Map<ProductResponseDTO>(product)).Returns(createProductResponse);
        _productService.Setup(x => x.AddAsync(product)).ReturnsAsync(
            Result.Success(product)
        );

        // Act
        var result = await _controller.CreateProduct(createProductDTO);

        // Assert
        result.Should().BeOfType<ObjectResult>();
        result.As<ObjectResult>().StatusCode.Should().Be(201);
        result.As<ObjectResult>().Value.As<ProductResponseDTO>().Name.Should().Be(product.Name);
    }

    [Fact]
    public async void ProductsController_UpdateProduct_ReturnOk()
    {
        // Arrange
        var product = _fixture.Create<Product>();
        var productUpdate = new Product
        {
            Id = product.Id,
            Description = "Update" + product.Description,
            Quantity = product.Quantity + 1,
            Price = product.Price + 1000
        };
        var productUpdateData = new UpdateProductDTO
        {
            Name = product.Name,
            Description = "Update" + product.Description,
            Quantity = product.Quantity + 1,
            Price = product.Price + 1000
        };
        var productId = product.Id;
        var productResponseDTO = _fixture.Create<ProductResponseDTO>();

        // _productService.Setup(x => x.Exists(productId)).ReturnsAsync(Result.Success(true));
        _productService.Setup(x => x.Update(productId, productUpdateData)).ReturnsAsync(Result.Success(productUpdate));
        _mapper.Setup(x => x.Map<ProductResponseDTO>(productUpdate)).Returns(productResponseDTO);

        // Act
        var result = await _controller.UpdateProduct(productId, productUpdateData);

        // Assert
        result.Should().BeOfType<OkObjectResult>();
        result.As<OkObjectResult>().Value.Should().Be(productResponseDTO);
    }

    [Fact]
    public async void ProductsController_UpdateProduct_ReturnNotFound()
    {
        // Arrange
        var productId = Guid.NewGuid().ToString();
        var product = new Product
        {
            Id = productId,
            Name = "Product A",
            Quantity = 1,
            Price = 1000
        };
        var productUpdateData = new UpdateProductDTO
        {
            Name = "Product A",
            Description = product.Description,
            Quantity = 1,
            Price = 1000
        };
        _productService.Setup(x => x.Update(productId, productUpdateData)).ReturnsAsync(
            Result.Failure(ProductError.ProductNotFound(productId))
        );

        // Act
        var result = await _controller.UpdateProduct(productId, productUpdateData);

        // Assert
        result.Should().BeOfType<ObjectResult>();
        result.As<ObjectResult>().Value.As<ResultFailureDTO>().ErrorCode.Should().Be("ProductError.ProductNotFound");
    }

    [Fact]
    public async void ProductsController_DeleteProduct_ReturnNoContent()
    {
        // Arrange
        var productId =  Guid.NewGuid().ToString();
        // _productService.Setup(x => x.Exists(productId)).ReturnsAsync(Result.Success(true));
        _productService.Setup(x => x.Delete(productId)).ReturnsAsync(Result.Success());

        // Act
        var result = await _controller.DeleteProduct(productId);

        // Assert
        result.Should().BeOfType<NoContentResult>();
    }

    [Fact]
    public async void ProductsController_DeleteProduct_ReturnNotFound()
    {
        // Arrange
        var productId = Guid.NewGuid().ToString();
        _productService.Setup(x => x.Delete(productId)).ReturnsAsync(
            Result.Failure(ProductError.ProductNotFound(productId))
        );
        // _productService.Setup(x => x.Exists(productId)).ReturnsAsync(Result.Success(false));

        // Act
        var result = await _controller.DeleteProduct(productId);

        // Assert
        result.Should().BeOfType<ObjectResult>();
        result.As<ObjectResult>().Value.As<ResultFailureDTO>().ErrorCode.Should().Be("ProductError.ProductNotFound");
    }
}
