using StoreManagement.Patterns;
using StoreManagement.Specifications;

namespace StoreManagement.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    internal readonly StoreManagementDbContext _dbContext;

    // Allow derived repository class to access DbSet
    protected DbSet<T> DbSet { get; set; }

    protected IQueryable<T> Query { get; set; }

    public GenericRepository(StoreManagementDbContext dbContext)
    {
        _dbContext = dbContext;
        DbSet = dbContext.Set<T>();
        Query = DbSet.AsQueryable();
    }

    public virtual async Task<IList<T>> GetAllAsync()
    {
        return await DbSet.ToListAsync();
    }

    public virtual async Task<T?> GetByIdAsync(string id)
    {
        return await DbSet.FindAsync(id);
    }

    public virtual async Task<T> AddAsync(T entity)
    {
        await DbSet.AddAsync(entity);
        await _dbContext.SaveChangesAsync();
        return entity;
    }

    public async Task<T> UpdateAsync(T entity)
    {
        DbSet.Attach(entity);
        _dbContext.Entry(entity).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return entity;
    }

    public async Task DeleteAsync(T entity)
    {
        // TODO: check execute method instead of get entity then remove
        DbSet.Remove(entity);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<T?> FindAsync(ISpecification<T> specification)
    {
        return await ApplySpecificationToList(specification).FirstOrDefaultAsync();
    }

    public async Task DeleteRangeAsync(DbSet<T> entities)
    {
        DbSet.RemoveRange(entities);
        await _dbContext.SaveChangesAsync();
    }


    public async Task<IList<T>> GetAllSpecificationAsync(ISpecification<T> specification)
    {
        return ApplySpecificationToList(specification).ToList();
    }

    public async Task<PaginatedList<T>> GetAllSpecificationPaginationAsync(ISpecification<T> specification)
    {
        return ApplySpecificationToListPagination(specification);
    }

    private IQueryable<T> ApplySpecificationToList(ISpecification<T> specification)
    {
        return SpecificationEvaluator<T>.GetQuery(Query, specification);
    }
    private PaginatedList<T> ApplySpecificationToListPagination(ISpecification<T> specification)
    {
        var query = SpecificationEvaluator<T>.GetQuery(Query, specification);
        return SpecificationEvaluator<T>.PagedPagination(query, specification);
    }



}
