namespace StoreManagement.Errors;

public sealed record ShoppingCartErrorCode
{
    public const string ShoppingCartByIdNotFound = "ShoppingCartError.ShoppingCartByIdNotFound";
    public const string ActiveShoppingCartForUserFound = "ShoppingCartError.ActiveShoppingCartForUserFound";
    public const string ShoppingCartExists = "ShoppingCartError.ShoppingCartExists";
    public const string ShoppingCartAlreadyOrdered = "ShoppingCartError.ShoppingCartAlreadyOrdered";
    public const string ShoppingCartEmpty = "ShoppingCartError.ShoppingCartEmpty";
    public const string AdminCreateShoppingCartMissingUserData = "ShoppingCartError.AdminCreateShoppingCartMissingUserData";
    public const string ShoppingCartForbiddenAccess = "ShoppingCartError.ShoppingCartForbiddenAccess";
    public const string ShoppingCartMissingOwner = "ShoppingCartError.ShoppingCartMissingOwner";
}


public sealed record ShoppingCartErrorMessage
{
    public static string ShoppingCartByIdNotFound(string id) =>
        $"Shopping cart with id '{id}' not found.";

    public static string ActiveShoppingCartForUserFound(string userId) =>
        $"Active shopping cart for user {userId} not found.";

    public static string ShoppingCartExists(string userId, string existingShoppingCartId) =>
        $"Shopping cart for user '{userId}' already exists with id {existingShoppingCartId}.";

    public static string ShoppingCartAlreadyOrdered(string id) =>
        $"Shopping cart with id '{id}' already ordered.";

    public static string ShoppingCartEmpty(string id) =>
        $"Shopping cart with id '{id}'is empty.";

    public static string ShoppingCartMissingOwner(string id) =>
        $"Shopping cart with id '{id}' missing owner.";

    public const string AdminCreateShoppingCartMissingUserData =
        "Missing data for admin to create shopping cart.";

    public const string ShoppingCartForbiddenAccess =
        "Shopping cart is not belong to user.";
}


public static class ShoppingCartError
{

    public static Error ShoppingCartByIdNotFound(string id) =>
        Error.Validation(
            ShoppingCartErrorCode.ShoppingCartByIdNotFound,
            ShoppingCartErrorMessage.ShoppingCartByIdNotFound(id));

    public static Error ActiveShoppingCartForUserFound(string userId) =>
       Error.Validation(
           ShoppingCartErrorCode.ActiveShoppingCartForUserFound,
           ShoppingCartErrorMessage.ActiveShoppingCartForUserFound(userId));

    public static Error ShoppingCartExists(string userId, string existingShoppingCartId) =>
        Error.Validation(
            ShoppingCartErrorCode.ShoppingCartExists,
            ShoppingCartErrorMessage.ShoppingCartExists(userId, existingShoppingCartId));

    public static Error ShoppingCartAlreadyOrdered(string id) =>
        Error.Validation(
            ShoppingCartErrorCode.ShoppingCartAlreadyOrdered,
            ShoppingCartErrorMessage.ShoppingCartAlreadyOrdered(id));

    public static Error ShoppingCartEmpty(string id) =>
        Error.Validation(
            ShoppingCartErrorCode.ShoppingCartEmpty,
            ShoppingCartErrorMessage.ShoppingCartEmpty(id));

    public static Error AdminCreateShoppingCartMissingUserData() =>
        Error.Validation(
            ShoppingCartErrorCode.AdminCreateShoppingCartMissingUserData,
            ShoppingCartErrorMessage.AdminCreateShoppingCartMissingUserData);

    public static Error ShoppingCartForbiddenAccess() =>
        Error.Forbidden(
            ShoppingCartErrorCode.ShoppingCartForbiddenAccess,
            ShoppingCartErrorMessage.ShoppingCartForbiddenAccess);

    public static Error ShoppingCartMissingOwner(string id) =>
        Error.Forbidden(
            ShoppingCartErrorCode.ShoppingCartMissingOwner,
            ShoppingCartErrorMessage.ShoppingCartEmpty(id));
}
