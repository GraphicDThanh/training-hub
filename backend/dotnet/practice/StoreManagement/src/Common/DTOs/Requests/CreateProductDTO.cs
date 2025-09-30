namespace StoreManagement.DTOs;

public record CreateProductDTO
{
    public string Name { get; init; } = default!;
    public string? Description { get; init; }
    public int Quantity { get; init; }
    public decimal Price { get; init; }
    public string? ImageUrl { get; init; }
}

