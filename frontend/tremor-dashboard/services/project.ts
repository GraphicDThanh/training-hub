"use server";

import { revalidatePath, revalidateTag } from "next/cache";

// Constants
import { ROUTER_API_URL, ROUTES } from "@/constants";

// Helpers
import { getErrorMessage } from "@/helpers";

// Types
import { ImageProject, ProjectFormData, Project } from "@/types";

// Only allow admin user to get all projects
export const getProjects = async (
  requestUserId: number,
): Promise<Project[]> => {
  const res = await fetch(
    `${ROUTER_API_URL}/projects?userId=${requestUserId}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      next: {
        tags: ["project-list"],
      },
    },
  );

  if (!res.ok) throw new Error(getErrorMessage(res.status, res.statusText));

  return res.json();
};

export const addNewProject = async (
  newProject: ProjectFormData,
  userId: number,
) => {
  const res = await fetch(`${ROUTER_API_URL}/projects?userId=${userId}`, {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(newProject),
  });

  revalidatePath(ROUTES.PROJECTS);

  return res.status === 201;
};

export const editProject = async (
  projectData: ProjectFormData,
  userId: number,
  projectId: number,
) => {
  const res = await fetch(
    `${ROUTER_API_URL}/projects/${projectId}?userId=${userId}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(projectData),
    },
  );

  revalidateTag("project-list");

  return res.status === 200;
};

export const getProjectTools = async (): Promise<ImageProject[]> => {
  const res = await fetch(`${ROUTER_API_URL}/project-tools`, {
    method: "GET",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    next: {
      tags: ["project-tools"],
    },
  });

  if (!res.ok) throw new Error(getErrorMessage(res.status, res.statusText));

  return res.json();
};

export const deleteProject = async (
  projectId: number,
  requestUserId: number,
) => {
  const res = await fetch(
    `${ROUTER_API_URL}/projects/${projectId}?userId=${requestUserId}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      next: {
        // Re-validate every minute
        revalidate: 60,
      },
    },
  );

  revalidatePath(ROUTES.PROJECTS);

  return res.status === 204;
};
