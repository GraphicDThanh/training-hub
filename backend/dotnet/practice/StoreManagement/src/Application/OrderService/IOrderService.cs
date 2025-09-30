namespace StoreManagement.Services;

public interface IOrderService
{
    Task<Result> CreateOrder(CreateOrderDTO CreateOrderDTO);
    Task<Result> GetAllAsync(string? userId, string? searchTerm, string? orderBy, ClaimsPrincipal claimsPrincipal);
    Task<Result> GetAllWithPagingAsync(string? userId, string? searchTerm, string? orderBy, int page, int pageSize, ClaimsPrincipal claimsPrincipal);
    Task<Result> GetOrderByIdAsync(string orderId, ClaimsPrincipal claimsPrincipal);
}
