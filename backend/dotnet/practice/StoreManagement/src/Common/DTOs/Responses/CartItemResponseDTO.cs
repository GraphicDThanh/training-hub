namespace StoreManagement.DTOs;

public record CartItemResponseDTO
{
    public string? Id { get; init; }
    public CartItemProductDTO Product { get; init; } = new();
    public int Quantity { get; init; }
}

