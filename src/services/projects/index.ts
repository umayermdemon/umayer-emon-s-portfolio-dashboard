"use server";

import { IProject } from "@/types";
import { revalidateTag } from "next/cache";

export const getAllProjects = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
      method: "GET",
      next: { tags: ["projects"] },
    });

    return res.json();
  } catch (error) {
    throw new Error(`Error fetching projects: ${error}`);
  }
};

export const createProject = async (projectData: IProject) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    revalidateTag("projects");

    return res.json();
  } catch (error) {
    throw new Error(`Error creating project: ${error}`);
  }
};

export const updateProject = async (
  projectId: string,
  projectData: IProject
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      }
    );

    revalidateTag("projects");

    return res.json();
  } catch (error) {
    throw new Error(`Error updating project: ${error}`);
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    revalidateTag("projects");

    return res.json();
  } catch (error) {
    throw new Error(`Error deleting project: ${error}`);
  }
};
