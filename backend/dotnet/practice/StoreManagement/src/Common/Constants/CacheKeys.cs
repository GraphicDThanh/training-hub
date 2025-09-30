namespace StoreManagement.Constants;

public sealed class CacheKeys
{
    // Product
    public static string ProductById(string id) => $"Product_{id}";

    // this key save list of cache on product list
    // "Products": string[] { "Products_abc_xyz", "Products_abc_xyz_1_10"}
    // ref: https://stackoverflow.com/questions/43673833/how-to-iterate-through-memorycache-in-asp-net-core/43677373#43677373
    public static string Products => "Products";
    public static string ProductsWithFilters(string? searchTerm, string? orderBy) => $"Products_{searchTerm}_{orderBy}";
    public static string ProductsWithFiltersAndPagination(string? searchTerm, string? orderBy, int page, int pageSize) =>
        $"Products_{searchTerm}_{orderBy}_{page}_{pageSize}";

    // Cart
    public static string ShoppingCartById(string id) => $"ShoppingCart_{id}";

    // User
    public static string Users => "Users";
    public static string UserById(string id) => $"User_{id}";
    public static string UserByEmail(string email) => $"User_{email}";
    public static string UsersWithFilters(string? searchTerm, string? orderBy) => $"Users_{searchTerm}_{orderBy}";
    public static string UsersWithFiltersAndPagination(string? searchTerm, string? orderBy, int page, int pageSize) =>
        $"Users_{searchTerm}_{orderBy}_{page}_{pageSize}";


    // Order
    public static string Orders => "Orders";
    public static string OrderById(string id) => $"Order_{id}";
    public static string OrdersWithFilters(string? searchTerm, string? orderBy) => $"Orders_{searchTerm}_{orderBy}";
    public static string OrdersWithFiltersAndPagination(string? searchTerm, string? orderBy, int page, int pageSize) =>
        $"Orders_{searchTerm}_{orderBy}_{page}_{pageSize}";
}

// Manage cache keys
// Use the SetCacheHeaders middleware when making an API
// Use a custom middleware to cache responses, this way the URL itself becomes the cache key
// Store the cache keys as class constants
