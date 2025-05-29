/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IBlog } from "@/types";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { PTable } from "../shared/PTable";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";
import DeleteConfirmationModal from "../shared/deleteConfirmationModal";
import { deleteBlog } from "@/services/blogs";

const AllBlogsTable = ({ blogs }: { blogs: IBlog[] }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const handleDelete = (data: IBlog) => {
    setSelectedId(data._id);
    setSelectedItem(data.title);
    setModalOpen(true);
  };
  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteBlog(selectedId);
        if (res?.success) {
          toast.success(res?.message);
          setModalOpen(false);
        } else {
          toast.error(res?.message);
        }
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  const columns: ColumnDef<IBlog>[] = [
    {
      accessorKey: "title",
      header: () => <div>Blog Title</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.coverImage}
            alt={row.original.title}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.title}</span>
        </div>
      ),
    },
    {
      accessorKey: "author",
      header: () => <div>Author</div>,
      cell: ({ row }) => <div>{row.original.author}</div>,
    },
    {
      accessorKey: "category",
      header: () => <div>Category</div>,
      cell: ({ row }) => <div>{row.original.category}</div>,
    },
    {
      accessorKey: "views",
      header: () => <div>Views</div>,
      cell: ({ row }) => <div>{row.original.views}</div>,
    },
    {
      accessorKey: "featured",
      header: () => <div>Featured</div>,
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.original.featured}
          readOnly
          className="cursor-not-allowed"
        />
      ),
    },
    {
      accessorKey: "isDeleted",
      header: () => <div>Deleted</div>,
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.original.isDeleted}
          readOnly
          className="cursor-not-allowed"
        />
      ),
    },
    {
      accessorKey: "likes",
      header: () => <div>Likes</div>,
      cell: ({ row }) => <div>{row.original.likes}</div>,
    },
    {
      accessorKey: "commentsCount",
      header: () => <div>Comments</div>,
      cell: ({ row }) => <div>{row.original.commentsCount}</div>,
    },
    {
      accessorKey: "published",
      header: () => <div>Published</div>,
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.original.published}
          readOnly
          className="cursor-not-allowed"
        />
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => <div>Created At</div>,
      cell: ({ row }) => (
        <div>{new Date(row.original.createdAt).toLocaleDateString()}</div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: () => <div>Updated At</div>,
      cell: ({ row }) => (
        <div>{new Date(row.original.updatedAt).toLocaleDateString()}</div>
      ),
    },

    {
      accessorKey: "action",
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => alert("Edit blog")}
            className="text-blue-500 hover:text-blue-700 cursor-pointer">
            <Edit size={20} />
          </button>
          <button
            onClick={() => handleDelete(row.original)}
            className="text-red-500 hover:text-red-700 cursor-pointer">
            <Trash size={20} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full bg-gray-300 rounded-md shadow-md p-4">
      <PTable columns={columns} data={blogs} />
      <DeleteConfirmationModal
        name={selectedItem}
        onConfirm={handleDeleteConfirm}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default AllBlogsTable;
