namespace StoreManagement.Repositories;

public interface IShoppingCartRepository : IGenericRepository<ShoppingCart>
{
    Task<ShoppingCart?> GetByUserIdAsync(string userId);
    Task UpdateCartStatusAsync(ShoppingCart shoppingCart, ShoppingCartStatus status);
}
