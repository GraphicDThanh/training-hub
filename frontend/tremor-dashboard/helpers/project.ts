import { ImageProject, Project, User } from "@/types";
import { getSubAttrsByKey } from "./common";

export const convertProjectData = (
  data: Project,
  projectTools: ImageProject[],
  projectParticipants: User[],
) => {
  const { name, description, dueDate, participants, tools } = data;

  const participantsValue = getSubAttrsByKey(
    projectParticipants,
    participants,
    "id",
    "email",
  );
  const toolsValue = getSubAttrsByKey(projectTools, tools, "id", "name");

  return {
    name,
    description,
    tools: toolsValue,
    participants: participantsValue,
    dueDate: new Date(dueDate),
  };
};
