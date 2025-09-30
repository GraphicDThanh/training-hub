namespace StoreManagement.Repositories;

public interface IOrderRepository : IGenericRepository<Order>
{
    Task<Order?> GetByShoppingCartIdAsync(string shoppingCartId);
}
