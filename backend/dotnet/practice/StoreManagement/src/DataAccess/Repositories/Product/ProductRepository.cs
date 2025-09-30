namespace StoreManagement.Repositories;

public class ProductRepository(StoreManagementDbContext dbContext) :
    GenericRepository<Product>(dbContext), IProductRepository
{
    public async Task<bool> ExistsAsync(string productId)
    {
        return await DbSet.AnyAsync(product => product.Id == productId);
    }
}
