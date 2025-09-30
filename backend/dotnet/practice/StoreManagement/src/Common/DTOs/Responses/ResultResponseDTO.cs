using Microsoft.AspNetCore.Http;

namespace StoreManagement.DTOs;

public record ResultSuccessDTO
{
    public bool Success { get; init; } = true;
    public string Title { get; init; } = default!;
    public int Status { get; init; } = StatusCodes.Status200OK;
    public object? Data { get; init; } = new { };
}

public record ResultFailureDTO
{
    public bool Success { get; init; }
    public string? Type { get; init; } = default!;
    public string? Title { get; init; } = default!;
    public int Status { get; init; }
    public string? ErrorCode { get; init; } = default!;
    public string? Description { get; init; } = default!;
    public Dictionary<string, string[]>? Errors { get; init; }

}
