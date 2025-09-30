using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using StoreManagement.Entities;
using StoreManagement.Extensions;
using StoreManagement.DTOs;
using StoreManagement.Constants;
using StoreManagement.Services;
using StoreManagement.Patterns;
using Asp.Versioning;

namespace StoreManagement.Controllers;

[
    ApiController,
    ApiVersion("1.0"),
    Route("api/v{version:apiVersion}/products")
    // back compatibility
    // Route("api/products")
]
public class ProductsController(
    IMapper mapper,
    ILogger<ProductsController> logger,
    IProductService productService
) : ControllerBase
{
    [HttpGet()]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAllAsync(
        [FromQuery] string? searchTerm,
        [FromQuery] string? orderBy,
        [FromQuery] int page,
        [FromQuery] int pageSize
    )
    {
        logger.LogInformation(ProductLogTemplates.GetProductsPagination, "Controller", searchTerm, orderBy, page, pageSize);

        // Get All with Pagination
        if (page > 0 & pageSize > 0)
        {
            var resultPaginated = await productService.GetAllWithPagingAsync(searchTerm, orderBy, page, pageSize);

            if (resultPaginated.IsFailure)
                return resultPaginated.ToProblemDetails();

            var resultPagination = (PaginatedList<Product>)resultPaginated.Value!;
            var results = mapper.Map<List<ProductShortFormResponseDTO>>(resultPagination);
            var metadata = new
            {
                resultPagination.TotalCount,
                resultPagination.PageSize,
                resultPagination.CurrentPage,
                resultPagination.TotalPages,
                resultPagination.HasNext,
                resultPagination.HasPrevious,
                results
            };

            return Ok(
                new ResultSuccessDTO
                {
                    Title = Messages.GetAllWithPagingAsyncSuccess,
                    Data = metadata
                }
            );
        }

        // Get All
        var result = await productService.GetAllAsync(searchTerm, orderBy);

        if (result.IsFailure)
            return result.ToProblemDetails();

        var products = mapper.Map<IEnumerable<ProductShortFormResponseDTO>>(result.Value!);
        return Ok(
            new ResultSuccessDTO
            {
                Title = Messages.GetAllAsyncSuccess,
                Data = products
            }
        );
    }

    [HttpGet("{id}")]
    [ProducesResponseType(200), ProducesResponseType(404)]
    public async Task<IActionResult> GetById(string id)
    {
        logger.LogInformation(ProductLogTemplates.GetById, "Controller", id);

        var result = await productService.GetProductById(id);

        return result.IsSuccess ? Ok(
            mapper.Map<ProductResponseDTO>(
                result.Value is null ? null : (Product)result.Value)
        ) : result.ToProblemDetails();
    }

    [HttpPost, Authorize(Roles = "Admin")]
    [
        ProducesResponseType(StatusCodes.Status201Created),
        ProducesResponseType(StatusCodes.Status400BadRequest)
    ]
    public async Task<IActionResult> CreateProduct(CreateProductDTO productData)
    {
        logger.LogInformation(ProductLogTemplates.CreateProduct, "Controller", productData);

        var result = await productService.AddAsync(mapper.Map<Product>(productData));

        if (result.IsFailure)
            return result.ToProblemDetails();

        var value = mapper.Map<ProductResponseDTO>(
            result.Value is null ? null : (Product)result.Value
        );
        return new ObjectResult(value) { StatusCode = StatusCodes.Status201Created };
    }

    [HttpPut("{id}"), Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
    [ProducesResponseType(404), ProducesResponseType(400)]
    public async Task<IActionResult> UpdateProduct(string id, UpdateProductDTO productData)
    {
        logger.LogInformation(ProductLogTemplates.UpdateProduct, "Controller", productData);

        var result = await productService.Update(id, productData);

        if (result.IsFailure)
            return result.ToProblemDetails();

        var value = mapper.Map<ProductResponseDTO>(
            result.Value is null ? null : (Product)result.Value
        );
        return Ok(value);
    }

    [HttpDelete("{id}"), Authorize(Roles = "Admin")]
    [ProducesResponseType(404), ProducesResponseType(204)]
    public async Task<IActionResult> DeleteProduct(string id)
    {
        logger.LogInformation(ProductLogTemplates.DeleteProduct, "Controller", id);

        var result = await productService.Delete(id);
        return result.IsSuccess ? NoContent() : result.ToProblemDetails();
    }
}
