/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ISkill } from "@/types";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { PTable } from "../shared/PTable";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";
import DeleteConfirmationModal from "../shared/deleteConfirmationModal";
import { deleteSkill } from "@/services/skills";

const AllSkillsTable = ({ skills }: { skills: ISkill[] }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const handleDelete = (data: ISkill) => {
    setSelectedId(data._id);
    setSelectedItem(data.skillName);
    setModalOpen(true);
  };
  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteSkill(selectedId);
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

  const columns: ColumnDef<ISkill>[] = [
    {
      accessorKey: "skillName",
      header: () => <div>Skill Name</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.logo}
            alt={row.original.skillName}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.skillName}</span>
        </div>
      ),
    },
    {
      accessorKey: "isDeleted",
      header: () => <div>Deleted</div>,
      cell: ({ row }) => (
        <div>
          {row.original.isDeleted ? (
            <span className="text-red-500">Yes</span>
          ) : (
            <span className="text-green-500">No</span>
          )}
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
            onClick={() => alert("Edit skill")}
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
      <PTable columns={columns} data={skills} />
      <DeleteConfirmationModal
        name={selectedItem}
        onConfirm={handleDeleteConfirm}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default AllSkillsTable;
