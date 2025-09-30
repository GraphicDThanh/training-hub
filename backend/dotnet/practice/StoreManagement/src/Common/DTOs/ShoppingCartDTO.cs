using StoreManagement.Enums;

namespace StoreManagement.DTOs;

public record ShoppingCartDTO
{
    public string? Id { get; init; }
    public string? UserId { get; init; }
    public ShoppingCartStatus Status { get; init; }
    public CartItemDTO[]? CartItems { get; set; }
    public DateTime CreatedAt { get; init; }

}

