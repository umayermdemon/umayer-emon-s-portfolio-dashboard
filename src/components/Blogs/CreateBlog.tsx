/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Input } from "../ui/input";

import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateBlogValidationSchema } from "./CreateBlogValidationSchema";
import ImageUploader from "../ui/core/ImageUploader";
import ImagePreviewer from "../ui/core/ImageUploader/ImagePreviewer";
import { z } from "zod";
import { uploadImageToCloudinary } from "../shared/uploadImageToCloudinary";
import { createBlog } from "@/services/blogs";
import { toast } from "sonner";
type FormSchema = z.infer<typeof CreateBlogValidationSchema>;
export default function CreateBlogPage() {
  const [tagsInput, setTagsInput] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const form = useForm<FormSchema>({
    resolver: zodResolver(CreateBlogValidationSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      summary: "",
      tags: [],
      description: "",
      featured: false,
      published: false,
    },
  });
  const {
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      const imageUrls = await uploadImageToCloudinary(imageFiles[0]);
      const blogData = {
        ...data,
        author: "Umayer Emon",
        coverImage: imageUrls,
      };
      if (!imageFiles.length) {
        toast.error("Please upload a cover image.");
        return;
      } else {
        const res = await createBlog(blogData);

        if (res?.success) {
          reset();
          setImageFiles([]);
          setImagePreview([]);
          setTagsInput("");
          toast.success(res?.message);
        } else {
          toast.error(res?.message);
        }
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container mx-auto p-8 space-y-6 bg-[#112240] rounded-xl shadow-lg border border-[#233554]">
          <h1 className="text-3xl font-bold text-center text-[#00BFFF] mb-4">
            Create Blog
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[#00BFFF]">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        className="bg-[#0A192F] rounded-xl text-white border-[#233554] focus:border-[#00BFFF] focus:ring-[#00BFFF]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[#00BFFF]">
                      Slug
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        className="bg-[#0A192F] rounded-xl text-white border-[#233554] focus:border-[#00BFFF] focus:ring-[#00BFFF]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[#00BFFF]">
                      Content
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        className="bg-[#0A192F] rounded-xl text-white border-[#233554] focus:border-[#00BFFF] focus:ring-[#00BFFF]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[#00BFFF]">
                      Summary
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        className="bg-[#0A192F] rounded-xl text-white border-[#233554] focus:border-[#00BFFF] focus:ring-[#00BFFF]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#00BFFF]">
                      Tags (comma separated)
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="mt-1 bg-[#0A192F] text-white border-[#233554] focus:border-[#00BFFF] focus:ring-[#00BFFF]"
                        value={tagsInput}
                        onChange={(e) => {
                          setTagsInput(e.target.value);
                          // Optionally update form value live as user types
                          const techs = e.target.value
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean);
                          field.onChange(techs);
                        }}
                        onBlur={() => {
                          const techs = tagsInput
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean);
                          field.onChange(techs);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[#00BFFF]">
                      Category
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        className="bg-[#0A192F] rounded-xl text-white border-[#233554] focus:border-[#00BFFF] focus:ring-[#00BFFF]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <Label className="text-[#00BFFF]">Description</Label>
            <Controller
              control={form.control}
              name="description"
              rules={{ required: true }}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-full mt-1 bg-[#0A192F] text-white border border-[#233554] rounded-md px-3 py-2 focus:outline-none focus:border-[#00BFFF] focus:ring-2 focus:ring-[#00BFFF]"
                  placeholder="Enter project description"
                  rows={4}
                />
              )}
            />
            {errors.description && (
              <span className="text-destructive text-sm">
                Description is required
              </span>
            )}
          </div>
          <div className="flex flex-col items-center md:flex-row md:justify-between gap-4">
            <div className="flex flex-row gap-4 items-center">
              {imageFiles.length === 1 ? (
                <ImagePreviewer
                  imagePreview={imagePreview.slice(0, 4)}
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  className="flex flex-row gap-4 items-center"
                />
              ) : (
                <>
                  <ImageUploader
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                    label="Upload Blog Image (max 1)"
                  />
                </>
              )}
            </div>
            <div className="flex flex-col items-center md:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <Controller
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="accent-[#00BFFF] bg-[#0A192F] border-[#233554]"
                    />
                  )}
                />
                <Label className="text-[#00BFFF]">Featured</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Controller
                  control={form.control}
                  name="published"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="accent-[#00BFFF] bg-[#0A192F] border-[#233554]"
                    />
                  )}
                />
                <Label className="text-[#00BFFF]">Published</Label>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#00BFFF] hover:bg-blue-600 text-white font-semibold py-2 rounded transition cursor-pointer">
            {isSubmitting ? "Creating..." : "Create Blog"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
