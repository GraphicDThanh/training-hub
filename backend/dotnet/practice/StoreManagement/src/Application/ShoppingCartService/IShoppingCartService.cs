namespace StoreManagement.Services;

public interface IShoppingCartService
{
    Task<Result> GetShoppingCartById(string cartId, ClaimsPrincipal claimsPrincipal);
    Task<Result> Create(string? userId, ClaimsPrincipal claimsPrincipal);
    Task<Result> Update(string cartId, UpdateShoppingCartDTO shoppingCartData, ClaimsPrincipal claimsPrincipal);
    Task<Result> Order(string cartId, ClaimsPrincipal claimsPrincipal);
}
