"use client";

// Libs
import { useCallback, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { InView } from "react-intersection-observer";
import { MdAdd } from "react-icons/md";

// Constants
import { VARIANT_BUTTON } from "@/constants";

// Types
import { ImageProject, Project, User } from "@/types";

// Components
import { Button } from "@/components";
import ProjectModal from "../ProjectModal/ProjectModal";
import { Flex, Text } from "@tremor/react";

const ProjectCard = dynamic(
  () => import("@/features/projects/ProjectCard/ProjectCard"),
);

interface ProjectContainerProps {
  userId: number;
  projectTools: ImageProject[];
  users: User[];
  projectsData: Project[];
}

const ProjectContainer = ({
  userId,
  projectTools,
  users,
  projectsData,
}: ProjectContainerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const projectDefault: Project = useMemo(() => {
    return {
      name: "",
      dueDate: new Date(),
      participants: [] as number[],
      tools: [] as number[],
      description: "",
      id: 0,
    };
  }, []);

  const [project, setProject] = useState(projectDefault);

  const handleAddProject = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleEditModal = useCallback((projectData: Project) => {
    setProject(projectData);
    setIsVisible(true);
  }, []);

  const handleClose = useCallback(() => {
    setProject(projectDefault);
    setIsVisible(false);
  }, [projectDefault]);

  const newUserList = users?.filter(user => user.id !== userId);

  return (
    <>
      <Flex
        justifyContent="end"
        className="flex-wrap sm:justify-between mt-4 sm:mt-0">
        <div className="antialiased my-8 sm:max-w-[65%]">
          <h3 className="text-xl text-tremor-content-title dark:text-dark-tremor-content-title font-bold my-2">
            Some of Our Awesome Projects
          </h3>
          <Text className="text-tremor-title text-tertiary dark:text-dark-tremor-content-romance opacity-100 tracking-wide leading-1.6 font-light">
            This is the paragraph where you can write more details about your
            projects. Keep you user engaged by providing meaningful information.
          </Text>
        </div>
        <Button
          variant={VARIANT_BUTTON.PRIMARY}
          onClick={handleAddProject}
          data-testid="add-new-btn"
          additionalClass="min-w-[64px] text-center uppercase sm:px-[22px] px-6 py-2.5 rounded-lg border-0">
          <Text className="flex items-center uppercase py-[2px] text-xs font-bold text-white dark:text-dark-tremor-content-title tracking-wide">
            <MdAdd size="16" className="mr-2" />
            Add New
          </Text>
        </Button>

        {isVisible && (
          <ProjectModal
            onClose={handleClose}
            userId={userId}
            projectTools={projectTools}
            participantsData={newUserList}
            projectData={project}
          />
        )}
      </Flex>
      <InView>
        <Flex
          justifyContent="start"
          alignItems="start"
          className="flex-wrap grid gap-x-6 gap-y-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project: Project) => {
            const handleEditProject = () => {
              handleEditModal(project);
            };

            return (
              <ProjectCard
                userId={userId}
                key={project.id}
                projectData={project}
                handleEditModal={handleEditProject}
              />
            );
          })}
        </Flex>
      </InView>
    </>
  );
};

export default ProjectContainer;
