namespace StoreManagement.Patterns;

public class PaginatedList<T> : List<T>
{
    public int? CurrentPage { get; init; } = 1;
    public int TotalPages { get; init; }
    public int? PageSize { get; init; } = 10;
    public int TotalCount { get; init; }
    public bool HasPrevious => CurrentPage > 1;
    public bool HasNext => CurrentPage < TotalPages;

    public PaginatedList(IQueryable<T> items, int count, int? pageNumber, int? pageSize)
    {
        TotalCount = count;
        PageSize = pageSize;
        CurrentPage = pageNumber;
        TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        AddRange(items);
    }

    // // Use without specification pattern
    // public static async Task<PaginatedList<T>> ToPagedList(IQueryable<T> source, int pageNumber, int pageSize)
    // {
    //     var count = source.Count();
    //     var items = source.Skip((pageNumber - 1) * pageSize).Take(pageSize);

    //     return new PaginatedList<T>(items, count, pageNumber, pageSize);
    // }
}
