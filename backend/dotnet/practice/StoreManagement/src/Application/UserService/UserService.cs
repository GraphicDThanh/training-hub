using StoreManagement.Utils;
using StoreManagement.Exceptions;

namespace StoreManagement.Services;

public class UserService(
    ILogger<IUserService> Logger,
    IUserRepository UserRepository,
    IRoleRepository RoleRepository,
    ICacheService CacheService
) : IUserService
{
    public async Task<Result> AddAsync(User newUser, string password)
    {
        try
        {
            var identityResult = await UserRepository.AddAsync(newUser, password);

            // evict cache
            CacheService.RemoveList(CacheKeys.Users);

            return Result.Success();
        }
        catch (IdentityException e)
        {
            Logger.LogError(LogTemplates.IdentityInternalServer, e.Message);
            return Result.Failure(Error.InternalServerFail(e.Message));
        }
        catch (Exception e)
        {
            Logger.LogError(LogTemplates.InternalServer, e.Message);
            return Result.Failure(Error.InternalServerFail(e.Message));
        }
    }

    public async Task<Result> SetRoleWithEmailAsync(SetRoleUserDTO setRoleUserDTO)
    {
        // Validate: user exist
        var result = await GetByEmailAsync(setRoleUserDTO.Email);
        if (result.IsFailure)
            return result;

        if (result.Value is null)
        {
            Logger.LogInformation(UserLogTemplates.UserWithEmailNotFound, setRoleUserDTO.Email);
            return Result.Failure(UserError.GetByEmailAsyncNotFound);
        }

        var user = (User)result.Value;
        var setRoleResult = await SetRoleAsync(user, setRoleUserDTO.RoleName);
        if (setRoleResult.IsFailure)
            return setRoleResult;

        // evict cache
        // cache user detail
        CacheService.Remove(CacheKeys.UserById(user.Id));
        // cache user list
        CacheService.RemoveList(CacheKeys.Users);

        return Result.Success();
    }

    public async Task<Result> SetRoleAsync(User user, string roleName)
    {
        try
        {
            if (roleName != UserRole.Admin && roleName != UserRole.User)
            {
                Logger.LogError(RoleLogTemplates.RoleNotSupport, roleName);
                return Result.Failure(RoleError.RoleNotSupport);
            }

            var role = await RoleRepository.FindByNameAsync(roleName);
            if (role is null)
            {
                Logger.LogError(RoleLogTemplates.RoleNotFound, roleName);
                return Result.Failure(RoleError.RoleNotFound);
            }

            await UserRepository.SetRoleAsync(user, roleName);

            // evict cache
            // cache user detail
            CacheService.Remove(CacheKeys.UserById(user.Id));
            // cache user list
            CacheService.RemoveList(CacheKeys.Users);

            return Result.Success();
        }
        catch (NotFoundException)
        {
            Logger.LogError(UserLogTemplates.RoleNotFound, roleName);
            return Result.Failure(RoleError.RoleNotFound);
        }
        catch (IdentityException e)
        {
            Logger.LogError(LogTemplates.IdentityInternalServer, e.Message);
            return Result.Failure(Error.InternalServerFail(e.Message));
        }
        catch (Exception e)
        {
            Logger.LogError(LogTemplates.InternalServer, e.Message);
            return Result.Failure(Error.InternalServerFail(e.Message));
        }
    }

    public async Task<Result> GetByEmailAsync(string email)
    {
        string cacheByEmailKey = CacheKeys.UserByEmail(email);
        var cacheValue = CacheService.Get(cacheByEmailKey);
        if (cacheValue is not null)
        {
            return Result.Success(cacheValue);
        }

        try
        {
            var user = await UserRepository.GetByEmailAsync(email);

            // set cache
            CacheService.Set(cacheByEmailKey, user);
            if (user is not null)
            {
                CacheService.Set(CacheKeys.UserById(user!.Id), user);
            }

            return Result.Success(user);
        }
        catch (Exception e)
        {
            Logger.LogError(LogTemplates.InternalServer, e.Message);
            return Result.Failure(Error.InternalServerFail(e.Message));
        }
    }

    public async Task<Result> GetByIdAsync(string id)
    {
        string cacheKey = CacheKeys.UserById(id);
        var cacheValue = CacheService.Get(cacheKey);
        if (cacheValue is not null)
            return Result.Success(cacheValue);

        try
        {
            var user = await UserRepository.GetByIdAsync(id);

            // set cache
            CacheService.Set(cacheKey, user);

            if (user is null)
            {
                Logger.LogInformation(UserLogTemplates.UserWithIdNotFound, id);
                return Result.Failure(UserError.UserByIdNotFound(id));
            }

            return Result.Success(user);
        }
        catch (Exception e)
        {
            Logger.LogError(LogTemplates.InternalServer, e.Message);
            return Result.Failure(Error.InternalServerFail(e.Message));
        }
    }

    public async Task<Result> GetAllWithPagingAsync(
       string? searchTerm, string? orderBy,
       int page, int pageSize)
    {
        Logger.LogInformation(
            ProductLogTemplates.GetProductsPagination,
            "Service", searchTerm, orderBy, page, pageSize);

        try
        {
            // filter by searchTerm
            Expression<Func<User, bool>>? where = null;
            if (searchTerm is not null)
            {
                // - email contains searchTerm
                where = user => (user.Email ?? "").Contains(searchTerm);
                // - name contains searchTerm
                where = ExpressionUtils.Or(
                    where, user => (user.Name ?? "").Contains(searchTerm)
                );
            }

            // create specification
            var spec = new UsersSpec(where, orderBy!, page, pageSize);

            // get results
            var results = await UserRepository.GetAllSpecificationPaginationAsync(spec);
            return Result.Success(results);
        }
        catch (Exception e)
        {
            Logger.LogError(LogTemplates.InternalServer, e.Message);
            return Result.Failure(Error.InternalServerFail(e.Message));
        }

        // Known Issue:
        // When new user registered, the cache is not updated yet
        // Because register flow go by identity service
    }

    public async Task<Result> GetAllAsync(string? searchTerm, string? orderBy)
    {
        Logger.LogInformation(ProductLogTemplates.GetProducts, "Service", searchTerm, orderBy);

        try
        {
            // filter by searchTerm
            Expression<Func<User, bool>>? where = null;
            if (searchTerm is not null)
            {
                // - email contains searchTerm
                where = user => (user.Email ?? "").Contains(searchTerm);
                // - name contains searchTerm
                where = ExpressionUtils.Or(
                    where, user => (user.Name ?? "").Contains(searchTerm)
                );
            }

            // create specification
            var spec = new UsersSpec(where, orderBy, null, null);

            // get results
            var results = await UserRepository.GetAllSpecificationAsync(spec);

            return Result.Success(results);
        }
        catch (Exception e)
        {
            Logger.LogError(LogTemplates.InternalServer, e.Message);
            return Result.Failure(Error.InternalServerFail(e.Message));
        }

        // Known Issue: When new user registered, the cache is not updated yet
        // Because register flow go by identity service
    }
}
