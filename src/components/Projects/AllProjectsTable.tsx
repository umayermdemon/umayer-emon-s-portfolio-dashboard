/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IProject } from "@/types";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { PTable } from "../shared/PTable";
import { ColumnDef } from "@tanstack/react-table";
import { deleteProject } from "@/services/projects";
import { useState } from "react";
import { toast } from "sonner";
import DeleteConfirmationModal from "../shared/deleteConfirmationModal";

const AllProjectsTable = ({ projects }: { projects: IProject[] }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const handleDelete = (data: IProject) => {
    setSelectedId(data._id);
    setSelectedItem(data.title);
    setModalOpen(true);
  };
  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteProject(selectedId);
        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  const columns: ColumnDef<IProject>[] = [
    {
      accessorKey: "title",
      header: () => <div>Project Name</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.images[0]}
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
      accessorKey: "liveLinks",
      header: () => <div>Live Links</div>,
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-2">
          <a
            href={row.original.liveLinks}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs">
            Visit
          </a>
        </div>
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
            onClick={() => alert("Edit project")}
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
    <div className="w-full text-white rounded-md shadow-md p-4">
      <PTable columns={columns} data={projects} />
      <DeleteConfirmationModal
        name={selectedItem}
        onConfirm={handleDeleteConfirm}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default AllProjectsTable;
