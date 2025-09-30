namespace StoreManagement.Constants;
public static class LogTemplates
{
    public const string InternalServer = "Internal server error: {@Description}";
    public const string IdentityInternalServer = "Identity internal server error: {@Description}";
    public const string EntityNotFound = "@{EntityName} not found.";
    public const string EntityForbiddenAccess = "@{EntityName} Forbidden access.";
}
public static class RoleLogTemplates
{
    public const string RoleNotFound = "Role {@RoleName} not found.";
    public const string RoleNotSupport = "Role {@RoleName} not support.";
}

public static class UserLogTemplates
{
    public const string GetUsersPagination = "{@from}: Get all users with pagination, query params are {@searchTerm} {@orderBy} {@page} {@pageSize}.";
    public const string GetByIdAsync = "{@from}: Get user with id {@Id}.";
    public const string CreateUser = "{@from}: Create user {@UserData}.";
    public const string UpdateUser = "{@from}: Update user {@UserData}.";
    public const string DeleteUser = "{@from}: Delete user {@Id}.";
    public const string SetUserToRole = "{@from}: Set role to user with {@setRoleUserDTO}.";
    public const string UserWithEmailNotFound = "User with email {@Email} not found.";
    public const string UserWithIdNotFound = "User with email {@Id} not found.";
    public const string UserWithEmailExists = "User with email {@Email} already exists.";
    public const string UserCreated = "User with email {@Email} created.";
    public const string UserDeleted = "User with email {@Email} deleted.";
    public const string RoleAssigned = "Role {@RoleName} assigned to user with email {Email}.";
    public const string RoleNotFound = "Role {@RoleName} not found.";
    public const string UserRoleExist = "Role {@RoleName} exist.";
    public const string CreateUserFail = "Failed to create user with {@Email}.";
    public const string WrongPasswordFormat = "Wrong {@Password} format.";
    public const string UserNotFound = "{@from}: User not found.";
}

public static class ProductLogTemplates
{
    public const string GetProducts = "{@from}: Get all products, query params are {@searchTerm} {@orderBy}.";
    public const string GetProductsPagination = "{@from}: Get all products with pagination, query params are {@searchTerm} {@orderBy} {@page} {@pageSize}.";
    public const string GetById = "{@from}: Get product with id {@Id}.";
    public const string CreateProduct = "{@from}: Create product {@ProductData}.";
    public const string UpdateProduct = "{@from}: Update product {@ProductData}.";
    public const string DeleteProduct = "{@from}: Delete product {@Id}.";
    public const string ProductNotFound = "Product with id {@Id} not found.";
    public const string ProductIdMismatch = "Product id {@Id} does not match the id in the request.";
    public const string ProductExists = "Product with id {@Id} already exists.";
    public const string ProductCreated = "Product with id {@Id} created.";
    public const string ProductUpdated = "Product with id {@Id} updated.";
    public const string ProductDeleted = "Product with id {@Id} deleted.";
    public const string ProductFoundInCache = "Product with id {@Id} found in cache.";
    public const string ProductOutOfStock = "Product with id {@Id} out of stock.";
}

public static class ShoppingCartLogTemplates
{
    public const string CreateShoppingCart = "{@from}: Create shopping cart.";
    public const string AdminCreateShoppingCartMissingUserData = "{@from}: Missing data for admin to create shopping cart.";
    public const string GetShoppingCartId = "{@from}: Get shopping cart with id {@Id}.";
    public const string ActiveShoppingCartByIdNotFound = "{@from}: Get active shopping cart not found.";
    public const string GetShoppingCartItems = "{@from}: Get items in shopping cart with id {@Id}.";
    public const string UpdateShoppingCart = "{@from}: Update shopping cart with {@Data}.";
    public const string ShoppingCartExists = "{@from}: Shopping cart exists on user {@UserId} with id {@ExistingShoppingCartId}.";
    public const string OrderShoppingCart = "{@from}: Order shopping cart {@Id}.";
    public const string ShoppingCartWithIdNotFound = "Shopping cart with id {@Id} not found.";
    public const string ShoppingCartAlreadyOrdered = "Shopping cart {@Id} already order.";
    public const string ShoppingCartEmpty = "Shopping cart {@Id} empty.";
    public const string ShoppingCartForbiddenAccess = "Shopping cart {@Id} forbidden access.";
    public const string ShoppingCartMissingOwner = "Shopping cart {@Id} missing owner.";
}


public static class OrderLogTemplates
{
    public const string CreateOrder = "{@from}: Create order with {@Data}.";
    public const string CreateOrderRequireItems = "{@from}: Create order require items.";
    public const string GetOrders = "{@from}: Get all orders, query params are {@searchTerm} {@orderBy}.";
    public const string GetOrdersPagination = "{@from}: Get all orders of user with pagination, query params are {@userId} {@searchTerm} {@orderBy} {@page} {@pageSize}.";
    public const string GetOrderById = "{@from}: Get order with id {@Id}.";
    public const string OrderWithIdNotFound = "Order with id {@Id} not found.";
    public const string AdminGetOrdersMissingUserData = "{@from}: Missing data required to get orders.";
    public const string OrderForbiddenAccess = "Order {@Id} forbidden access.";
}
