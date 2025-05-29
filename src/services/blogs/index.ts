"use server";

import { IProject } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const getAllBlogs = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
      method: "GET",
      next: { tags: ["blogs"] },
    });

    return res.json();
  } catch (error) {
    throw new Error(`Error fetching blogs: ${error}`);
  }
};

export const createBlog = async (blogData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/create-blog`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(blogData),
      }
    );

    revalidateTag("blogs");

    return res.json();
  } catch (error) {
    throw new Error(`Error creating blog: ${error}`);
  }
};

export const updateBlog = async (blogId: string, blogData: IProject) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(blogData),
      }
    );

    revalidateTag("blogs");

    return res.json();
  } catch (error) {
    throw new Error(`Error updating blog: ${error}`);
  }
};

export const deleteBlog = async (blogId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    revalidateTag("blogs");

    return res.json();
  } catch (error) {
    throw new Error(`Error deleting blog: ${error}`);
  }
};
