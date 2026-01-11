"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Bell,
  HalfMoon,
  LogOut,
  Menu,
  SidebarCollapse,
  SidebarExpand,
  SunLight,
} from "iconoir-react";

import { MENU_ITEMS } from "./sidebar";
import { SidebarLink } from "./sidebar-link";
import { cn, getInitials } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { getCurrentUser, logout } from "@/lib/api/services/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { logout } from "@/lib/api/services/auth";
import { refreshAccount } from "@/lib/api/services/user";

interface NavbarProps {
  refresh_token?: string;
}

export const Navbar = (props: NavbarProps) => {
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { open, setOpen, isMobile } = useSidebar();
  const { theme, setTheme } = useTheme();
  const { replace } = useRouter();

  useEffect(() => {
    async function getUserName() {
      const user = await refreshAccount();
      const userData = user.response;

      if (userData) {
        setUserName(userData.name);
      }
    }

    getUserName();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobileScreen(window.innerWidth < 512);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  function onThemeButtonClick() {
    const newTheme = theme && theme === "light" ? "dark" : "light";

    setTheme(newTheme);
  }

  async function onMenuLogoutButtonClick() {
    setConfirmLogoutOpen(!confirmLogoutOpen);
  }

  async function onConfirmLogoutClick() {
    try {
      await logout(props.refresh_token);

      replace("/login");
    } catch (error) {
      console.error(error);
      toast("Erro inesperado", {
        description: "Tente novamente mais tarde, por favor",
      });
    }
  }

  return (
    <nav className="w-full h-fit flex justify-between items-center px-7 py-5 border-b border-border z-20 bg-background">
      <div className="flex items-center gap-7">
        <button
          type="button"
          className={cn(
            "w-8 h-8 flex justify-center items-center rounded-md cursor-pointer",
            isMobile ? "bg-transparent" : "bg-accent"
          )}
          onClick={() => {
            setOpen(!open);
            setMenuOpen(true);
          }}
        >
          {isMobile ? (
            <Menu width={20} height={20} className="color-icon-color" />
          ) : (
            <>
              {open ? (
                <SidebarCollapse
                  width={16}
                  height={16}
                  className="text-sidebar-icon-color"
                />
              ) : (
                <SidebarExpand
                  width={16}
                  height={16}
                  className="text-sidebar-icon-color"
                />
              )}
            </>
          )}
        </button>
        {mounted && (
          <Link
            href="/users"
            className="w-fit h-fit relative cursor-pointer font-medium hidden lg:block"
          >
            STACK-BASE
          </Link>
        )}
      </div>
      {mounted && (
        <Link
          href="/users"
          className="w-fit h-fit relative cursor-pointer font-medium block lg:hidden"
        >
          STACK-BASE
        </Link>
      )}

      <div className="flex justify-end items-center gap-5">
        {mounted && (
          <button
            type="button"
            className=" w-9 h-9 hidden lg:flex justify-center items-center rounded-md cursor-pointer hover:bg-accent transition-all"
            onClick={onThemeButtonClick}
          >
            {theme && theme === "light" ? (
              <SunLight
                suppressHydrationWarning
                width={20}
                height={20}
                className="text-icon-color"
              />
            ) : (
              <HalfMoon
                suppressHydrationWarning
                width={20}
                height={20}
                className="text-icon-color"
              />
            )}
          </button>
        )}

        <button
          type="button"
          className="w-9 h-9 hidden lg:flex justify-center items-center rounded-md cursor-pointer hover:bg-accent transition-all"
        >
          <Bell width={20} height={20} className="text-icon-color" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-9 h-9 flex justify-center items-center cursor-pointer">
            <Avatar className="w-9 h-9">
              <AvatarFallback>{getInitials(userName)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="end">
            <DropdownMenuLabel>{userName.split(" ")[0]}</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  href="/platform/account"
                  className="w-full cursor-pointer"
                >
                  Minha conta
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <button
                  type="button"
                  className="w-full flex items-center gap-2 cursor-pointer"
                  onClick={onMenuLogoutButtonClick}
                >
                  <LogOut width={12} height={12} className="color-icon-color" />
                  <span>Sair da conta</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <AlertDialog open={confirmLogoutOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Certeza que deseja sair de sua conta?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Você precisará fazer login novamente para acessar sua conta. Tem
              certeza de que deseja continuar
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setConfirmLogoutOpen(false)}
              className="w-fit cursor-pointer"
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirmLogoutClick}
              className="w-fit cursor-pointer"
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Mobile menu */}
      {isMobileScreen && (
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetContent>
            <div className="w-full h-full flex flex-col items-center justify-center gap-5">
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className="w-full h-fit flex items-center gap-4 px-15 py-4"
                  onClick={() => setMenuOpen(false)}
                >
                  <SidebarLink {...item} />
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </nav>
  );
};
