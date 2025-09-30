using StoreManagement.Exceptions;

namespace StoreManagement.Repositories;

public class UserRepository(
    StoreManagementDbContext dbContext,
    UserManager<User> UserManager) :
    GenericRepository<User>(dbContext), IUserRepository
{
    public async Task<IdentityResult> AddAsync(User newUser, string password)
    {
        var identityResult = await UserManager.CreateAsync(newUser, password);
        if (!identityResult.Succeeded)
        {
            var firstError = identityResult.Errors.First();
            throw new IdentityException(firstError.Code, firstError.Description);
        }

        return identityResult;
    }

    public async Task<IdentityResult> SetRoleAsync(User user, string roleName)
    {
        var identityResult = await UserManager.AddToRoleAsync(user, roleName);
        if (!identityResult.Succeeded)
        {
            var firstError = identityResult.Errors.First();
            throw new IdentityException(firstError.Code, firstError.Description);
        }

        return identityResult;
    }

    public async Task<User?> GetByEmailAsync(string email)
    {

        try
        {
            return await UserManager.FindByEmailAsync(email);
        }
        catch (Exception e)
        {
            throw new IdentityException("IdentityErrors", e.Message);
        }
    }

    new public async Task<User?> GetByIdAsync(string id)
    {
        try
        {
            var user = await UserManager.FindByIdAsync(id);

            if (user is null)
                return null;

            // Explicitly load the current active shopping cart navigation property.
            await _dbContext.Entry(user).Collection(
                u => u.ShoppingCarts!
            ).Query().Where(s => s.Status == ShoppingCartStatus.CREATED).LoadAsync();

            return user;

        }
        catch (Exception e)
        {
            throw new IdentityException("IdentityErrors", e.Message);
        }
    }

}
