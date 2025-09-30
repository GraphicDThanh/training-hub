
namespace StoreManagement.Errors;

public enum ErrorType
{
    Failure = 0,
    Validation = 1,
    NotFound = 2,
    Conflict = 3,
    Unauthorized = 4,
    Forbidden = 5,
    NotImplement = 6
}

public sealed record ErrorCode
{
    public const string InternalError = "InternalServerFail";
    public const string NullValue = "NullValue";
    public const string NotImplement = "NotImplement";
}

public sealed record ErrorMessage
{
    public const string InternalError = "Internal Error";
    public const string NullValue = "Value cannot be null";
    public const string NotImplement = "Not implement yet";
}


public sealed record Error
{
    private Error(ErrorType errorType, string errorCode, string description)
    {
        Type = errorType;
        Code = errorCode;
        Description = description;
    }

    public ErrorType Type { get; }
    public string Code { get; }
    public string Description { get; }

    public static readonly Error None =
        new(ErrorType.Failure, string.Empty, string.Empty);

    public static readonly Error NullValue =
        new(ErrorType.Failure, ErrorCode.NullValue, ErrorMessage.NullValue);

    public static readonly Error NotImplement =
        new(ErrorType.NotImplement, ErrorCode.NotImplement, ErrorMessage.NotImplement);

    public static Error InternalServerFail(string description) =>
        new(ErrorType.Failure, ErrorCode.InternalError, description);

    public static Error Failure(string code, string description) =>
        new(ErrorType.Failure, code, description);

    public static Error Validation(string code, string description) =>
        new(ErrorType.Validation, code, description);

    public static Error NotFound(string code, string description) =>
        new(ErrorType.NotFound, code, description);

    public static Error Conflict(string code, string description) =>
        new(ErrorType.Conflict, code, description);

    public static Error Unauthorized(string code, string description) =>
        new(ErrorType.Unauthorized, code, description);

    public static Error Forbidden(string code, string description) =>
        new(ErrorType.Forbidden, code, description);
}
