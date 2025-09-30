namespace StoreManagement.Errors;


public sealed record ProductErrorCode
{
    public const string ProductUpdateConflict = "ProductError.ProductUpdateConflict";
    public const string ProductNotFound = "ProductError.ProductNotFound";
    public const string DataModelInvalid = "ProductError.DataModelInvalid";
    public const string ProductOutOfStock = "ProductError.ProductOutOfStock";
}


public sealed record ProductErrorMessage
{
    public const string ProductUpdateConflict =
        "Product id and data update conflict.";

    public static string ProductNotFound(string id) =>
        $"Product with id {id} not found.";

    public static string DataModelInvalid(string message) =>
        $"Data model validation failed with message: {message}";

    public static string ProductOutOfStock(string id) =>
        $"Product with id {id} is out of stock.";
}


public static class ProductError
{
    public static readonly Error ConflictProductUpdate =
        Error.Validation(
            ProductErrorCode.ProductUpdateConflict,
            ProductErrorMessage.ProductUpdateConflict);

    public static Error ProductNotFound(string id) =>
        Error.Validation(
            ProductErrorCode.ProductNotFound,
            ProductErrorMessage.ProductNotFound(id));

    public static Error ProductDataModelInvalid(string message) =>
        Error.Failure(
            ProductErrorCode.DataModelInvalid,
            ProductErrorMessage.DataModelInvalid(message));

    public static Error ProductOutOfStock(string id) =>
        Error.Validation(
            ProductErrorCode.ProductOutOfStock,
            ProductErrorMessage.ProductOutOfStock(id));

}
