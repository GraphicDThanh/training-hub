from common.utils import create_state_update
from langchain_core.tools import tool
from langchain_core.tools.base import InjectedToolCallId
from langgraph.types import Command
from services import product_service
from typing_extensions import Annotated


@tool
def retrieve_product_intermediate_step(
    product_name: str,
    tool_call_id: Annotated[str, InjectedToolCallId],
) -> Command:
    """
    RULE: Never use this tool if Query Intent is `product`.
    Use this tool to retrieve product for intermediate step only.
    For example: with cart action (add to cart, remove out of cart), need to retrieve product at intermediate step first, then call cart tool to add or remove product.
    Avoid using this tool for product direct action like search, use sql tools instead.

    Args:
        name (str): Product name want to get.
        tool_call_id (str): The tool call ID.
    """
    # -- Validation - start --
    if not product_name:
        return Command(
            update=create_state_update(
                "Product name are required.",
                tool_call_id,
            )
        )

    # -- Validation - end --

    # Action - get products by names
    response = product_service.get_product_by_name(product_name)
    if response.success is False:
        return Command(
            update=create_state_update(
                response.message,
                tool_call_id,
            )
        )

    product_retrieved_intermediate_step = response.data["product"]
    if not product_retrieved_intermediate_step:
        return Command(
            update=create_state_update(
                "Product not found.",
                tool_call_id,
            )
        )

    return Command(
        update=create_state_update(
            "Retrieve product for other agent intermediate step successfully. Delegate back to supervisor to continue.",
            tool_call_id,
            state_additional_data={
                "product_retrieved_intermediate_step": product_retrieved_intermediate_step,

            },
        )
    )
