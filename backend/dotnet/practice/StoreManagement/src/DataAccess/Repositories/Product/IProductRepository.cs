namespace StoreManagement.Repositories;

public interface IProductRepository : IGenericRepository<Product>
{
    Task<bool> ExistsAsync(string productId);
}
