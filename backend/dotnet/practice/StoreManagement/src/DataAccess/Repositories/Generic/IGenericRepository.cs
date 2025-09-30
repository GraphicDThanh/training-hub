using StoreManagement.Patterns;
using StoreManagement.Specifications;

namespace StoreManagement.Repositories;

public interface IGenericRepository<T> where T : class
{
    Task<IList<T>> GetAllAsync();
    Task<T?> GetByIdAsync(string id);
    Task<T> AddAsync(T entity);
    Task<T> UpdateAsync(T entity);
    Task DeleteAsync(T entity);
    Task<T?> FindAsync(ISpecification<T> specification);
    Task<IList<T>> GetAllSpecificationAsync(ISpecification<T> specification);
    Task<PaginatedList<T>> GetAllSpecificationPaginationAsync(ISpecification<T> specification);
    Task DeleteRangeAsync(DbSet<T> entities);
}
