namespace StoreManagement.DTOs;

public record UserResponseDTO
{
    public string? Id { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string Email { get; set; } = default!;
    public ActiveShoppingCartResponseDTO[]? ShoppingCarts { get; set; }
}
