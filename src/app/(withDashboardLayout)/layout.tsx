import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <SidebarTrigger className="-ml-1 text-[#00bfff] hover:bg-[#00bfff] cursor-pointer" />
      {children}
    </SidebarProvider>
  );
}
