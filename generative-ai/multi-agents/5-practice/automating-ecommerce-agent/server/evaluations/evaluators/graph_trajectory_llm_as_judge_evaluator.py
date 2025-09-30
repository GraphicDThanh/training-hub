from typing import Optional, Union

from agentevals.graph_trajectory.llm import create_graph_trajectory_llm_as_judge
from agentevals.trajectory.llm import (
    TRAJECTORY_ACCURACY_PROMPT,
    TRAJECTORY_ACCURACY_PROMPT_WITH_REFERENCE,
)
from agentevals.types import GraphTrajectory
from .prompts.trajectory_accuracy_prompt import CUSTOM_TRAJECTORY_ACCURACY_PROMPT
TRAJECTORY_LLM_AS_JUDGE_EVALUATOR_CONFIG = {
    "trajectory_accuracy": TRAJECTORY_ACCURACY_PROMPT,
    "custom_trajectory_accuracy": CUSTOM_TRAJECTORY_ACCURACY_PROMPT,
    "trajectory_accuracy_with_reference": TRAJECTORY_ACCURACY_PROMPT_WITH_REFERENCE,
}


def run_graph_trajectory_evaluator(
    model: str,
    prompt: str,
    inputs: Optional[Union[dict, list]],
    outputs: GraphTrajectory,
    reference_outputs: Optional[GraphTrajectory] = None,
    feedback_key: str = "graph_trajectory_accuracy",
) -> dict:
    """
    Generic LLM evaluator runner for graph trajectory evaluation.
    """
    evaluator = create_graph_trajectory_llm_as_judge(
        model=model,
        prompt=prompt,
        feedback_key=feedback_key,
    )
    return evaluator(
        inputs=inputs, outputs=outputs, reference_outputs=reference_outputs
    )


def make_graph_trajectory_evaluator(metric_name: str, feedback_key: str = "graph_trajectory_accuracy"):
    prompt = TRAJECTORY_LLM_AS_JUDGE_EVALUATOR_CONFIG[metric_name]

    def evaluator(inputs, outputs, reference_outputs):
        return run_graph_trajectory_evaluator(
            model="openai:gpt-4o-mini",
            prompt=prompt,
            inputs=inputs,
            outputs=outputs,
            reference_outputs=reference_outputs,
            feedback_key=feedback_key,
        )

    return evaluator
