namespace StoreManagement.DTOs;

public record SetRoleUserDTO
{
    public string Email { get; set; } = default!;

    public string RoleName { get; set; } = default!;
}
