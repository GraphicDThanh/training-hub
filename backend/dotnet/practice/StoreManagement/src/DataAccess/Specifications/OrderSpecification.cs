using System.Linq.Expressions;

namespace StoreManagement.Specifications;

public class OrdersSpec : BaseSpecification<Order>
{

    public OrdersSpec(
        // criteria here include chain of criteria .where().where()...
        Expression<Func<Order, bool>>? criteria,
        string? orderBy, int? page, int? pageSize
    ) : base(criteria)
    {

        if (orderBy is not null)
        {
            ApplyOrderBy(orderBy switch
            {
                "createdAt" => p => p.CreatedAt,
                _ => p => p.Id
            });
        }
        else
        {
            // default order by email
            ApplyOrderBy(p => p.CreatedAt);
        }

        // pagination
        if (page is not null && pageSize is not null && page > 0 && pageSize > 0)
        {
            ApplyPagination(page.Value, pageSize.Value);
        }
    }
}
