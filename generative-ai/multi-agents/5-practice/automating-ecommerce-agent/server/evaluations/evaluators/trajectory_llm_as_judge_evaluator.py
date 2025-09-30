from typing import Optional, Union

from agentevals.trajectory.llm import (
    TRAJECTORY_ACCURACY_PROMPT,
    create_trajectory_llm_as_judge,
)
from agentevals.types import GraphTrajectory
from openevals.llm import create_llm_as_judge
from openevals.prompts import (
    CONCISENESS_PROMPT,
    CORRECTNESS_PROMPT,
    HALLUCINATION_PROMPT,
    RAG_GROUNDEDNESS_PROMPT,
    RAG_HELPFULNESS_PROMPT,
    RAG_RETRIEVAL_RELEVANCE_PROMPT,
)

from .prompts.semantic_similarity_evaluator_prompt import (
    SEMANTIC_SIMILARITY_EVALUATOR_PROMPT,
)

TRAJECTORY_LLM_AS_JUDGE_EVALUATOR_CONFIG = {
    "trajectory_accuracy": TRAJECTORY_ACCURACY_PROMPT,
}


LLM_AS_JUDGE_EVALUATOR_CONFIG = {
    "correctness": CORRECTNESS_PROMPT,
    "conciseness": CONCISENESS_PROMPT,
    "hallucination": HALLUCINATION_PROMPT,
    "rag_groundedness": RAG_GROUNDEDNESS_PROMPT,
    "rag_helpfulness": RAG_HELPFULNESS_PROMPT,
    "rag_retrieval_relevance": RAG_RETRIEVAL_RELEVANCE_PROMPT,
    "semantic_similarity": SEMANTIC_SIMILARITY_EVALUATOR_PROMPT,
}


def run_llm_as_judge_evaluator(
    prompt: str,
    model: str,
    feedback_key: str,
    inputs: dict,
    outputs: dict,
    reference_outputs: dict,
) -> dict:
    """
    Generic LLM evaluator runner.
    """
    evaluator = create_llm_as_judge(
        prompt=prompt,
        model=model,
        feedback_key=feedback_key,
    )

    return evaluator(
        inputs=inputs, outputs=outputs, reference_outputs=reference_outputs
    )


def make_llm_as_judge_evaluator(metric_name: str):
    prompt = LLM_AS_JUDGE_EVALUATOR_CONFIG[metric_name]

    def evaluator(inputs, outputs, reference_outputs):
        return run_llm_as_judge_evaluator(
            prompt=prompt,
            model="openai:gpt-4o-mini",
            feedback_key=metric_name,
            inputs=inputs,
            outputs=outputs,
            reference_outputs=reference_outputs,
        )

    return evaluator


def run_trajectory_evaluator(
    model: str,
    prompt: str,
    inputs: Optional[Union[dict, list]],
    outputs: GraphTrajectory,
    reference_outputs: Optional[GraphTrajectory] = None,
) -> dict:
    """
    Generic LLM evaluator runner for trajectory evaluation.
    """
    evaluator = create_trajectory_llm_as_judge(
        model=model,
        prompt=prompt,
    )
    return evaluator(
        inputs=inputs, outputs=outputs, reference_outputs=reference_outputs
    )


def make_trajectory_evaluator(metric_name: str):
    prompt = TRAJECTORY_LLM_AS_JUDGE_EVALUATOR_CONFIG[metric_name]

    def evaluator(inputs, outputs, reference_outputs):
        return run_trajectory_evaluator(
            model="openai:gpt-4o-mini",
            prompt=prompt,
            inputs=inputs,
            outputs=outputs,
            reference_outputs=reference_outputs,
        )

    return evaluator
