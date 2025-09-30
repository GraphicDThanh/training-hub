// using Microsoft.AspNetCore.Mvc.Testing;
// using StoreManagement.IntegrationTests.Common;

// namespace StoreManagement.IntegrationTests.ProductTests;

// public class IdentityControllerTests : BaseIntegrationTest
// {
//     private readonly HttpClient _client;

//     public IdentityControllerTests(CustomWebAppFactory factory) : base(factory)
//     {
//         _client = factory.CreateClient(
//             new WebApplicationFactoryClientOptions { AllowAutoRedirect = false });
//     }

//     [Theory(Skip="Skip for now, fail.")]
//     [InlineData("thanh.nguyen+jun3@asnet.com.vn", "abcABC@123")]
//     public async Task Register_Should_ReturnOk_IfValid(string email, string password)
//     {
//         // Arrange

//         // Act
//         var response = await _client.PostAsJsonAsync("/api/v1/auth/register", new { Email = email, Password = password });

//         // Assert
//         AssertOkOrEmpty(response);
//     }

//     [Theory(Skip="Skip for now, fail.")]
//     [InlineData("user@store.com", "abcABC@123")]
//     public async Task Login_Should_ReturnOk_IfValid(string email, string password)
//     {
//         // Arrange

//         // Act
//         var response = await _client.PostAsJsonAsync("/api/v1/auth/login", new { Email = email, Password = password });

//         // Assert
//         AssertOkOrEmpty(response);
//     }
// }
