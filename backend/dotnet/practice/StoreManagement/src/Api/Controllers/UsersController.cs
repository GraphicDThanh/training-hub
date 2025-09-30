
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using StoreManagement.Entities;
using StoreManagement.DTOs;
using StoreManagement.Extensions;
using StoreManagement.Constants;
using StoreManagement.Enums;
using StoreManagement.Services;
using StoreManagement.Patterns;
using StoreManagement.Errors;
using Asp.Versioning;
using System.Security.Claims;

namespace StoreManagement.Controllers;

[
    ApiController,
    ApiVersion("1.0"),
    Route("api/v{version:apiVersion}/users")
// back compatibility
// Route("api/users")
]
public class UsersController(
    IMapper mapper,
    IUserService userService,
    ILogger<UsersController> logger
) : ControllerBase
{
    [HttpGet]
    [Authorize(Roles = UserRole.Admin)]
    public async Task<IActionResult> GetAllAsync(
        [FromQuery] string? searchTerm,
        [FromQuery] string? orderBy,
        [FromQuery] int page,
        [FromQuery] int pageSize
    )
    {
        logger.LogInformation(UserLogTemplates.GetUsersPagination, "Controller", searchTerm, orderBy, page, pageSize);

        // Get All with Pagination
        if (page > 0 & pageSize > 0)
        {
            var resultPaginated = await userService.GetAllWithPagingAsync(
                searchTerm, orderBy, page, pageSize);

            if (resultPaginated.IsFailure)
                return resultPaginated.ToProblemDetails();

            var resultPagination = (PaginatedList<User>)resultPaginated.Value!;
            var results = mapper.Map<List<UserResponseDTO>>(resultPagination);
            var metadata = new
            {
                resultPagination.TotalCount,
                resultPagination.PageSize,
                resultPagination.CurrentPage,
                resultPagination.TotalPages,
                resultPagination.HasNext,
                resultPagination.HasPrevious,
                results
            };

            return Ok(
                new ResultSuccessDTO
                {
                    Title = Messages.GetAllWithPagingAsyncSuccess,
                    Data = metadata
                }
            );
        }

        // Get All
        var result = await userService.GetAllAsync(searchTerm, orderBy);

        if (result.IsFailure)
            return result.ToProblemDetails();

        var users = mapper.Map<List<UserResponseDTO>>(result.Value!);
        return Ok(
            new ResultSuccessDTO
            {
                Title = Messages.GetAllAsyncSuccess,
                Data = users
            }
        );
    }

    [
        HttpGet("{id}"),
        Authorize,
        ProducesResponseType(StatusCodes.Status200OK),
        ProducesResponseType(StatusCodes.Status400BadRequest),
        ProducesResponseType(StatusCodes.Status403Forbidden)
    ]
    public async Task<IActionResult> GetById(string id)
    {
        logger.LogInformation(UserLogTemplates.GetByIdAsync, "Controller", id);

        // Prevent user access to other user profile
        var isUserRequestingOwnProfile = User.FindFirst(ClaimTypes.NameIdentifier)?.Value == id;
        var isAdminRequest = User.IsInRole(UserRole.Admin);
        if (!isUserRequestingOwnProfile & !isAdminRequest)
            return Result.Failure(UserError.ForbiddenAccess).ToProblemDetails();

        // Get User by Id
        var result = await userService.GetByIdAsync(id);

        if (result.IsFailure)
            return result.ToProblemDetails();

        if (result.Value is null)
            return NotFound(UserError.UserByIdNotFound(id));

        return Ok(new ResultSuccessDTO
        {
            Title = Messages.GetDetailSuccess,
            Data = mapper.Map<UserResponseDTO>((User)result.Value)
        });
    }

    [
        HttpPost("set-role"),
        Authorize(Roles = UserRole.Admin),
        ProducesResponseType(StatusCodes.Status201Created),
        ProducesResponseType(StatusCodes.Status400BadRequest)
    ]
    public async Task<IActionResult> SetRoleAsync(SetRoleUserDTO setRoleUserDTO)
    {
        logger.LogInformation(UserLogTemplates.SetUserToRole, "Controller", setRoleUserDTO);

        var result = await userService.SetRoleWithEmailAsync(setRoleUserDTO);
        return result.IsSuccess ? Ok(
            new ResultSuccessDTO { Title = Messages.SetRoleSuccess }
        ) : result.ToProblemDetails();
    }

    // TODO: Update/Partial Update user
    // TODO: Delete/Soft Delete user
}
