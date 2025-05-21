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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
import { CreateProjectValidationSchema } from "./CreateProjectValidationSchema";
import ImageUploader from "../ui/core/ImageUploader";
import ImagePreviewer from "../ui/core/ImageUploader/ImagePreviewer";

export default function CreateProjectPage() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const form = useForm({
    resolver: zodResolver(CreateProjectValidationSchema),
  });
  const {
    reset,
    formState: { errors },
  } = form;
  console.log({ imageFiles, imagePreview });
  const [frontendInput, setFrontendInput] = useState("");
  const [backendInput, setBackendInput] = useState("");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("Submitted project:", data);
    reset();
  };

  return (
    <div className="min-h-screen py-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container mx-auto p-8 space-y-6 bg-[#112240] rounded-xl shadow-lg border border-[#233554]">
          <h1 className="text-3xl font-bold text-center text-[#00BFFF] mb-4">
            Create Project
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
                name="liveLinks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[#00BFFF]">
                      Live Links
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
                name="clientRepo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[#00BFFF]">
                      Client Repo
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
                name="serverRepo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[#00BFFF]">
                      Server Repo
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
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[#00BFFF]">
                      Project Duration
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
                name="demoVideo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[#00BFFF]">
                      Demo Video URL
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
                name="frontendTechnologies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#00BFFF]">
                      Frontend Technologies (comma separated)
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="mt-1 bg-[#0A192F] text-white border-[#233554] focus:border-[#00BFFF] focus:ring-[#00BFFF]"
                        value={frontendInput}
                        onChange={(e) => {
                          setFrontendInput(e.target.value);
                          // Optionally update form value live as user types
                          const techs = e.target.value
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean);
                          field.onChange(techs);
                        }}
                        onBlur={() => {
                          const techs = frontendInput
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
                name="backendTechnologies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#00BFFF]">
                      Backend Technologies (comma separated)
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="mt-1 bg-[#0A192F] text-white border-[#233554] focus:border-[#00BFFF] focus:ring-[#00BFFF]"
                        value={backendInput}
                        onChange={(e) => {
                          setBackendInput(e.target.value);
                          const techs = e.target.value
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean);
                          field.onChange(techs);
                        }}
                        onBlur={() => {
                          const techs = backendInput
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
              {imageFiles.length >= 4 ? (
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
                    label="Upload Project Images (max 4)"
                  />
                  <ImagePreviewer
                    imagePreview={imagePreview}
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                    className="flex flex-row gap-4 items-center"
                  />
                </>
              )}
            </div>
            <div className="flex flex-col items-center md:flex-row gap-4">
              <div>
                <Label className="text-[#00BFFF]">Status</Label>
                <Controller
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="border-[#233554] bg-[#0A192F] text-white focus:border-[#00BFFF] focus:ring-[#00BFFF]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#112240] text-white">
                        <SelectItem value="planned">Planned</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
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
            </div>
          </div>

          {/* <div>
            <Label className="text-[#00BFFF]">
              Team Members (comma separated)
            </Label>
            <Input
              className="mt-1 bg-[#0A192F] text-white border-[#233554] focus:border-[#00BFFF] focus:ring-[#00BFFF]"
              value={teamInput}
              onChange={(e) => setTeamInput(e.target.value)}
              onBlur={() => {
                const members = teamInput
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean);
                form.setValue("teamMembers", members);
              }}
            />
          </div> */}

          <Button
            type="submit"
            className="w-full bg-[#00BFFF] hover:bg-blue-600 text-white font-semibold py-2 rounded transition cursor-pointer">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
