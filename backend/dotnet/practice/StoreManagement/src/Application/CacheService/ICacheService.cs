namespace StoreManagement.Cache;

public interface ICacheService
{
    object? Get(string key);
    void Set(string key, object? value);
    void SetAndSyncKeyToList(string key, object value, string keyList);
    void Remove(string key);
    void RemoveList(string keyList);
}
