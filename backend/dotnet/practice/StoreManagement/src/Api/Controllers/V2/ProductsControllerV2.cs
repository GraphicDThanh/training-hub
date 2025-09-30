using AutoMapper;
using StoreManagement.Entities;
using StoreManagement.Extensions;
using StoreManagement.DTOs;
using StoreManagement.Constants;
using StoreManagement.Services;
using Asp.Versioning;
using StoreManagement.Patterns;

namespace StoreManagement.Controllers;

[
    ApiController,
    ApiVersion("2.0"),
    Route("api/v{version:apiVersion}/products")
    // back compatibility
    // Route("api/products/v2")
]
public class ProductsControllerV2(
    IMapper mapper,
    IProductService productService,
    ILogger<ProductsControllerV2> logger
) : ControllerBase
{

    [HttpGet()]
    [MapToApiVersion("2.0")]
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

        var products = mapper.Map<List<ProductShortFormResponseDTO>>(result.Value!);
        return Ok(
            new ResultSuccessDTO
            {
                Title = Messages.GetAllAsyncSuccess,
                Data = products
            }
        );
    }

    [HttpGet("{id}")]
    [MapToApiVersion("2.0")]
    [ProducesResponseType(200), ProducesResponseType(404)]
    public async Task<IActionResult> GetByIdV2(string id)
    {
        logger.LogInformation(ProductLogTemplates.GetById, "Controller", id);

        var result = await productService.GetProductById(id);

        return result.IsSuccess ? Ok(
            mapper.Map<ProductResponseV2DTO>(
                result.Value is null ? null : (Product)result.Value)
        ) : result.ToProblemDetails();
    }
}
