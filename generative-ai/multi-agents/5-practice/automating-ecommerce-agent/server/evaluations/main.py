# ruff: noqa: E402

# Path config
# ----------------------------------------------------------------
import os
import sys

root_path = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))  # server
if root_path not in sys.path:
    sys.path.append(root_path)

# ----------------------------------------------------------------

from datasets import (
    cart_agent_examples,
    ecommerce_multi_agents_examples,
    order_agent_examples,
    product_agent_examples,
    product_agent_trajectory_examples,
    service_agent_trajectory_examples,
    service_agent_trajectory_with_interrupt_examples,
    supervisor_agent_delegate_examples,
    supervisor_agent_examples,
)
from eval_common.services import eval_service
from eval_common.types import AgentEval
from evaluators import (
    graph_trajectory_accuracy_llm_as_judge_evaluator,
    output_json_match_evaluator,
    semantic_similarity_evaluator,
)
from targets import (
    cart_agent_target,
    ecommerce_agent_target,
    order_agent_target,
    product_agent_target,
    product_agent_trajectory_target,
    service_agent_trajectory_target,
    service_agent_trajectory_with_interrupt_target,
    supervisor_agent_delegate_target,
    supervisor_agent_target,
)

delegate_supervisor_agent_eval = AgentEval(
    key="supervisor_delegate",
    dataset_name="enhancement_agent_evals_delegate_supervisor_agent",
    examples=supervisor_agent_delegate_examples,
    is_reset_examples=False,
    description="Evaluation examples for the supervisor agent delegate.",
    target=supervisor_agent_delegate_target,
    evaluators=[output_json_match_evaluator, semantic_similarity_evaluator],
    is_run=False,
)
supervisor_agent_eval = AgentEval(
    key="supervisor",
    dataset_name="enhancement_agent_evals_supervisor_agent",
    examples=supervisor_agent_examples,
    is_reset_examples=False,
    description="Evaluation examples for the supervisor agent.",
    target=supervisor_agent_target,
    evaluators=[semantic_similarity_evaluator],
    is_run=False,
)
product_agent_eval = AgentEval(
    key="product",
    dataset_name="enhancement_agent_evals_product_agent",
    examples=product_agent_examples,
    is_reset_examples=False,
    description="Evaluation examples for the product agent.",
    target=product_agent_target,
    evaluators=[semantic_similarity_evaluator],
    is_run=False,
)
cart_agent_eval = AgentEval(
    key="cart",
    dataset_name="enhancement_agent_evals_cart_agent",
    examples=cart_agent_examples,
    is_reset_examples=False,
    description="Evaluation examples for the cart agent.",
    target=cart_agent_target,
    evaluators=[semantic_similarity_evaluator],
    is_run=False,
)
order_agent_eval = AgentEval(
    key="order",
    dataset_name="enhancement_agent_evals_order_agent",
    examples=order_agent_examples,
    is_reset_examples=False,
    description="Evaluation examples for the order agent.",
    target=order_agent_target,
    evaluators=[semantic_similarity_evaluator],
    is_run=False,
)
ecommerce_multi_agents_eval = AgentEval(
    key="ecommerce-multi-agents",
    dataset_name="enhancement_agent_evals_ecommerce_multi_agents",
    examples=ecommerce_multi_agents_examples,
    is_reset_examples=True,
    description="Evaluation examples for the ecommerce multi agents.",
    target=ecommerce_agent_target,
    evaluators=[semantic_similarity_evaluator],
    is_run=True,
)

# Trajectory targets
product_agent_trajectory_eval = AgentEval(
    key="product-agent-trajectory",
    dataset_name="enhancement_agent_evals_trajectory_product_agent",
    examples=product_agent_trajectory_examples,
    is_reset_examples=False,
    description="Evaluation examples for the product agent trajectory.",
    target=product_agent_trajectory_target,
    evaluators=[
        graph_trajectory_accuracy_llm_as_judge_evaluator,
        semantic_similarity_evaluator,
    ],
    is_run=False,
)

service_agent_trajectory_eval = AgentEval(
    key="service-agent-trajectory",
    dataset_name="enhancement_agent_evals_trajectory_service_agent",
    examples=service_agent_trajectory_examples,
    is_reset_examples=False,
    description="Evaluation examples for the service agent trajectory.",
    target=service_agent_trajectory_target,
    evaluators=[
        graph_trajectory_accuracy_llm_as_judge_evaluator,
        semantic_similarity_evaluator,
    ],
    is_run=False,
)

service_agent_trajectory_eval_with_interrupt = AgentEval(
    key="service-agent-trajectory-with-interrupt",
    dataset_name="enhancement_agent_evals_trajectory_service_agent_with_interrupt",
    examples=service_agent_trajectory_with_interrupt_examples,
    is_reset_examples=False,
    description="Evaluation examples for the service agent trajectory with interrupt.",
    target=service_agent_trajectory_with_interrupt_target,
    evaluators=[
        graph_trajectory_accuracy_llm_as_judge_evaluator,
    ],
    is_run=False,
)

if __name__ == "__main__":
    print("Running agents evaluations...")
    list_agents = [
        # score: 7.25 (need fix)
        # https://smith.langchain.com/o/5e441d01-8350-44a3-a20d-bcffa2dfe563/datasets/d5ec922b-ab43-4da3-a80e-94e0dd15d0b8
        ecommerce_multi_agents_eval,  # error
        delegate_supervisor_agent_eval,  # done
        supervisor_agent_eval,  # done
        product_agent_eval,  # done
        cart_agent_eval,  # done
        order_agent_eval,  # done (some sample correct but score is 5)
    ]
    eval_service.run_evaluations(list_agents)

    # print("Running agents trajectory evaluations...")
    # list_trajectory_agents = [
    #     # product_agent_trajectory_evs
    #     service_agent_trajectory_eval_with_interrupt,
    # ]
    # eval_service.run_evaluations(list_trajectory_agents)

    # Get my order list.
    # eval_service.run_single_example(list_agents, "cart", "16de640f-77d2-4c69-8289-6869eb98cfb2")

    # Sample need to run:
    # - 67ae5313-2de4-4a85-b881-c05b212ac2ab
    #   - Ecommerce multi agents
    #   - Remove Dreamy Styled Collar Shirt out of cart.s
