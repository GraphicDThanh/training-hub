namespace StoreManagement.Repositories;

public interface IUserRepository : IGenericRepository<User>
{
    Task<IdentityResult> AddAsync(User newUser, string password);
    Task<IdentityResult> SetRoleAsync(User user, string roleName);
    Task<User?> GetByEmailAsync(string email);

    // Identity user id type string
    new Task<User?> GetByIdAsync(string id);
}
