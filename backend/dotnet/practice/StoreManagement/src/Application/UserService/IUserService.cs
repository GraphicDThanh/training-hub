namespace StoreManagement.Services;

public interface IUserService
{
    Task<Result> AddAsync(User newUser, string password);
    Task<Result> SetRoleAsync(User user, string roleName);
    Task<Result> SetRoleWithEmailAsync(SetRoleUserDTO setRoleUserDTO);
    Task<Result> GetAllAsync(string? searchTerm, string? orderBy);
    Task<Result> GetAllWithPagingAsync(string? searchTerm, string? orderBy, int page, int pageSize);
    Task<Result> GetByEmailAsync(string email);

    // Identity user id type string
    Task<Result> GetByIdAsync(string id);

}
