from pydantic import BaseModel, ConfigDict


class AgentEval(BaseModel):
    """
    AgentEval is a base class for evaluating agents.
    """

    key: str
    dataset_name: str
    examples: list
    is_reset_examples: bool = False
    description: str = "Examples for the agent."
    target: object = None
    evaluators: list = []
    is_run: bool = False

    model_config = ConfigDict(arbitrary_types_allowed=True)
