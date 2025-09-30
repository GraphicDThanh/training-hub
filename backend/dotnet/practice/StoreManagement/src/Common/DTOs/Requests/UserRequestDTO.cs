using StoreManagement.Entities;

namespace StoreManagement.DTOs;

public record UserRequestDTO
{
    public User User { get; init; }
    public bool IsAdmin { get; init; }
}

