from common.errors.graph import GraphErrorCode


class GraphException(BaseException):
    """Exception raised for errors graph"""
    def __init__(
            self,
            status_code: int = 500,
            error_code: GraphErrorCode = GraphErrorCode.INTERNAL_SERVER_ERROR,
            message: str = "Graph error"
    ):
        super().__init__(status_code, error_code, message)
