using AutoMapper;
using StoreManagement.Constants;
using StoreManagement.DTOs;
using StoreManagement.Services;
using StoreManagement.Extensions;
using Microsoft.AspNetCore.Authorization;
using StoreManagement.Patterns;
using StoreManagement.Entities;
using Asp.Versioning;

namespace StoreManagement.Controllers;

[
    ApiController,
    ApiVersion("1.0"),
    Route("api/v{version:apiVersion}/orders"),
    // back compatibility
    // Route("api/orders")
]
public class OrdersController(
    IOrderService orderService,
    ILogger<OrdersController> logger,
    IMapper mapper
) : ControllerBase
{
    [
        HttpGet,
        Authorize
    ]
    public async Task<IActionResult> GetAllAsync(
        [FromQuery] string? userId,
        [FromQuery] string? searchTerm,
        [FromQuery] string? orderBy,
        [FromQuery] int page,
        [FromQuery] int pageSize
    )
    {
        logger.LogInformation(OrderLogTemplates.GetOrdersPagination, "Controller", userId, searchTerm, orderBy, page, pageSize);

        // Get All with Pagination
        if (page > 0 & pageSize > 0)
        {
            var resultPaginated = await orderService.GetAllWithPagingAsync(
                userId, searchTerm, orderBy, page, pageSize, User);

            if (resultPaginated.IsFailure)
                return resultPaginated.ToProblemDetails();

            var resultPagination = (PaginatedList<Order>)resultPaginated.Value!;
            var results = mapper.Map<List<OrderDetailResponseDTO>>(resultPagination);
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
        var result = await orderService.GetAllAsync(userId, searchTerm, orderBy, User);

        if (result.IsFailure)
            return result.ToProblemDetails();

        var orders = mapper.Map<List<OrderInListResponseDTO>>(result.Value!);
        return Ok(
            new ResultSuccessDTO
            {
                Title = Messages.GetAllAsyncSuccess,
                Data = orders
            }
        );
    }

    [
        HttpGet("{id}"),
        Authorize,
        ProducesResponseType(200),
        ProducesResponseType(404),
        ProducesResponseType(403)

    ]
    public async Task<IActionResult> GetOrderById(string id)
    {
        logger.LogInformation(OrderLogTemplates.GetOrderById, "Controller", id);

        var result = await orderService.GetOrderByIdAsync(id, User);

        if (result.IsFailure)
            return result.ToProblemDetails();

        var cartResponse = mapper.Map<OrderDetailResponseDTO>(result.Value);
        return Ok(cartResponse);
    }
}
