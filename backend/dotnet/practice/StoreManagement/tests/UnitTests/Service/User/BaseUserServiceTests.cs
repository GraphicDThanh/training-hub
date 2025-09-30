using Microsoft.AspNetCore.Identity;
using StoreManagement.Exceptions;
using StoreManagement.Patterns;
using StoreManagement.Repositories;
using StoreManagement.Services;
using StoreManagement.Specifications;

namespace StoreManagement.UnitTests.Services;

public abstract class BaseUserServiceTests
    : BaseServiceTests<User, IUserService, IUserRepository>
{
    internal IUserService _service;
    internal IRoleRepository _roleRepositoryMock;

    internal BaseUserServiceTests()
    {
        _repositoryMock = Substitute.For<IUserRepository>();
        _roleRepositoryMock = Substitute.For<IRoleRepository>();
        _service = new UserService(_loggerMock, _repositoryMock, _roleRepositoryMock, _cacheServiceMock);
    }

    internal void MockGetById(User user, object value)
    {
        _repositoryMock.GetByIdAsync(user.Id).Returns((User)value);
    }

    internal void MockGetByIdAsyncThrowError(string userId)
    {
        _repositoryMock
            .When(x => x.GetByIdAsync(userId))
            .Do(x => throw new InvalidOperationException(ErrorMessage.InternalError));
    }

    internal void MockGetByEmail(string email, object value)
    {
        _repositoryMock.GetByEmailAsync(email).Returns((User)value);
    }

    internal void MockGetByEmailAsyncThrowError(string email)
    {
        _repositoryMock
            .When(x => x.GetByEmailAsync(email))
            .Do(x => throw new InvalidOperationException(ErrorMessage.InternalError));
    }

    internal void MockGetAllSpecificationAsync(IList<User> users)
    {
        _repositoryMock.GetAllSpecificationAsync(Arg.Any<UsersSpec>()).Returns(users);
    }

    internal void MockGetAllSpecificationPaginationAsync(PaginatedList<User> users)
    {
        _repositoryMock.GetAllSpecificationPaginationAsync(Arg.Any<UsersSpec>()).Returns(users);
    }

    internal void MockAddAsync(User user, string password)
    {
        _repositoryMock.AddAsync(user, password).Returns(new IdentityResult());
    }

    internal void MockAddAsyncThrowErrorInternalServer(User user, string password)
    {
        _repositoryMock
            .When(x => x.AddAsync(user, password))
            .Do(x => throw new InvalidOperationException(ErrorMessage.InternalError));
    }

    internal void MockAddAsyncThrowErrorIdentityError(User user, string password)
    {
        _repositoryMock
            .When(x => x.AddAsync(user, password))
            .Do(x => throw new IdentityException(
                ErrorCode.InternalError, ErrorMessage.InternalError));
    }

    internal void MockFindRoleByNameAsync(string roleName)
    {
        _roleRepositoryMock.FindByNameAsync(roleName).Returns(new IdentityRole(roleName));
    }

    internal void MockFindRoleByNameAsyncReturnNull(string roleName)
    {
        _roleRepositoryMock.FindByNameAsync(roleName).Returns((IdentityRole)null!);
    }

    internal void MockFindRoleByNameAsyncThrowError(string roleName)
    {
        _roleRepositoryMock
            .When(x => x.FindByNameAsync(roleName))
            .Do(x =>  throw new InvalidOperationException(ErrorMessage.InternalError));
    }

    internal void MockSetRoleAsyncThrowError(User user, string roleName)
    {
        _repositoryMock
            .When(x => x.SetRoleAsync(user, roleName))
            .Do(x =>  throw new InvalidOperationException(ErrorMessage.InternalError));
    }
}
