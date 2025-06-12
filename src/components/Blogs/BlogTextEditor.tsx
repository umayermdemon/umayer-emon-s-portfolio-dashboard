"use client";

import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import TextEditor from "../ui/core/BlogTextEditor/TextEditor";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createBlog } from "@/services/blogs";

const BlogTextEditor = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(title, content);
    const blogData = {
      title,
      content,
      slug: title,
      author: 1,
    };

    try {
      const result = await createBlog(blogData);
      console.log(result);
      if (result.success) {
        toast("Blog created successfully");
        router.push("/");
      } else {
        toast("Failed to create blog");
      }
    } catch (error) {
      console.error("Failed to create blog:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="container mx-auto p-8 space-y-6 bg-[#112240] rounded-xl shadow-lg border border-[#233554]">
      <h1 className="text-3xl font-bold text-center text-[#00BFFF] mb-4">
        Create Blog
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-center text-lg font-semibold text-white mb-6">
            Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className="bg-slate-50"
            required
          />
        </div>

        <div>
          <label className="text-center text-lg font-semibold text-white mb-6">
            Content
          </label>
          <TextEditor content={content} onChange={setContent} />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {/* {isSubmitting ? "Creating..." : "Create blog"} */}
          Create Blog
        </Button>
      </form>
    </div>
  );
};

export default BlogTextEditor;
