namespace StoreManagement.Exceptions;


public class BaseException(string errorCode, string message): Exception (message)
{
    public string ErrorCode { get; } = errorCode;
}

public class NotFoundException(string errorCode, string message) : BaseException(errorCode, message) {}
public class IdentityException(string errorCode, string message) : BaseException(errorCode, message) {}
public class RoleNotSupportException(string errorCode, string message) : BaseException(errorCode, message) {}

