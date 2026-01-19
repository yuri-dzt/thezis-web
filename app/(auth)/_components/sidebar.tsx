"use client";

import Link from "next/link";
import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";
import { Users, MonitorSpeaker } from "lucide-react";

import { SidebarLink } from "./sidebar-link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Route } from "next";

export interface SidebarItemData {
  title: string;
  url: Route;
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export const MENU_ITEMS: SidebarItemData[] = [
  {
    title: "Usuários",
    url: "/users",
    icon: Users,
  },
  {
    title: "Sessões",
    url: "/sessions",
    icon: MonitorSpeaker,
  },
];

export const AppSidebar = () => {
  return (
    <Sidebar className="h-full" variant="inset" collapsible="icon">
      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-7">
              {MENU_ITEMS.map((item) => (
                <SidebarMenuItem className="px-3" key={item.title}>
                  <SidebarMenuButton
                    className="h-9 gap-5 hover:bg-transparent"
                    asChild
                  >
                    <Link href={item.url}>
                      <SidebarLink {...item} />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
