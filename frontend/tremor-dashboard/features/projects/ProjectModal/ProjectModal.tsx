"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";

// Constants
import {
  MESSAGE_ADD_PROJECT,
  MESSAGE_EDIT_PROJECT,
  VARIANT_BUTTON,
} from "@/constants";

// Types
import { ImageProject, ProjectFormData, Project, User } from "@/types";

// Services
import { addNewProject, editProject } from "@/services";

// Hocs
import { TOAST_TYPE } from "@/hocs/withToast";

// Helpers
import { getSubAttrsByKey, convertProjectData, covertDate } from "@/helpers";

// Components
import { Button, LoadingIndicator, Modal } from "@/components";
import { Flex, Text } from "@tremor/react";
import ProjectFields from "../ProjectFields/ProjectFields";

// Contexts
import { useToast } from "@/context/toast";

interface ProjectModalProps {
  onClose: () => void;
  userId: number;
  projectTools: ImageProject[];
  participantsData: User[];
  projectData: Project;
}

const ProjectModal = ({
  onClose,
  userId,
  projectTools,
  participantsData,
  projectData,
}: ProjectModalProps) => {
  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<ProjectFormData>({
    defaultValues: {
      ...convertProjectData(projectData, projectTools, participantsData),
    },
    mode: "onBlur",
  });

  const openToast = useToast();

  const [isPending, startTransition] = useTransition();
  const isEdit = !!projectData.id;

  const onSubmit = async (data: ProjectFormData) => {
    const { name, description, dueDate, participants, tools } = data;

    const participantIds = getSubAttrsByKey(
      participantsData,
      participants,
      "email",
      "id",
    );

    const toolIds = getSubAttrsByKey(projectTools, tools, "name", "id");

    const projectBody = {
      name: name.trim(),
      description,
      tools: toolIds,
      participants: participantIds,
      dueDate: covertDate(dueDate),
    };

    startTransition(async () => {
      let response: boolean;

      if (isEdit) {
        response = await editProject(projectBody, userId, projectData.id);
      } else {
        response = await addNewProject(projectBody, userId);
      }

      onClose();

      openToast({
        type: response ? TOAST_TYPE.SUCCESS : TOAST_TYPE.ERROR,
        message: isEdit
          ? response
            ? MESSAGE_EDIT_PROJECT.SUCCESS
            : MESSAGE_EDIT_PROJECT.FAILED
          : response
            ? MESSAGE_ADD_PROJECT.SUCCESS
            : MESSAGE_ADD_PROJECT.FAILED,
      });
    });
  };

  return (
    <Modal
      additionalClasses="relative w-[100%] gap-0 pb-6 dark:bg-dark-tremor-primary"
      onClose={onClose}
      showCloseIconBtn
      showBtnCloseLabel={false}>
      <form
        className={`project-form w-full ${isPending ? "blur-sm" : ""}`}
        onSubmit={handleSubmit(onSubmit)}>
        <h4 className="text-lg text-center text-primary dark:text-white font-bold mb-2">
          {projectData.id ? "Edit project" : "Add new project"}
        </h4>
        {/* Those input fields */}
        <ProjectFields
          control={control}
          projectTools={projectTools}
          participantsData={participantsData}
        />

        <Flex justifyContent="evenly" className="flex gap-5 mt-8">
          <Button
            type="submit"
            variant={VARIANT_BUTTON.PRIMARY}
            disabled={!isDirty}
            additionalClass="flex-1 min-w-[64px] text-center uppercase sm:px-[22px] px-6 py-2.5 rounded-lg border-0">
            <Text className="flex items-center uppercase py-[2px] text-xs font-bold text-white dark:text-dark-tremor-content-title tracking-wide">
              Submit
            </Text>
          </Button>
          <Button
            variant={VARIANT_BUTTON.SURFACE}
            additionalClass="flex-1 min-w-[64px] sm:px-[22px]"
            onClick={onClose}>
            <Text className="uppercase font-bold text-xs text-gray-900 dark:text-black tracking-wide">
              Cancel
            </Text>
          </Button>
        </Flex>
      </form>
      {isPending && (
        <LoadingIndicator
          additionalClass="absolute z-20 w-full flex h-full justify-center items-center top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
          width={8}
          height={8}
          fillColor="river-bed-500"
        />
      )}
    </Modal>
  );
};

export default ProjectModal;
