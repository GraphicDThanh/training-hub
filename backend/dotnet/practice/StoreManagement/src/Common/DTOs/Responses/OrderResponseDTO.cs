using StoreManagement.Enums;

namespace StoreManagement.DTOs;

public record OrderDetailResponseDTO
{
    public string? Id { get; init; }
    public OrderStatus Status { get; init; }
    public ICollection<OrderItemResponseDTO>? OrderItems { get; init; }
    public string? UserId { get; init; }
    public string? ShoppingCartId { get; init; }
    public decimal TotalPay { get; init; }
}

public record OrderInListResponseDTO
{
    public string? Id { get; init; }
    public OrderStatus Status { get; init; }
    public string? UserId { get; init; }
    public string? ShoppingCartId { get; init; }
}



