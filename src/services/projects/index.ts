"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

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

export const getProjectById = async (projectId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`
    );

    return res.json();
  } catch (error) {
    throw new Error(`Error fetching project: ${error}`);
  }
};

export const createProject = async (projectData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects/create-project`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(projectData),
      }
    );

    revalidateTag("projects");

    return res.json();
  } catch (error) {
    throw new Error(`Error creating project: ${error}`);
  }
};

export const updateProject = async (
  projectId: string,
  projectData: FieldValues
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
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
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    revalidateTag("projects");

    return res.json();
  } catch (error) {
    throw new Error(`Error deleting project: ${error}`);
  }
};
