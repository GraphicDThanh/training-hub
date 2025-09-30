using Common.Options;

namespace StoreManagement.Cache;

public class CacheService(IMemoryCache MemoryCache) : ICacheService
{
    public object? Get(string key)
    {
        if (MemoryCache.TryGetValue(key, out object? value))
            return value;

        return null;
    }
    public void Set(string key, object? value)
    {
        MemoryCache.Set(key, value, InMemoryCacheOptions.CacheEntryOptions);
    }

    public void SetAndSyncKeyToList(string key, object value, string keyList)
    {

        MemoryCache.Set(key, value, InMemoryCacheOptions.CacheEntryOptions);

        // This key save list of cache on product list
        // "Products": string[] { "Products_abc_xyz", "Products_abc_xyz_1_10"}
        // ref: https://stackoverflow.com/questions/43673833/how-to-iterate-through-memorycache-in-asp-net-core/43677373#43677373
        if (MemoryCache.TryGetValue(keyList, out List<string>? keyListValue))
        {
            // add new key to list
            keyListValue!.Add(key);
            MemoryCache.Set(keyList, keyListValue, InMemoryCacheOptions.CacheEntryOptions);
        }
        else
        {
            MemoryCache.Set(keyList, new List<string> { key }, InMemoryCacheOptions.CacheEntryOptions);
        }
    }
    public void RemoveList(string keyList)
    {
        // Get all key related to list (include search, sort, pagination)
        var listCacheKeys = MemoryCache.Get<List<string>>(keyList);

        // Be evicted cache in list
        if (listCacheKeys is not null)
        {
            foreach (var cacheKey in listCacheKeys)
                MemoryCache.Remove(cacheKey);
        }

        // Be evicted cache store all key related to product list
        MemoryCache.Remove(keyList);
    }

    public void Remove(string key)
    {
        MemoryCache.Remove(key);
    }
}
