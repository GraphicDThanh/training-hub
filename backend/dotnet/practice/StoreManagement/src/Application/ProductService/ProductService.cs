using AutoMapper;
using StoreManagement.Utils;

namespace StoreManagement.Services;

public class ProductService(
    ILogger<IProductService> Logger,
    IMapper Mapper,
    IProductRepository ProductRepository,
    ICacheService CacheService
) : IProductService
{
    public async Task<Result> GetAllAsync(string? searchTerm, string? orderBy)
    {
        Logger.LogInformation(ProductLogTemplates.GetProducts, "Service", searchTerm, orderBy);

        string cacheKeyList = CacheKeys.Products;
        string cacheKeyListWithFilters = CacheKeys.ProductsWithFilters(searchTerm, orderBy);

        // cache hit
        var cacheValue = CacheService.Get(cacheKeyListWithFilters);
        if (cacheValue is not null)
        {
            // cache hit
            return Result.Success(cacheValue);
        }

        // cache miss
        try
        {
            // filter by searchTerm
            Expression<Func<Product, bool>>? where = null;
            if (searchTerm is not null)
            {
                // - name contains searchTerm
                where = product => product.Name.Contains(searchTerm);
                // - description contains searchTerm
                where = ExpressionUtils.Or(
                    where, product => (product.Description ?? "").Contains(searchTerm)
                );
            }

            // create specification
            var spec = new ProductsSpec(where, orderBy, null, null);

            // get results
            var results = await ProductRepository.GetAllSpecificationAsync(spec);

            // set cache
            // need to transform IQueryable<> to List<> then cache it
            CacheService.SetAndSyncKeyToList(cacheKeyListWithFilters, results, cacheKeyList);

            return Result.Success(results);
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

        string cacheKeyList = CacheKeys.Products;
        string cacheKeyListWithFiltersAndPagination = CacheKeys.ProductsWithFiltersAndPagination(searchTerm, orderBy, page, pageSize);

        // cache hit
        var cacheValue = CacheService.Get(cacheKeyListWithFiltersAndPagination);
        if (cacheValue is not null)
        {
            // cache hit
            return Result.Success(cacheValue);
        }

        // cache miss
        try
        {
            // filter by searchTerm
            Expression<Func<Product, bool>>? where = null;
            if (searchTerm is not null)
            {
                // - name contains searchTerm
                where = product => product.Name.Contains(searchTerm);
                // - description contains searchTerm
                where = ExpressionUtils.Or(
                    where, product => (product.Description ?? "").Contains(searchTerm)
                );
            }

            // create specification
            var spec = new ProductsSpec(where, orderBy, page, pageSize);

            // get results
            var results = await ProductRepository.GetAllSpecificationPaginationAsync(spec);

            // set cache
            CacheService.SetAndSyncKeyToList(
                cacheKeyListWithFiltersAndPagination, results, cacheKeyList);

            return Result.Success(results);
        }
        catch (Exception e)
        {
            Logger.LogError(LogTemplates.InternalServer, e.Message);
            return Result.Failure(Error.InternalServerFail(e.Message));
        }
    }

    public async Task<Result> GetProductById(string id)
    {
        Logger.LogInformation(ProductLogTemplates.GetById, "Service", id);

        Product? product;

        string cacheKey = CacheKeys.ProductById(id);
        var cacheValue = CacheService.Get(cacheKey);
        if (cacheValue is not null)
        {
            // cache hit
            product = (Product)cacheValue;
        }
        else
        {
            // cache miss
            try
            {
                product = await ProductRepository.GetByIdAsync(id);

                // set cache
                CacheService.Set(cacheKey, product);
            }
            catch (Exception e)
            {
                Logger.LogError(LogTemplates.InternalServer, e.Message);
                return Result.Failure(Error.InternalServerFail(e.Message));
            }
        }

        if (product is null)
        {
            Logger.LogError(ProductLogTemplates.ProductNotFound, id);
            return Result.Failure(ProductError.ProductNotFound(id));
        }

        return Result.Success(product);
    }

    public async Task<Result> AddAsync(Product product)
    {
        Logger.LogInformation(ProductLogTemplates.CreateProduct, "Service", product);

        // todo: product exist
        try
        {
            var newProduct = await ProductRepository.AddAsync(product);

            // evict cache
            CacheService.RemoveList(CacheKeys.Products);

            return Result.Success(newProduct);
        }
        catch (Exception e)
        {
            Logger.LogError(LogTemplates.InternalServer, e.Message);
            return Result.Failure(Error.InternalServerFail(e.Message));
        }
    }

    public async Task<Result> Update(string id, UpdateProductDTO productData)
    {
        try
        {
            Product? product;

            // Check if product exists
            string cacheKey = CacheKeys.ProductById(id);
            var cacheValue = CacheService.Get(cacheKey);
            if (cacheValue is not null)
            {
                // cache hit
                product = (Product)cacheValue;
            }
            else
            {
                product = await ProductRepository.GetByIdAsync(id);
                CacheService.Set(cacheKey, product);
            }

            if (product is null)
            {
                Logger.LogError(ProductLogTemplates.ProductNotFound, id);
                return Result.Failure(ProductError.ProductNotFound(id));
            }

            // Update product
            var productUpdate = Mapper.Map(productData, product);
            await ProductRepository.UpdateAsync(productUpdate);

            // Update cache
            // product detail cache
            CacheService.Set(cacheKey, productUpdate);
            // evict product list cache
            CacheService.RemoveList(CacheKeys.Products);

            return Result.Success(productUpdate);
        }
        catch (Exception e)
        {
            Logger.LogError(LogTemplates.InternalServer, e.Message);
            return Result.Failure(Error.InternalServerFail(e.Message));
        }
    }

    public async Task<Result> Delete(string id)
    {
        Logger.LogWarning("Soft delete is not implemented yet");

        try
        {
            // Check if product exists
            var product = await ProductRepository.GetByIdAsync(id);
            if (product is null)
            {
                Logger.LogError(ProductLogTemplates.ProductNotFound, id);
                return Result.Failure(ProductError.ProductNotFound(id));
            }

            // Delete product
            await ProductRepository.DeleteAsync(product);

            // Evicted cache
            // product detail cache remove
            CacheService.Remove(CacheKeys.ProductById(id));
            // evict product list cache
            CacheService.RemoveList(CacheKeys.Products);

            return Result.Success();
        }
        catch (Exception e)
        {
            Logger.LogError(LogTemplates.InternalServer, e.Message);
            return Result.Failure(Error.InternalServerFail(e.Message));
        }
    }
}
