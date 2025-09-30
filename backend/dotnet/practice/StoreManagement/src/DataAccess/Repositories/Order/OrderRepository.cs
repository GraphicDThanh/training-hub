namespace StoreManagement.Repositories;

public class OrderRepository(StoreManagementDbContext dbContext) :
    GenericRepository<Order>(dbContext), IOrderRepository
{
    public async Task<Order?> GetByShoppingCartIdAsync(string shoppingCartId)
    {
        return await DbSet.FirstOrDefaultAsync(order => order.ShoppingCartId == shoppingCartId);
    }

    new public async Task<Order?> GetByIdAsync(string id)
    {
        var order = await DbSet.FindAsync(id);
        if (order is null)
            return null;

         // Explicitly load the OrderItems navigation property.
        await _dbContext.Entry(order).Collection(s => s.OrderItems!).LoadAsync();
        return order;
    }
}
