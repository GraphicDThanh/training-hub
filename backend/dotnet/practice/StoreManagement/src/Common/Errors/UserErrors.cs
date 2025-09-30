namespace StoreManagement.Errors;

public sealed record UserErrorCode
{
    public const string UserNotFound = "UserError.UserNotFound";
    public const string GetByEmailAsyncNotFound = "UserError.GetByEmailAsyncNotFound";
    public const string UserByIdNotFound = "UserError.UserByIdNotFound";
    public const string UserNotHaveAnyRole = "UserError.UserNotHaveAnyRole";
    public const string ForbiddenAccess = "UserError.ForbiddenAccess";
    public static string Identity(string code) => $"IdentityError.{code}";
}

public sealed record UserErrorMessage
{
    public const string GetByEmailAsyncNotFound = "User by email not found.";
    public const string UserNotHaveAnyRole = "User not have any role.";
    public const string ForbiddenAccess = "You do not have permission for this action.";
    public const string UserNotFound = "User not found.";
    public static string UserByIdNotFound(string id) => $"User with {id} not found.";
    public static string UserCreationIdentityFailed(string message) => $"User creation failed with message: {message}";
}

public static class UserError
{

    public static Error UserNotFound =>
        Error.NotFound(
            UserErrorCode.UserNotFound,
            UserErrorMessage.UserNotFound);

    public static Error UserByIdNotFound(string id) =>
        Error.NotFound(
            UserErrorCode.UserByIdNotFound,
            UserErrorMessage.UserByIdNotFound(id));

    public static readonly Error GetByEmailAsyncNotFound =
        Error.NotFound(
            UserErrorCode.GetByEmailAsyncNotFound,
            UserErrorMessage.GetByEmailAsyncNotFound);

    public static readonly Error UserNotHaveAnyRole =
        Error.NotFound(
            UserErrorCode.UserNotHaveAnyRole,
            UserErrorMessage.UserNotHaveAnyRole);

    public static readonly Error ForbiddenAccess =
        Error.Forbidden(
            UserErrorCode.ForbiddenAccess,
            UserErrorMessage.ForbiddenAccess);

    public static Error UserCreationIdentityFailed(string code, string message) =>
        Error.Failure(
            UserErrorCode.Identity(code),
            UserErrorMessage.UserCreationIdentityFailed(message));
}
