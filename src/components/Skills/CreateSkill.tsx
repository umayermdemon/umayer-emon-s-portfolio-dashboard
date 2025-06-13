"use client";

import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";

import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Input } from "../ui/input";
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
import ImageUploader from "../ui/core/ImageUploader";
import ImagePreviewer from "../ui/core/ImageUploader/ImagePreviewer";
import { CreateSkillValidationSchema } from "./CreateSkillValidationSchema";
import { createSkill } from "@/services/skills";
import { toast } from "sonner";
import { uploadImageToCloudinary } from "../shared/uploadImageToCloudinary";

export default function CreateSkillPage() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const form = useForm({
    resolver: zodResolver(CreateSkillValidationSchema),
  });
  const {
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const imageUrl = await uploadImageToCloudinary(imageFiles[0]);
    const skillData = {
      skillName: data.skillName,
      description: data.description,
      logo: imageUrl,
    };
    try {
      const res = await createSkill(skillData);
      if (res?.success) {
        reset({
          skillName: "",
          description: "",
        });
        setImageFiles([]);
        setImagePreview([]);
        toast.success(res?.message);
      } else {
        toast.error(res?.errorSources?.[0]?.message);
      }
    } catch (error) {
      console.error("Error creating skill:", error);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container mx-auto p-8 space-y-6 bg-[#112240] rounded-xl shadow-lg border border-[#233554]">
          <h1 className="text-3xl font-bold text-center text-[#00BFFF] mb-4">
            Create Skill
          </h1>

          <div>
            <FormField
              control={form.control}
              name="skillName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-[#00BFFF]">
                    Skill Name
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
                  placeholder="Enter skill description"
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
                  imagePreview={imagePreview}
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  className="flex flex-row gap-4 items-center"
                />
              ) : (
                <ImageUploader
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  label="Upload Skill Image"
                />
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#00BFFF] hover:bg-blue-600 text-white font-semibold py-2 rounded transition cursor-pointer">
            {isSubmitting ? "Creating..." : "Create Skill"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
