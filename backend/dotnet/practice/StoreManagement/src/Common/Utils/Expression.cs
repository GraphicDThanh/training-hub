using System.Linq.Expressions;

namespace StoreManagement.Utils;

public class Replacer : ExpressionVisitor
{
    private readonly Dictionary<Expression, Expression> _replacements;

    public Replacer(IEnumerable<Expression> before, IEnumerable<Expression> after)
    {
        _replacements = new Dictionary<Expression, Expression>(before.Zip(after, (a, b) => KeyValuePair.Create(a, b)));
    }

    public override Expression Visit(Expression? node)
    {
        if (node != null && _replacements.TryGetValue(node, out var replace))
            return base.Visit(replace);
        return base.Visit(node!);
    }
}

public static class ExpressionUtils
{
    public static Expression<Func<T, bool>> Or<T>(this Expression<Func<T, bool>> expr1, Expression<Func<T, bool>> expr2)
    {
        if (expr1 == null)
            return expr2;
        if (expr2 == null)
            return expr1;
        return Expression.Lambda<Func<T, bool>>(
            Expression.OrElse(
                expr1.Body,
                new Replacer(expr2.Parameters, expr1.Parameters).Visit(expr2.Body)
            ),
            expr1.Parameters);
    }

    public static Expression<Func<T, bool>> And<T>(this Expression<Func<T, bool>> expr1, Expression<Func<T, bool>> expr2)
    {
        if (expr1 == null)
            return expr2;
        if (expr2 == null)
            return expr1;
        return Expression.Lambda<Func<T, bool>>(
            Expression.AndAlso(
                expr1.Body,
                new Replacer(expr2.Parameters, expr1.Parameters).Visit(expr2.Body)
            ),
            expr1.Parameters);
    }
}

// ref: https://stackoverflow.com/a/63663926
