"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const getAllSkills = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills`, {
      method: "GET",
      next: { tags: ["skills"] },
    });

    return res.json();
  } catch (error) {
    throw new Error(`Error fetching skills: ${error}`);
  }
};
export const getSingleSkills = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills/${id}`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: { tags: ["skills"] },
    });

    return res.json();
  } catch (error) {
    throw new Error(`Error fetching skills: ${error}`);
  }
};

export const createSkill = async (skillData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/skills/create-skill`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(skillData),
      }
    );

    revalidateTag("skills");

    return res.json();
  } catch (error) {
    throw new Error(`Error creating skill: ${error}`);
  }
};

export const updateSkill = async (skillId: string, skillData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/skills/${skillId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(skillData),
      }
    );

    revalidateTag("skills");

    return res.json();
  } catch (error) {
    throw new Error(`Error updating skill: ${error}`);
  }
};

export const softDeleteSkill = async (skillId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/skills/${skillId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify({ isDeleted: true }),
      }
    );

    revalidateTag("skills");

    return res.json();
  } catch (error) {
    throw new Error(`Error soft deleting skill: ${error}`);
  }
};

export const deleteSkill = async (skillId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/skills/${skillId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    revalidateTag("skills");

    return res.json();
  } catch (error) {
    throw new Error(`Error deleting skill: ${error}`);
  }
};
