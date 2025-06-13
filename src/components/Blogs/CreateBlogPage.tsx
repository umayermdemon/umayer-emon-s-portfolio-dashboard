/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { useRef, useState } from "react";
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
import { CreateBlogValidationSchema } from "./CreateBlogValidationSchema";
import ImageUploader from "../ui/core/ImageUploader";
import ImagePreviewer from "../ui/core/ImageUploader/ImagePreviewer";
import { z } from "zod";
import { createBlog } from "@/services/blogs";
import { toast } from "sonner";
import TextEditor from "../ui/core/BlogTextEditor/TextEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Copy } from "lucide-react";
import { uploadImageToCloudinary } from "../shared/uploadImageToCloudinary";
import { Label } from "../ui/label";
type FormSchema = z.infer<typeof CreateBlogValidationSchema>;
export default function CreateBlogPage() {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [content, setContent] = useState<string>("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const form = useForm<FormSchema>({
    defaultValues: {
      title: "",
      category: "",
    },
  });
  const {
    reset,
    formState: { isSubmitting },
  } = form;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = async () => {
    if (!imageFiles.length) return;
    setUploading(true);
    try {
      const url = await uploadImageToCloudinary(imageFiles[0]);
      setUploadedUrl(url);
      setImagePreview([url]);
      toast.success("Image uploaded!");
    } catch (e) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };
  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      const blogData = {
        ...data,
        author: "Umayer Emon",
        content,
      };

      const res = await createBlog(blogData);

      if (res?.success) {
        reset();
        setContent("");
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
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

          {/* title */}
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
          </div>
          {/* category */}
          <div className="flex flex-col md:flex-row gap-4">
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
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <SelectTrigger className="bg-[#0A192F] rounded-xl text-white border-[#233554] focus:border-[#00BFFF] focus:ring-[#00BFFF] w-full py-2 px-3 cursor-pointer">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-300">
                          <SelectItem value="web-development">
                            Web Development
                          </SelectItem>
                          <SelectItem value="mobile-development">
                            Mobile Development
                          </SelectItem>
                          <SelectItem value="data-science">
                            Data Science
                          </SelectItem>
                          <SelectItem value="devops">DevOps</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="lifestyle">Lifestyle</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="health">Health</SelectItem>
                          <SelectItem value="travel">Travel</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* content */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <FormLabel className="font-bold text-[#00BFFF] mb-2">
                Content
              </FormLabel>
              <TextEditor content={content} onChange={setContent} />
            </div>
          </div>
          <div className="flex flex-col items-center md:flex-row gap-4">
            <h1 className="text-white text-base font-semibold">
              Upload Image & Copy Url
            </h1>
            <div className="flex flex-row gap-4 items-center">
              {/* Show preview if image selected and not uploaded */}
              <div className="grid w-full max-w-sm items-center gap-3 rounded-xl bg-white">
                <Input
                  id="picture"
                  type="file"
                  className="rounded-xl"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFiles([file]);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImagePreview([reader.result as string]);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
            </div>
            {!uploadedUrl ? (
              <div>
                <Button
                  disabled={uploading || imageFiles.length === 0}
                  onClick={handleImageUpload}
                  className="w-full bg-[#00BFFF] hover:bg-blue-600 text-white font-semibold py-2 rounded transition cursor-pointer">
                  {uploading ? "Uploading..." : "Upload"}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  value={uploadedUrl}
                  readOnly
                  className="w-64 text-xs text-white"
                />
                <Button
                  type="button"
                  size="icon"
                  className="cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(uploadedUrl);
                    toast.success("Image link copied!");
                    setUploadedUrl(null);
                    setImageFiles([]);
                    setImagePreview([]);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}>
                  <Copy size={16} />
                </Button>
              </div>
            )}
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
