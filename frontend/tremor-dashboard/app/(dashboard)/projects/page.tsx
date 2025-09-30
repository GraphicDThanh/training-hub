import dynamic from "next/dynamic";

// Components
import { Flex, Card } from "@tremor/react";

const ProjectContainer = dynamic(
  () => import("@/features/projects/ProjectContainer/ProjectContainer"),
  { ssr: false },
);

const ProfileInfo = dynamic(
  () => import("@/components/ProfileInfo/ProfileInfo"),
);

import { NoPermissionContent } from "@/components";

//Constants
import { ROLES } from "@/constants";
import { USER_ROLE } from "@/types";

// Services
import {
  getProjects,
  getProjectTools,
  getUserById,
  getUsers,
} from "@/services";

// Helpers
import { getUserFromCookies } from "@/helpers";

// Contexts
import ToastProvider from "@/context/toast";

export const metadata = {
  title: "Projects - Tremor Dashboard",
};

const Projects = async () => {
  const userCookie = await getUserFromCookies();
  const user = await getUserById(userCookie.id);

  if (userCookie.role !== USER_ROLE.ADMIN) {
    return <NoPermissionContent />;
  }

  const [projectsData, projectTools, users] = await Promise.all([
    getProjects(user.id),
    getProjectTools(),
    getUsers(),
  ]);

  return (
    <ToastProvider>
      <div className="mx-6 -mt-16">
        <Card className="px-4 py-2 dark:bg-dark-tremor-primary ring-0">
          <Flex
            flexDirection="col"
            alignItems="start"
            className="md:flex-row md:items-center">
            <ProfileInfo
              name={user.name}
              role={ROLES[user.role].label}
              avatarUrl={user.avatar}
              isProject
            />
          </Flex>
        </Card>
      </div>
      <ProjectContainer
        userId={user.id}
        projectTools={projectTools}
        users={users}
        projectsData={projectsData}
      />
    </ToastProvider>
  );
};

export default Projects;
