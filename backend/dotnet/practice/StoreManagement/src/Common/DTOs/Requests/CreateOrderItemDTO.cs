namespace StoreManagement.DTOs;

public record CreateOrderItemDTO
{
    public string? ProductId { get; init; }
    public int Quantity { get; init; }
    public decimal Price { get; init; }
}

