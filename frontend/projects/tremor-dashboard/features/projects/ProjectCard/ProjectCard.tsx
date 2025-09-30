"use client";

// Libs
import { useState, RefObject, memo, useTransition, useCallback } from "react";
import { Card, Text, Flex } from "@tremor/react";
import { FaEllipsisV } from "react-icons/fa";
import { InView } from "react-intersection-observer";
import isEqual from "react-fast-compare";

// Components
import {
  CustomImage,
  Avatars,
  Button,
  LoadingIndicator,
  Modal,
} from "@/components";

// Types
import { Project } from "@/types";

// Constants
import {
  MESSAGE_DELETE_PROJECT,
  PLACEHOLDER_IMAGE,
  VARIANT_BUTTON,
} from "@/constants";

// Helpers
import { formatNewDate } from "@/helpers";

// Hooks
import { TOAST_TYPE } from "@/hocs/withToast";
import useOutsideClick from "@/hooks/useOutsideClick";

// Services
import { deleteProject } from "@/services";

// Contexts
import { useToast } from "@/context/toast";

interface ProjectCardProps {
  projectData: Project;
  handleEditModal: (projectData: Project) => void;
  userId: number;
}

const ProjectCard = ({
  projectData,
  handleEditModal,
  userId,
}: ProjectCardProps): JSX.Element => {
  const { name, dueDate, toolsData, participantsData, description, id } =
    projectData;
  const participantNumber = participantsData?.length;
  const duaDateFormat = formatNewDate(new Date(dueDate).toString());
  const srcImageCard = toolsData?.[0]?.image ?? PLACEHOLDER_IMAGE;
  const isOverDue = new Date(dueDate) < new Date();
  const classDuaDate = isOverDue
    ? "text-red-600 dark:text-red-400"
    : "text-primary";

  const [isOpenAction, setIsOpenAction] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [currentProjectId, setCurrentProjectId] = useState(0);
  const openActionProject = isOpenAction && id === currentProjectId;

  const openToast = useToast();

  const blurClass = isPending ? "blur-sm" : "";
  const filterClass = toolsData?.length ? "" : "h-[2.5rem] filter-invert-1";

  const projectCardRef = useOutsideClick(() => {
    setIsOpenAction(false);
  });

  const handleEditProject = useCallback(async () => {
    setIsOpenAction(false);
    handleEditModal(projectData);
  }, [projectData, handleEditModal]);

  const handleDeleteProject = useCallback(async () => {
    setIsOpenModal(true);
    setIsOpenAction(false);
  }, []);

  const handleSubmitDeleteProject = useCallback(async () => {
    setIsOpenModal(false);

    startTransition(async () => {
      const response = await deleteProject(id, userId);

      openToast({
        type: response ? TOAST_TYPE.SUCCESS : TOAST_TYPE.ERROR,
        message: response
          ? MESSAGE_DELETE_PROJECT.SUCCESS
          : MESSAGE_DELETE_PROJECT.FAILED,
      });
    });
  }, [openToast, id, userId]);

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const handleToggleAction = () => {
    setIsOpenAction(!isOpenAction);
    setCurrentProjectId(id);
  };

  return (
    <div className="antialiased items-center justify-between pb-1">
      <div className="flex items-center relative">
        {isPending && (
          <LoadingIndicator
            additionalClass="w-full h-full absolute z-20 flex justify-center items-center"
            width={8}
            height={8}
            fillColor="river-bed-500"
          />
        )}
        <Card
          className={`dark:bg-dark-tremor-primary mx-auto px-4 py-1 ring-0 max-w-full lg:max-w-[356px] 2xl:max-w-full border-none relative mt-[40px] rounded-xl shadow-md ${blurClass}`}>
          <InView>
            <Flex className="absolute top-[-22px] left-40px w-[74px] h-[74px] p-1 bg-gradient-arsenic justify-center rounded-xl dark:bg-gradient-pickled">
              <CustomImage
                src={srcImageCard}
                width={60}
                height={60}
                alt={`${name}`}
                loading="lazy"
                className={`object-cover rounded-md ${filterClass}`}
              />
            </Flex>
          </InView>
          <Flex className="pl-[90px] mb-6 mt-1 relative">
            <Flex flexDirection="col" alignItems="start" justifyContent="start">
              <h4 className="text-md text-tremor-content-title dark:text-dark-tremor-content-title font-semibold leading-6 line-clamp-2 items-center">
                {name}
              </h4>
              {participantsData && (
                <InView>
                  <Flex
                    justifyContent="start"
                    alignItems="start"
                    className={`mt-1 h-[1.5rem] w-[160px] truncate`}>
                    <Avatars
                      width={24}
                      height={24}
                      className="w-[24px] h-[24px] min-w-[24px]"
                      participantsData={participantsData}
                    />
                  </Flex>
                </InView>
              )}
            </Flex>
            <Flex flexDirection="col" justifyContent="end" className="w-auto">
              <Flex
                data-testid="toggle-icon"
                flexDirection="col"
                className="cursor-pointer w-[30px] h-[16px]"
                onClick={handleToggleAction}>
                <FaEllipsisV className="text-secondary dark:text-secondary" />
              </Flex>
              {openActionProject && (
                <div
                  data-testid="menu-action"
                  ref={projectCardRef as RefObject<HTMLDivElement>}
                  className="absolute p-2 right-[26px] top-[3px] z-10 bg-white dark:bg-dark-tremor-primary rounded-md shadow-md dark:shadow-select-option">
                  <Button
                    data-testid="edit-project"
                    additionalClass="w-full py-2 dark:hover:bg-primary px-3 font-normal text-sm text-primary dark:text-white hover:text-secondary dark:group-hover:text-lighter"
                    variant={VARIANT_BUTTON.LIGHT_CARD}
                    variantTremor={VARIANT_BUTTON.LIGHT}
                    onClick={handleEditProject}>
                    <Text className="px-3 font-normal text-sm text-primary dark:text-white hover:text-secondary dark:group-hover:text-lighter">
                      Edit Project
                    </Text>
                  </Button>

                  <Button
                    data-testid="delete-project"
                    additionalClass="w-full py-2 dark:hover:bg-primary px-3 font-normal text-sm text-attention dark:text-attention dark:hover:text-attention"
                    variant={VARIANT_BUTTON.LIGHT_CARD}
                    variantTremor={VARIANT_BUTTON.LIGHT}
                    onClick={handleDeleteProject}>
                    <Text className="px-3 font-normal text-sm text-attention dark:text-attention dark:hover:text-attention">
                      Delete Project
                    </Text>
                  </Button>
                </div>
              )}
            </Flex>
          </Flex>
          <InView>
            <div
              className={`text-sm text-tertiary my-4 font-light dark:text-dark-tremor-content-romance h-[2.8rem] line-clamp-2 [&>*>*]:!text-primary [&>*>*]:dark:!text-white`}
              dangerouslySetInnerHTML={{ __html: description! }}
            />
          </InView>
          <div className="h-px bg-[linear-gradient(to_right,rgba(52,71,103,0),rgba(52,71,103,0.4),rgba(52,71,103,0))] dark:bg-gradient-divider opacity-25 my-4" />
          <Flex className="my-4">
            <div>
              <Text className="text-primary font-semibold dark:text-dark-tremor-content-title">
                {participantNumber}
              </Text>
              <Text className="text-tertiary dark:text-dark-romance font-normal">
                Participants
              </Text>
            </div>
            <div className="text-right">
              <Text
                className={`font-semibold dark:text-dark-tremor-content-title ${classDuaDate}`}>
                {duaDateFormat}
              </Text>
              <Text className="text-tertiary dark:text-dark-romance font-normal">
                Due date
              </Text>
            </div>
          </Flex>
        </Card>
      </div>

      {isOpenModal && (
        <Modal
          additionalClasses="md:min-w-[390px] w-[calc(100%-8px)] md:max-w-[390px] items-center"
          open={isOpenModal}
          showCloseIconBtn={false}
          showBtnCloseLabel={true}
          onClickPrimaryBtn={handleSubmitDeleteProject}
          onClose={handleCloseModal}
          btnPrimaryLabel="Confirm">
          <Text className="text-tremor-title text-tertiary dark:text-dark-tremor-content-romance opacity-100 tracking-wide leading-1.6 font-light text-center w-[275px]">
            Are you sure you want to delete project <b>{projectData.name}</b>?
          </Text>
        </Modal>
      )}
    </div>
  );
};

export default memo(ProjectCard, isEqual);
