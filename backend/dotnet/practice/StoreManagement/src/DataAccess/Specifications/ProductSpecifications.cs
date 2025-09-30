using System.Linq.Expressions;

namespace StoreManagement.Specifications;

public class ProductsSpec : BaseSpecification<Product>
{
    public ProductsSpec() { }

    public ProductsSpec(
        // criteria here include chain of criteria .where().where()...
        Expression<Func<Product, bool>>? criteria,
        string? orderBy, int? page, int? pageSize
    ) : base(criteria)
    {
        // order by
        if (orderBy is not null)
        {
            ApplyOrderBy(orderBy switch
            {
                "name" => p => p.Name,
                _ => p => p.Id
            });
        }
        else
        {
            // default order by name
            ApplyOrderBy(p => p.Name);
        }

        // pagination
        if (page is not null && pageSize is not null && page > 0 && pageSize > 0)
        {
            ApplyPagination(page.Value, pageSize.Value);
        }
    }
}
