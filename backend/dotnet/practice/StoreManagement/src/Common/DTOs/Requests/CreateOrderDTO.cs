namespace StoreManagement.DTOs;

public record CreateOrderDTO
{
    public string UserId { get; init; }
    public string ShoppingCartId { get; init; }
    public IList<CreateOrderItemDTO>? OrderItems { get; init; }
    public decimal TotalPay { get; init; }
}

