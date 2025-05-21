"use client";

import * as React from "react";
import {
  BrainCircuit,
  FilePlus,
  FolderKanban,
  ListOrdered,
  NotebookText,
  PenLine,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import Logo from "../shared/logo";

const data = {
  dashboard: [
    {
      title: "Dashboard",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
    },
  ],
  projects: [
    {
      title: "Create Project",
      url: "/projects/create-project",
      icon: FilePlus, // New file or creation icon
    },
    {
      title: "All Projects",
      url: "/projects/all-projects",
      icon: FolderKanban, // Project board icon
    },
  ],
  blogs: [
    {
      title: "Create Blog",
      url: "/blogs/create-blog",
      icon: PenLine, // Writing icon
    },
    {
      title: "All Blogs",
      url: "/blogs/all-blogs",
      icon: NotebookText, // Blog list or document icon
    },
  ],
  skills: [
    {
      title: "Create Skill",
      url: "/skills/create-skill",
      icon: BrainCircuit, // Represents knowledge/skills
    },
    {
      title: "All Skills",
      url: "/skills/all-skills",
      icon: ListOrdered, // List representation
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          asChild
          className="hover:bg-none hover:bg-[#0f172a]">
          <div className="px-6 hover:bg-none">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
              <Logo />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <h1 className="font-bold text-xl text-white">Umayer Emon</h1>
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
