namespace StoreManagement.DTOs;

public record UpdateShoppingCartDTO
{
    public CreateCartItemDTO[]? CartItems { get; set; }
}

