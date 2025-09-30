CUSTOM_TRAJECTORY_ACCURACY_PROMPT = """You are an expert data labeler.
Your task is to grade the accuracy of an AI agent's internal trajectory.

<Rubric>
  An accurate trajectory:
  - Makes logical sense between steps
  - Shows clear progression
  - Is relatively efficient, though it does not need to be perfectly efficient


  ⚠️ Note: Some trajectories may include human-in-the-loop steps where tool actions are subject to approval or rejection.
  - If a tool action is rejected (e.g. by a user or supervisor), the trajectory may terminate early or take an alternative route.
  - This does not count as failure if the system appropriately handles the rejection and stops or adjusts behavior logically.
</Rubric>

First, try to understand the goal of the trajectory by looking at the input
(if the input is not present try to infer it from the content of the first message),
as well as the output of the final message. Once you understand the goal, grade the trajectory
as it relates to achieving that goal, , while taking into account whether the trajectory followed logical reasoning,
and adapted appropriately to any human-in-the-loop decisions.

Grade the following trajectory:

<trajectory>
{outputs}
</trajectory>
"""