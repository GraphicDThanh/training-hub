using AutoMapper;
using StoreManagement.Constants;
using StoreManagement.DTOs;
using StoreManagement.Services;
using StoreManagement.Extensions;
using Microsoft.AspNetCore.Authorization;
using Asp.Versioning;

namespace StoreManagement.Controllers;

[
    ApiController,
    ApiVersion("1.0"),
    Route("api/v{version:apiVersion}/shopping-carts")
    // back compatibility
    // Route("api/shopping-carts")
]
public class ShoppingCartsController(
    IShoppingCartService shoppingCartService,
    ILogger<ShoppingCartsController> logger,
    IMapper mapper
) : ControllerBase
{
    [
        HttpPost,
        Authorize,
        ProducesResponseType(StatusCodes.Status201Created),
        ProducesResponseType(StatusCodes.Status400BadRequest)
    ]
    public async Task<IActionResult> CreateShoppingCart([FromQuery] string? userId)
    {
        logger.LogInformation(ShoppingCartLogTemplates.CreateShoppingCart, "Controller");

        var result = await shoppingCartService.Create(userId, User);
        if (result.IsFailure)
            return result.ToProblemDetails();

        return new ObjectResult(
            mapper.Map<ShoppingCartDTO>(result.Value)
        )
        { StatusCode = StatusCodes.Status201Created };
    }

    [
        HttpGet("{id}"),
        Authorize,
        ProducesResponseType(StatusCodes.Status200OK),
        ProducesResponseType(StatusCodes.Status404NotFound),
        ProducesResponseType(StatusCodes.Status403Forbidden)
    ]
    public async Task<IActionResult> GetShoppingCartById(string id)
    {
        logger.LogInformation(ShoppingCartLogTemplates.GetShoppingCartId, "Controller", id);

        var result = await shoppingCartService.GetShoppingCartById(id, User);
        if (result.IsFailure)
            return result.ToProblemDetails();

        var cartResponse = mapper.Map<ShoppingCartDTO>(result.Value);
        return Ok(cartResponse);
    }

    [
        HttpPut("{id}"),
        Authorize,
        ProducesResponseType(StatusCodes.Status200OK),
        ProducesResponseType(StatusCodes.Status400BadRequest)
    ]
    public async Task<IActionResult> UpdateShoppingCart(string id, UpdateShoppingCartDTO shoppingCartData)
    {
        logger.LogInformation(ShoppingCartLogTemplates.UpdateShoppingCart, "Controller", shoppingCartData);

        var result = await shoppingCartService.Update(id, shoppingCartData, User);

        if (result.IsFailure)
            return result.ToProblemDetails();

        var cartResponse = mapper.Map<ShoppingCartDTO>(result.Value ?? null);
        return Ok(cartResponse);
    }

    [
        HttpPost("{id}/order"),
        Authorize,
        ProducesResponseType(StatusCodes.Status200OK),
        ProducesResponseType(StatusCodes.Status400BadRequest)
    ]
    public async Task<IActionResult> OrderShoppingCart(string id)
    {
        logger.LogInformation(ShoppingCartLogTemplates.OrderShoppingCart, "Controller", id);

        var result = await shoppingCartService.Order(id, User);

        if (result.IsFailure)
            return result.ToProblemDetails();

        return Ok();
    }
}
