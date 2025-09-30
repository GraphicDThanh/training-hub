namespace StoreManagement.DTOs;




public record CartItemProductDTO
{
    public string? Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public decimal Price { get; init; }
    public int Quantity { get; init; }
}
