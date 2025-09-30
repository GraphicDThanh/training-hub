using Microsoft.AspNetCore.Identity.UI.Services;

namespace StoreManagement.Services;

public class ShoppingCartService(
    ILogger<ShoppingCartService> Logger,
    IEmailSender EmailSender,
    IUserRepository UserRepository,
    IProductRepository ProductRepository,
    IShoppingCartRepository ShoppingCartRepository,
    ICartItemRepository CartItemRepository,
    IOrderRepository OrderRepository,
    IOrderService OrderService,
    ICacheService CacheService
) : IShoppingCartService
{

    public async Task<Result> GetShoppingCartById(string cartId, ClaimsPrincipal claimsPrincipal)
    {
        Logger.LogInformation(ShoppingCartLogTemplates.GetShoppingCartId, "Service", cartId);
        var cacheKey = CacheKeys.ShoppingCartById(cartId);
        var cacheValue = CacheService.Get(cacheKey);

        ShoppingCart? shoppingCart;
        if (cacheValue is not null)
        {
            // cache hit
            shoppingCart = (ShoppingCart)cacheValue;
        }
        else
        {
            try
            {
                shoppingCart = await ShoppingCartRepository.GetByIdAsync(cartId);

                // set cache
                CacheService.Set(cacheKey, shoppingCart);
            }
            catch (Exception e)
            {
                Logger.LogError(LogTemplates.InternalServer, e.Message);
                return Result.Failure(Error.InternalServerFail(e.Message));
            }
        }

        if (shoppingCart is null)
        {
            Logger.LogError(ShoppingCartLogTemplates.ShoppingCartWithIdNotFound, cartId);
            return Result.Failure(ShoppingCartError.ShoppingCartByIdNotFound(cartId));
        }

        var claim = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier);
        if (claim is null)
        {
            Logger.LogInformation(UserLogTemplates.UserNotFound, "Controller");
            return Result.Failure(UserError.UserNotFound);
        }

        var isCartOwner = claim.Value == shoppingCart.UserId;
        var isAdminRequest = claimsPrincipal.IsInRole(UserRole.Admin);

        // Prevent user access to other user shopping cart
        if (!isCartOwner & !isAdminRequest)
        {
            Logger.LogError(ShoppingCartLogTemplates.ShoppingCartForbiddenAccess, cartId);
            return Result.Failure(ShoppingCartError.ShoppingCartForbiddenAccess());
        }

        return Result.Success(shoppingCart);
    }

    public async Task<Result> Create(string? userId, ClaimsPrincipal claimsPrincipal)
    {
        Logger.LogInformation(ShoppingCartLogTemplates.CreateShoppingCart, "Service");

        // Define cart owner
        string userIdRequest;
        if (claimsPrincipal.IsInRole(UserRole.Admin))
        {
            // missing data required to create cart
            if (userId is null)
            {
                Logger.LogInformation(ShoppingCartLogTemplates.AdminCreateShoppingCartMissingUserData, "Service");
                return Result.Failure(ShoppingCartError.AdminCreateShoppingCartMissingUserData());
            }

            userIdRequest = userId;
        }
        else
        {
            var claim = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier);
            if (claim is null)
            {
                Logger.LogInformation(UserLogTemplates.UserNotFound, "Controller");
                return Result.Failure(UserError.UserNotFound);
            }

            userIdRequest = claim.Value;
        }

        try
        {
            // Validate user exists
            var user = await UserRepository.GetByIdAsync(userIdRequest);
            if (user is null)
            {
                Logger.LogInformation(UserLogTemplates.UserWithIdNotFound, userIdRequest);
                return Result.Failure(UserError.UserByIdNotFound(userIdRequest));
            }

            // Check if user already has a shopping cart
            var existingShoppingCart = await ShoppingCartRepository.GetByUserIdAsync(userIdRequest);
            if (existingShoppingCart is not null)
            {
                Logger.LogInformation(ShoppingCartLogTemplates.ShoppingCartExists, "Service", userId, existingShoppingCart.Id);
                return Result.Failure(
                    ShoppingCartError.ShoppingCartExists(userIdRequest, existingShoppingCart.Id));
            }

            // Create new shopping cart for user
            var shoppingCart = new ShoppingCart { UserId = userIdRequest };
            await ShoppingCartRepository.AddAsync(shoppingCart);

            // Evict user cache
            CacheService.Remove(CacheKeys.UserById(userIdRequest));

            return Result.Success(shoppingCart);
        }
        catch (Exception e)
        {
            Logger.LogError(LogTemplates.InternalServer, e.Message);
            return Result.Failure(Error.InternalServerFail(e.Message));
        }
    }

    public async Task<Result> Update(string cartId, UpdateShoppingCartDTO shoppingCartData, ClaimsPrincipal claimsPrincipal)
    {
        Logger.LogInformation(ShoppingCartLogTemplates.UpdateShoppingCart, "Service", shoppingCartData);

        try
        {
            // check if shopping cart exists
            var shoppingCart = await ShoppingCartRepository.GetByIdAsync(cartId);

            if (shoppingCart is null)
            {
                Logger.LogError(ShoppingCartLogTemplates.ShoppingCartWithIdNotFound, cartId);
                return Result.Failure(ShoppingCartError.ShoppingCartByIdNotFound(cartId));
            }

            // permission on update cart
            var isCartOwner = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value == shoppingCart.UserId;
            var isAdminRequest = claimsPrincipal.IsInRole(UserRole.Admin);

            // prevent user access to other user shopping cart
            if (!isCartOwner & !isAdminRequest)
            {
                Logger.LogError(ShoppingCartLogTemplates.ShoppingCartForbiddenAccess, cartId);
                return Result.Failure(ShoppingCartError.ShoppingCartForbiddenAccess());
            }

            // check if cart able to update (if order is placed, cart can't be updated)
            if (await OrderRepository.GetByShoppingCartIdAsync(cartId) is not null)
            {
                Logger.LogError(ShoppingCartLogTemplates.ShoppingCartAlreadyOrdered, cartId);
                return Result.Failure(ShoppingCartError.ShoppingCartAlreadyOrdered(cartId));
            }

            // validate shoppingCartData with quantity product in stock
            if (shoppingCartData.CartItems is not null)
            {
                var validateResult = await ValidateShoppingCartDataWithProductInStock(shoppingCartData);
                if (validateResult.IsFailure)
                    return validateResult!;
            }

            // Case 1: Go clean cart items - shopping cart has items, shopping cart data is empty
            if (shoppingCart.CartItems!.Count > 0 & shoppingCartData.CartItems!.Length == 0)
            {
                try
                {
                    // clean cart items
                    foreach (var item in shoppingCart.CartItems)
                    {
                        await CartItemRepository.DeleteAsync(item);
                    }

                    // update cart status to processing
                    await ShoppingCartRepository.UpdateCartStatusAsync(
                        shoppingCart, ShoppingCartStatus.PROCESSING);

                    // reset cache
                    CacheService.Set(shoppingCart.Id, shoppingCart);

                    return Result.Success(shoppingCart);
                }
                catch (Exception e)
                {
                    Logger.LogError(LogTemplates.InternalServer, e.Message);
                    return Result.Failure(Error.InternalServerFail(e.Message));
                }
            }

            // Case 2: Add cart items to shopping cart empty
            if (shoppingCart.CartItems!.Count == 0 & shoppingCartData.CartItems!.Length > 0)
            {
                try
                {
                    var addItemsToCartResult = await UpdateCartItems(shoppingCart, shoppingCartData);
                    if (addItemsToCartResult.IsFailure)
                        return addItemsToCartResult;

                    // update cart status to processing
                    await ShoppingCartRepository.UpdateCartStatusAsync(
                        shoppingCart, ShoppingCartStatus.PROCESSING);

                    // reset cache
                    CacheService.Set(shoppingCart.Id, shoppingCart);
                    return Result.Success(shoppingCart);
                }
                catch (Exception e)
                {
                    Logger.LogError(LogTemplates.InternalServer, e.Message);
                    return Result.Failure(Error.InternalServerFail(e.Message));
                }
            }

            // Case 3: Update cart items - replacement - not support bulk update each cart item
            // clean cart items
            // FIX ME: bulk delete should be implemented
            foreach (var itemExist in shoppingCart.CartItems)
            {
                await CartItemRepository.DeleteAsync(itemExist);
            }

            // add cart items to shopping cart
            var updateCartItemResult = await UpdateCartItems(shoppingCart, shoppingCartData);
            if (updateCartItemResult.IsFailure)
                return updateCartItemResult;

            // update cart status to processing
            await ShoppingCartRepository.UpdateCartStatusAsync(shoppingCart, ShoppingCartStatus.PROCESSING);

            // evict cache
            CacheService.Set(shoppingCart.Id, shoppingCart);

            return Result.Success(shoppingCart);
        }
        catch (Exception e)
        {
            Logger.LogError(LogTemplates.InternalServer, e.Message);
            return Result.Failure(Error.InternalServerFail(e.Message));
        }
    }

    public async Task<Result> Order(string cartId, ClaimsPrincipal claimsPrincipal)
    {
        Logger.LogInformation(ShoppingCartLogTemplates.OrderShoppingCart, "Service", cartId);

        try
        {
            // Validation
            // - check if shopping cart exists
            var shoppingCart = await ShoppingCartRepository.GetByIdAsync(cartId);

            if (shoppingCart is null)
            {
                Logger.LogError(ShoppingCartLogTemplates.ShoppingCartWithIdNotFound, cartId);
                return Result.Failure(ShoppingCartError.ShoppingCartByIdNotFound(cartId));
            }

            // - check if cart missing owner
            var shoppingCartOwner = shoppingCart.UserId;
            if (shoppingCartOwner is null)
            {
                Logger.LogError(ShoppingCartLogTemplates.ShoppingCartMissingOwner, cartId);
                return Result.Failure(ShoppingCartError.ShoppingCartMissingOwner(cartId));
            }

            // - permission on order cart
            var isCartOwner = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value == shoppingCartOwner;
            var isAdminRequest = claimsPrincipal.IsInRole(UserRole.Admin);

            // Prevent user access to other user shopping cart
            if (!isCartOwner & !isAdminRequest)
            {
                Logger.LogError(ShoppingCartLogTemplates.ShoppingCartForbiddenAccess, cartId);
                return Result.Failure(ShoppingCartError.ShoppingCartForbiddenAccess());
            }

            // - check if cart already ordered
            if (await OrderRepository.GetByShoppingCartIdAsync(cartId) is not null)
            {
                Logger.LogError(ShoppingCartLogTemplates.ShoppingCartAlreadyOrdered, cartId);
                return Result.Failure(ShoppingCartError.ShoppingCartAlreadyOrdered(cartId));
            }

            // - check if cart has items
            if (shoppingCart.CartItems is null || shoppingCart.CartItems.Count == 0)
            {
                Logger.LogError(ShoppingCartLogTemplates.ShoppingCartEmpty, cartId);
                return Result.Failure(ShoppingCartError.ShoppingCartEmpty(cartId));
            }

            // Create order for shopping session
            // FIX ME: how to map collection of items?
            var orderItems = new List<CreateOrderItemDTO>();
            decimal totalPay = 0;
            foreach (var item in shoppingCart.CartItems)
            {

                var productPrice = item.Product is null ? 0 : item.Product.Price;
                orderItems.Add(new CreateOrderItemDTO
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Price = productPrice
                });

                totalPay += productPrice * item.Quantity;
            }
            var createOrderData = new CreateOrderDTO
            {
                UserId = shoppingCartOwner,
                ShoppingCartId = shoppingCart.Id,
                OrderItems = orderItems,
                TotalPay = totalPay,
            };

            await OrderService.CreateOrder(createOrderData);

            // Update product quantity
            foreach (var item in shoppingCart.CartItems)
            {
                var product = await ProductRepository.GetByIdAsync(item.ProductId!);
                if (product is not null)
                {
                    product.Quantity -= item.Quantity;
                    await ProductRepository.UpdateAsync(product);

                    // evict cache - product detail
                    CacheService.Remove(CacheKeys.ProductById(product.Id));
                }
            }

            // Send email to user
            var user = await UserRepository.GetByIdAsync(shoppingCartOwner);
            if (user is not null)
            {
                await EmailSender.SendEmailAsync(
                    user.Email!,
                    "Order Confirmation",
                    "Your order has been placed successfully!"
                );
            }

            // Set shopping session status
            await ShoppingCartRepository.UpdateCartStatusAsync(
                shoppingCart, ShoppingCartStatus.COMPLETED);

            // Create new shopping cart for user
            var shoppingCartNewSession = new ShoppingCart { UserId = shoppingCartOwner };
            await ShoppingCartRepository.AddAsync(shoppingCartNewSession);

            // evict cache
            // evict cache on product list
            CacheService.RemoveList(CacheKeys.Products);
            // evict cache on cart detail
            CacheService.Remove(CacheKeys.ShoppingCartById(shoppingCart.Id));
            // evict cache on orders list

            return Result.Success();
        }
        catch (Exception e)
        {
            Logger.LogError(LogTemplates.InternalServer, e.Message);
            return Result.Failure(Error.InternalServerFail(e.Message));
        }
    }

    private async Task<Result> UpdateCartItems(
        ShoppingCart shoppingCart, UpdateShoppingCartDTO shoppingCartData)
    {
        if (shoppingCartData.CartItems is null)
            return Result.Success();

        foreach (var item in shoppingCartData.CartItems)
        {
            var product = await ProductRepository.GetByIdAsync(item.ProductId!);
            if (product is null)
            {
                Logger.LogError(ProductLogTemplates.ProductNotFound, item.ProductId);
                return Result.Failure(ProductError.ProductNotFound(item.ProductId!));
            }

            var cartItem = new CartItem
            {
                Quantity = item.Quantity,
                ProductId = product.Id,
                ShoppingCartId = shoppingCart.Id,
                Product = product
            };

            await CartItemRepository.AddAsync(cartItem);
        }

        return Result.Success();
    }

    private async Task<Result> ValidateShoppingCartDataWithProductInStock(UpdateShoppingCartDTO shoppingCartData)
    {
        if (shoppingCartData.CartItems is null || shoppingCartData.CartItems.Length == 0)
            return Result.Success();

        foreach (var item in shoppingCartData.CartItems)
        {
            var product = await ProductRepository.GetByIdAsync(item.ProductId!);
            if (product is null)
            {
                Logger.LogError(ProductLogTemplates.ProductNotFound, item.ProductId);
                return Result.Failure(ProductError.ProductNotFound(item.ProductId!));
            }

            if (product.Quantity < item.Quantity)
            {
                Logger.LogError(ProductLogTemplates.ProductOutOfStock, item.ProductId);
                return Result.Failure(ProductError.ProductOutOfStock(item.ProductId!));
            }
        }

        return Result.Success();
    }
}
