namespace StoreManagement.DTOs;

public record ProductResponseDTO
{
    public string? Id { get; init; }
    public string Name { get; init; } = "";
    public string? Description { get; init; }
    public int Quantity { get; init; }
    public decimal Price { get; init; }
    public DateTime CreatedAt { get; init; }
}

public record ProductResponseV2DTO : ProductResponseDTO
{
    public string? ImageUrl { get; init; }
}


public record ProductShortFormResponseDTO
{
    public string? Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string? Description { get; init; }
    public int Quantity { get; init; }
}
