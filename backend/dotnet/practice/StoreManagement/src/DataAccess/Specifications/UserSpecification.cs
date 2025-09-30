using System.Linq.Expressions;

namespace StoreManagement.Specifications;

public class UsersSpec : BaseSpecification<User>
{

    public UsersSpec(
        // criteria here include chain of criteria .where().where()...
        Expression<Func<User, bool>>? criteria,
        string? orderBy, int? page, int? pageSize
    ) : base(criteria)
    {
        // order by
        if (orderBy is not null)
        {
            ApplyOrderBy(orderBy switch
            {
                "email" => p => p.Email!,
                "name" => p => p.Name!,
                _ => p => p.Id
            });
        }
        else
        {
            // default order by email
            ApplyOrderBy(p => p.Email!);
        }

        // pagination
        if (page is not null && pageSize is not null && page > 0 && pageSize > 0)
        {
            ApplyPagination(page.Value, pageSize.Value);
        }
    }
}
