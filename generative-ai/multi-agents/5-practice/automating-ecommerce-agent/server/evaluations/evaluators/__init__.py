from .graph_trajectory_llm_as_judge_evaluator import make_graph_trajectory_evaluator
from .json_match_evaluator import make_json_exactly_match_evaluator
from .llm_as_judge_evaluator import make_llm_as_judge_evaluator
from .trajectory_llm_as_judge_evaluator import make_trajectory_evaluator

# - LLM AS JUDGE EVALUATORS
correctness_evaluator = make_llm_as_judge_evaluator("correctness")
conciseness_evaluator = make_llm_as_judge_evaluator("conciseness")
hallucination_evaluator = make_llm_as_judge_evaluator("hallucination")
rag_groundedness_evaluator = make_llm_as_judge_evaluator("rag_groundedness")
rag_helpfulness_evaluator = make_llm_as_judge_evaluator("rag_helpfulness")
rag_retrieval_relevance_evaluator = make_llm_as_judge_evaluator(
    "rag_retrieval_relevance"
)
semantic_similarity_evaluator = make_llm_as_judge_evaluator("semantic_similarity")

# -JSON MATCH EVALUATORS
output_json_match_evaluator = make_json_exactly_match_evaluator()


# - TRAJECTORY EVALUATORS
trajectory_llm_as_judge_evaluator = make_trajectory_evaluator("trajectory_accuracy")
graph_trajectory_accuracy_llm_as_judge_evaluator = make_graph_trajectory_evaluator(
    "custom_trajectory_accuracy", feedback_key="graph_trajectory_accuracy"
)
graph_trajectory_accuracy_with_reference_llm_as_judge_evaluator = (
    make_graph_trajectory_evaluator(
        "trajectory_accuracy_with_reference",
        feedback_key="graph_trajectory_accuracy_with_reference",
    )
)


__all__ = [
    "correctness_evaluator",
    "conciseness_evaluator",
    "hallucination_evaluator",
    "rag_groundedness_evaluator",
    "rag_helpfulness_evaluator",
    "rag_retrieval_relevance_evaluator",
    "semantic_similarity_evaluator",
    "output_json_match_evaluator",
    # Trajectory Evaluators
    "graph_trajectory_accuracy_llm_as_judge_evaluator",
    "graph_trajectory_accuracy_with_reference_llm_as_judge_evaluator",
]
