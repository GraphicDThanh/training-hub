namespace StoreManagement.Repositories;

public class OrderItemRepository(StoreManagementDbContext dbContext) :
    GenericRepository<OrderItem>(dbContext),
    IOrderItemRepository
{
}
