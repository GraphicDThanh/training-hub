# Store Management Naming Convention

### Variable names
- Variable from type `StoreManagementDbContext` should be `dbContext` or `_dbContext` if use private.

### Testing
- Unit test naming format: `SUT_Should_ReturnXX_WhenYY`

Example: test `ProductService`
- `Delete_Should_ReturnFail_WhenProductNotExists`


```csharp
[Fact]
public async void SUT_Shoul_ReturnXX_WhenYY()
{
    // Arrange

    // Act

    // Assert
}
```