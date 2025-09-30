using Common.Options;
using StoreManagement.Cache;

namespace StoreManagement.Extensions;

public static class CacheExtensions
{
    public static IServiceCollection AddCache(this IServiceCollection services)
    {
        services.AddMemoryCache(options =>
        {
            options.SizeLimit = InMemoryCacheOptions.SizeLimit;
            options.CompactionPercentage = InMemoryCacheOptions.CompactionPercentage;
            options.ExpirationScanFrequency = InMemoryCacheOptions.ExpirationScanFrequencyInDays;
        });

        services.AddSingleton<ICacheService, CacheService>();

        return services;
    }
}
