from openevals.json import create_json_match_evaluator


def run_json_exactly_match_evaluator(
    outputs: dict,
    reference_outputs: dict,
) -> dict:
    """
    Generic LLM evaluator runner.
    """
    evaluator = create_json_match_evaluator(
        aggregator="average",
        list_aggregator="average",
        list_match_mode="ordered"
    )
    return evaluator(outputs=outputs, reference_outputs=reference_outputs)


def make_json_exactly_match_evaluator():
    def evaluator(outputs, reference_outputs):
        return run_json_exactly_match_evaluator(
            outputs=outputs,
            reference_outputs=reference_outputs,
        )

    return evaluator
