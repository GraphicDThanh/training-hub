namespace StoreManagement.Services;

public class OrderService(
    ILogger<IOrderService> Logger,
    IOrderRepository OrderRepository,
    IOrderItemRepository OrderItemRepository,
    ICacheService CacheService
) : IOrderService
{
    public async Task<Result> CreateOrder(CreateOrderDTO CreateOrderDTO)
    {
        Logger.LogInformation(OrderLogTemplates.CreateOrder, "Service", CreateOrderDTO);

        try
        {
            if (CreateOrderDTO.OrderItems is null | CreateOrderDTO.OrderItems!.Count == 0)
            {
                Logger.LogError(OrderLogTemplates.CreateOrderRequireItems, "Service");
                return Result.Failure(OrderError.CreateOrderRequireItems);
            }

            // Create new order
            var order = new Order
            {
                UserId = CreateOrderDTO.UserId,
                ShoppingCartId = CreateOrderDTO.ShoppingCartId,
                TotalPay = CreateOrderDTO.TotalPay
            };
            await OrderRepository.AddAsync(order);

            // Add order items
            foreach (var item in CreateOrderDTO.OrderItems)
            {
                var orderItem = new OrderItem
                {
                    OrderId = order.Id,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Price = item.Price
                };
                await OrderItemRepository.AddAsync(orderItem);
            }

            // evict cache
            CacheService.RemoveList(CacheKeys.Orders);

            return Result.Success(order);
        }
        catch (Exception e)
        {
            Logger.LogError(LogTemplates.InternalServer, e.Message);
            return Result.Failure(Error.InternalServerFail(e.Message));
        }
    }

    public async Task<Result> GetAllAsync(string? userId, string? searchTerm, string? orderBy, ClaimsPrincipal claimsPrincipal)
    {
        Logger.LogInformation(OrderLogTemplates.GetOrders, "Service", searchTerm, orderBy);

        string cacheKeyOrders = CacheKeys.Orders;
        string cacheKeyOrdersWithFilters = CacheKeys.OrdersWithFilters(searchTerm, orderBy);

        var cacheValue = CacheService.Get(cacheKeyOrdersWithFilters);
        if (cacheValue is not null)
        {
            // cache hit
            return Result.Success(cacheValue);
        }

        // Define order owner id
        string userIdRequest;
        if (claimsPrincipal.IsInRole(UserRole.Admin))
        {
            // missing data required to create cart
            if (userId is null)
            {
                Logger.LogInformation(OrderLogTemplates.AdminGetOrdersMissingUserData, "Service");
                return Result.Failure(OrderError.AdminGetOrdersMissingUserData);
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
            // filter by userId
            Expression<Func<Order, bool>>? where = null;
            where = order => order.UserId! == userIdRequest;
            // - search by searchTerm (not yet)

            // create specification
            var spec = new OrdersSpec(where, orderBy, null, null);

            // get results
            var results = await OrderRepository.GetAllSpecificationAsync(spec);

            // set cache
            // need to transform IQueryable<> to List<> then cache it
            CacheService.SetAndSyncKeyToList(
                cacheKeyOrdersWithFilters, results.ToList(), cacheKeyOrders);
            return Result.Success(results);
        }
        catch (Exception e)
        {
            Logger.LogError(LogTemplates.InternalServer, e.Message);
            return Result.Failure(Error.InternalServerFail(e.Message));
        }
    }

    public async Task<Result> GetAllWithPagingAsync(string? userId, string? searchTerm, string? orderBy, int page, int pageSize, ClaimsPrincipal claimsPrincipal)
    {
        Logger.LogInformation(
            OrderLogTemplates.GetOrdersPagination, "Service",
            userId, searchTerm, orderBy, page, pageSize);


        string cacheKeyList = CacheKeys.Orders;
        string cacheKeyListWithFiltersAndPagination = CacheKeys.OrdersWithFiltersAndPagination(searchTerm, orderBy, page, pageSize);

        // cache hit
        var cacheValue = CacheService.Get(cacheKeyListWithFiltersAndPagination);
        if (cacheValue is not null)
        {
            // cache hit
            return Result.Success(cacheValue);
        }

        try
        {
            // filter
            Expression<Func<Order, bool>>? where = null;
            where = order => order.UserId! == userId;
            // - search by searchTerm (not yet)

            // create specification
            var spec = new OrdersSpec(where, orderBy, page, pageSize);

            // get results
            var results = await OrderRepository.GetAllSpecificationPaginationAsync(spec);

            // set cache
            CacheService.SetAndSyncKeyToList(
                cacheKeyListWithFiltersAndPagination, results, cacheKeyList);

            return Result.Success(results);
        }
        catch (Exception e)
        {
            Logger.LogError(LogTemplates.InternalServer, e.Message);
            return Result.Failure(Error.InternalServerFail(e.Message));
        }
    }

    public async Task<Result> GetOrderByIdAsync(string orderId, ClaimsPrincipal claimsPrincipal)
    {
        Logger.LogInformation(OrderLogTemplates.GetOrderById, "Service", orderId);

        string cacheKey = CacheKeys.OrderById(orderId);
        var cacheValue = CacheService.Get(cacheKey);

        Order? order;
        if (cacheValue is not null)
        {
            // cache hit
            order = (Order)cacheValue;
        }
        else
        {
            try
            {
                order = await OrderRepository.GetByIdAsync(orderId);

                // set cache
                CacheService.Set(cacheKey, order);
            }
            catch (Exception e)
            {
                Logger.LogError(LogTemplates.InternalServer, e.Message);
                return Result.Failure(Error.InternalServerFail(e.Message));
            }
        }


        if (order is null)
        {
            Logger.LogError(OrderLogTemplates.OrderWithIdNotFound, orderId);
            return Result.Failure(OrderError.OrderByIdNotFound(orderId));
        }

        var claim = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier);
        if (claim is null)
        {
            Logger.LogInformation(UserLogTemplates.UserNotFound, "Controller");
            return Result.Failure(UserError.UserNotFound);
        }

        var isCartOwner = claim.Value == order.UserId;
        var isAdminRequest = claimsPrincipal.IsInRole(UserRole.Admin);

        // Prevent user access to other user shopping cart
        if (!isCartOwner & !isAdminRequest)
        {
            Logger.LogError(OrderLogTemplates.OrderForbiddenAccess, orderId);
            return Result.Failure(OrderError.OrderForbiddenAccess);
        }

        return Result.Success(order);
    }
}
