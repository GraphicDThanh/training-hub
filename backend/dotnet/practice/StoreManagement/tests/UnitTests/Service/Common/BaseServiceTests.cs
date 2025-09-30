using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Logging;
using StoreManagement.Cache;

namespace StoreManagement.UnitTests.Services;

public abstract class BaseServiceTests<TEntity, TService, TRepository>
    where TEntity : class
    where TService : class
    where TRepository : class
{
    internal readonly ILogger<TService> _loggerMock;
    internal readonly IMapper _mapperMock;
    internal readonly ICacheService _cacheServiceMock;
    internal readonly ClaimsPrincipal _claimsPrincipalMock;
    internal readonly IEmailSender _emailSenderMock;
    internal readonly Fixture _fixture = new();
    internal TRepository _repositoryMock;

    internal BaseServiceTests()
    {
        _repositoryMock = Substitute.For<TRepository>();
        _loggerMock = Substitute.For<ILogger<TService>>();
        _mapperMock = Substitute.For<IMapper>();
        _claimsPrincipalMock = Substitute.For<ClaimsPrincipal>();
        _cacheServiceMock = Substitute.For<ICacheService>();
        _emailSenderMock = Substitute.For<IEmailSender>();
    }

    internal void MockClaimsPrincipalFindFirst(string? value)
    {
        Claim mockClaim = value is null ? (Claim?)null! : new(ClaimTypes.NameIdentifier, value);

        _claimsPrincipalMock.FindFirst(ClaimTypes.NameIdentifier).Returns(mockClaim);
    }

    internal void MockClaimsPrincipalIsInRole(string roleName, bool result)
    {
        _claimsPrincipalMock.IsInRole(roleName).Returns(result);
    }


    internal void MockCacheGet(string key, object value)
    {
        _cacheServiceMock.Get(key).Returns(value);
    }

    internal void MockCacheRemove(string key, object value)
    {
        _cacheServiceMock.Get(key).Returns(value);
    }

    internal void MockCacheRemoveList(string key)
    {
        _cacheServiceMock.RemoveList(key);
    }
}
