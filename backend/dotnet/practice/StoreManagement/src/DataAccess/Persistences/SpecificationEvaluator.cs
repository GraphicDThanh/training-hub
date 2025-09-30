using StoreManagement.Patterns;
using StoreManagement.Specifications;

namespace StoreManagement.Data;

public static class SpecificationEvaluator<TEntity> where TEntity : class
{
    public static IQueryable<TEntity> GetQuery(
        IQueryable<TEntity> inputQuery,
        ISpecification<TEntity> specification)
    {
        var query = inputQuery;
        var count = query.Count();

        if (specification.Criteria is not null)
        {
            query = query.Where(specification.Criteria);
        }

        if (specification.OrderBy is not null)
        {
            query = query.OrderBy(specification.OrderBy);
        }
        else if (specification.OrderByDescending is not null)
        {
            query = query.OrderByDescending(specification.OrderByDescending);
        }

        if (specification.GroupBy is not null)
        {
            query = query.GroupBy(specification.GroupBy).SelectMany(x => x);
        }

        return query;
    }

    public static PaginatedList<TEntity> PagedPagination(
        IQueryable<TEntity> inputQuery,
        ISpecification<TEntity> specification)
    {
        if (specification.Page is null || specification.PageSize is null)
        {
            throw new InvalidOperationException(
                "Paging is enabled but Page or PageSize is not specified"
            );
        }

        var query = inputQuery;
        var countTotal = query.Count();
        var skip = (int)((specification.Page - 1) * specification.PageSize);
        var take = (int)specification.PageSize;
        query = query.Skip(skip).Take(take);

        try
        {
            return new PaginatedList<TEntity>(
                query, countTotal, specification.Page, specification.PageSize);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException(
                "Error on pagination, please check the specification", ex
            );
        }
    }
}
