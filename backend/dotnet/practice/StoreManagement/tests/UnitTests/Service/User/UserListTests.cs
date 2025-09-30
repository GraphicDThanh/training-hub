using NSubstitute.ReceivedExtensions;
using StoreManagement.Patterns;
using StoreManagement.Specifications;

namespace StoreManagement.UnitTests.Services;

public class UserListTests : BaseUserServiceTests
{
    [Fact]
    public async Task GetAllAsync_ShouldReturnSuccess()
    {
        // Arrange
        var users = _fixture.CreateMany<User>(3).ToList();
        MockGetAllSpecificationAsync(users);

        // Act
        var result = await _service.GetAllAsync(null, null);

        // Assert
        // - call repository
        await _repositoryMock.Received(1).GetAllSpecificationAsync(Arg.Any<UsersSpec>());
        // - result
        result.IsSuccess.Should().BeTrue();
    }

    [Fact]
    public async Task GetAllAsync_Should_ReturnSuccess_WhenFilterBySearchTerm()
    {
        // Arrange
        var users = _fixture.CreateMany<User>(3).ToList();
        MockGetAllSpecificationAsync(users);

        // Act
        var result = await _service.GetAllAsync("searchTerm", null);

        // Assert
        // - call repository
        await _repositoryMock.Received(1).GetAllSpecificationAsync(Arg.Any<UsersSpec>());
        // - result
        result.IsSuccess.Should().BeTrue();
    }

    [Fact]
    public async Task GetAllAsync_Should_ReturnSuccess_WhenOrder()
    {
        // Arrange
        var users = _fixture.CreateMany<User>(3).ToList();
        MockGetAllSpecificationAsync(users);

        // Act
        var result = await _service.GetAllAsync("searchTerm", "Email");

        // Assert
        // - result
        result.IsSuccess.Should().BeTrue();
    }
}


public class UserListPaginationTests : BaseUserServiceTests
{
    [Fact]
    public async Task GetAllAsyncPagination_ShouldReturnSuccess()
    {
        // Arrange
        var users = _fixture.CreateMany<User>(3).ToList();
        var paginateUsers = new PaginatedList<User>(users.AsQueryable(), 3, 1, 2);
        MockGetAllSpecificationPaginationAsync(paginateUsers);

        // Act
        var result = await _service.GetAllWithPagingAsync(null, null, 1, 2);

        // Assert
        // - call repository
        // not working
        await _repositoryMock.Received(1).GetAllSpecificationPaginationAsync(Arg.Any<UsersSpec>());
        // - result
        result.IsSuccess.Should().BeTrue();
    }
}
