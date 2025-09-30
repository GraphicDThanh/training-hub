namespace StoreManagement.DTOs;

public record CreateCartItemDTO
{
    public string? ProductId { get; init; }
    public int Quantity { get; set; }
}

