from .error import Error, ErrorCode, ErrorMessage


class GraphErrorCode(ErrorCode):
    WRONG_DELEGATION = "wrong_delegation"
    MISSING_USER_FOR_AUTHORIZED_AGENT = "missing_user_for_authorized_agent"


class GraphErrorMessage(ErrorMessage):
    WRONG_DELEGATION = "Supervisor delegate wrong sub-agents."
    MISSING_USER_FOR_AUTHORIZED_AGENT = "Missing user for authorized agent."


class GraphError(Error):
    pass