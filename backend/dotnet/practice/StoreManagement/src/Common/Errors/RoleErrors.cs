namespace StoreManagement.Errors;

public sealed record RoleErrorCode
{
    public const string RoleNotFound = "RoleError.RoleNotFound";
    public const string RoleNotSupport = "RoleError.RoleNotSupport";
}

public sealed record RoleErrorMessage
{
    public const string RoleNotFound = "Role not found.";
    public const string RoleNotSupport = "Role not support.";
}



public static class RoleError
{
    public static readonly Error RoleNotFound =
        Error.NotFound(RoleErrorCode.RoleNotFound, RoleErrorMessage.RoleNotFound);
    public static readonly Error RoleNotSupport =
        Error.NotFound(RoleErrorCode.RoleNotSupport, RoleErrorMessage.RoleNotSupport);
}
