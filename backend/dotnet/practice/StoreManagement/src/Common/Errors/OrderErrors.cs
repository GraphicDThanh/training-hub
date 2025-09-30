namespace StoreManagement.Errors;

public sealed record OrderErrorCode
{
    public const string OrderByIdNotFound = "OrderError.OrderByIdNotFound";
    public const string AdminGetOrdersMissingUserData = "OrderError.AdminGetOrdersMissingUserData";
    public const string CreateOrderRequireItems = "OrderError.CreateOrderRequireItems";
    public const string OrderForbiddenAccess = "OrderError.OrderForbiddenAccess";
}

public sealed record OrderErrorMessage
{
    public static string OrderByIdNotFound(string id) => $"Order with id '{id}' not found.";
    public const string AdminGetOrdersMissingUserData = "Admin get orders missing user data.";
    public const string CreateOrderRequireItems = "Order must have at least one item.";
    public const string OrderForbiddenAccess = "Order forbidden access.";
}


public static class OrderError
{

    public static Error OrderByIdNotFound(string id) =>
        Error.NotFound(
            OrderErrorCode.OrderByIdNotFound,
            OrderErrorMessage.OrderByIdNotFound(id));

    public static readonly Error OrderForbiddenAccess =
        Error.Forbidden(
            OrderErrorCode.OrderForbiddenAccess,
            OrderErrorMessage.OrderForbiddenAccess);

    public static readonly Error AdminGetOrdersMissingUserData =
        Error.NotFound(
            OrderErrorCode.AdminGetOrdersMissingUserData,
            OrderErrorMessage.AdminGetOrdersMissingUserData);

    public static readonly Error CreateOrderRequireItems =
        Error.Validation(
            OrderErrorCode.CreateOrderRequireItems,
            OrderErrorMessage.CreateOrderRequireItems);
}
