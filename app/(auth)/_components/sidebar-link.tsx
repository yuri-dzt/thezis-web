"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import type { SidebarItemData } from "./sidebar";

export const SidebarLink = (props: SidebarItemData) => {
  const pathname = usePathname();

  return (
    <>
      <props.icon
        width={20}
        height={20}
        className={cn(
          "w-5! h-5! text-sidebar-icon-color",
          pathname === props.url && "text-primary"
        )}
      />
      <span
        className={cn(
          "text-xl lg:text-xs font-normal text-sidebar-icon-color",
          pathname === props.url && "text-sidebar-selected-text font-medium"
        )}
      >
        {props.title}
      </span>
    </>
  );
};
