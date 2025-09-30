using StoreManagement.Enums;

namespace StoreManagement.DTOs;

public record ActiveShoppingCartResponseDTO
{
    public string? Id { get; init; }
    public ShoppingCartStatus Status { get; init; }

}

