"use client";

import { LogOut, type LucideIcon } from "lucide-react";

import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
type MenuItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
};

type MenuData = {
  dashboard: MenuItem[];
  projects: MenuItem[];
  blogs: MenuItem[];
  skills: MenuItem[];
};

export function NavMain({ items }: { items: MenuData }) {
  const pathName = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu className="my-4">
        {items.dashboard.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className="p-6 rounded-2xl text-white hover:bg-[#00BFFF] hover:text-black">
                <Link
                  href={item.url}
                  className={` ${
                    item.url === pathName
                      ? "bg-[#00BFFF] p-4 text-white text-[1rem]"
                      : "text-[1rem] p-4"
                  }`}>
                  {item.icon && <item.icon />}
                  <span className="font-semibold">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
      <SidebarGroupLabel className="text-gray-400 text-base mb-4">
        Manage Projects
      </SidebarGroupLabel>
      <SidebarMenu className="">
        {items.projects.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className="p-6 rounded-2xl text-white hover:bg-[#00BFFF] hover:text-black">
                <Link
                  href={item.url}
                  className={` ${
                    item.url === pathName
                      ? "bg-[#00BFFF] p-4 text-black text-[1rem]"
                      : "text-[1rem] p-4"
                  }`}>
                  {item.icon && <item.icon />}
                  <span className="font-semibold">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
      <SidebarGroupLabel className="text-gray-400 text-base my-4">
        Manage Blogs
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.blogs.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className="p-6 rounded-2xl text-white hover:bg-[#00BFFF] hover:text-black">
                <Link
                  href={item.url}
                  className={` ${
                    item.url === pathName
                      ? "bg-[#00BFFF] p-4 text-black text-[1rem]"
                      : "text-[1rem] p-4"
                  }`}>
                  {item.icon && <item.icon />}
                  <span className="font-semibold">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
      <SidebarGroupLabel className="text-gray-400 text-base my-4">
        Manage Skills
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.skills.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className="p-6 rounded-2xl text-white hover:bg-[#00BFFF] hover:text-black">
                <Link
                  href={item.url}
                  className={` ${
                    item.url === pathName
                      ? "bg-[#00BFFF] p-4 text-black text-[1rem]"
                      : "text-[1rem] p-4"
                  }`}>
                  {item.icon && <item.icon />}
                  <span className="font-semibold">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
      <SidebarGroupLabel className="text-gray-400 text-base mt-4">
        Action
      </SidebarGroupLabel>
      <Collapsible>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Logout"
            className="px-6 rounded-2xl text-white hover:bg-[#00BFFF] hover:text-black cursor-pointer font-semibold text-[1rem]">
            <LogOut />
            Log out
          </SidebarMenuButton>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarGroup>
  );
}
