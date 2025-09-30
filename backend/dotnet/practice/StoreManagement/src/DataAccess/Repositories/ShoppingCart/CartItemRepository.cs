namespace StoreManagement.Repositories;

public class CartItemRepository(StoreManagementDbContext dbContext) :
    GenericRepository<CartItem>(dbContext), ICartItemRepository
{
}
