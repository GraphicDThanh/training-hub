using Microsoft.Extensions.Caching.Memory;

namespace Common.Options;

public sealed class InMemoryCacheOptions
{
    public static int SizeLimit { get; } = 1024;
    public static int Size { get; } = 1;
    public static double SlidingExpirationInMinutes { get; } = 15;
    public static double CompactionPercentage { get; } = 0.25;
    public static TimeSpan ExpirationScanFrequencyInDays { get; } = TimeSpan.FromDays(1);

    public static MemoryCacheEntryOptions? CacheEntryOptions { get; } =
        new MemoryCacheEntryOptions()
            .SetSize(Size)
            .SetSlidingExpiration(TimeSpan.FromMinutes(SlidingExpirationInMinutes));

}
