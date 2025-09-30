using System.Linq.Expressions;

namespace StoreManagement.Specifications;

public interface ISpecification<T>
{
    Expression<Func<T, bool>>? Criteria { get; }
    IList<Expression<Func<T, object>>> Includes { get; }
    IList<string> IncludeStrings { get; }
    Expression<Func<T, object>>? OrderBy { get; }
    Expression<Func<T, object>>? OrderByDescending { get; }
    Expression<Func<T, object>>? GroupBy { get; }
    int? Page { get; }
    int? PageSize { get; }
    bool IsPagingEnabled { get; }
}
