namespace StoreManagement.Services;

public interface IProductService
{
    Task<Result> AddAsync(Product product);
    Task<Result> GetAllAsync(string? searchTerm, string? orderBy);
    Task<Result> GetAllWithPagingAsync(string? searchTerm, string? orderBy, int page, int pageSize);
    Task<Result> GetProductById(string id);
    Task<Result> Update(string id, UpdateProductDTO productData);
    Task<Result> Delete(string id);
}
