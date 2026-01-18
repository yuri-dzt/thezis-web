import { cookies } from "next/headers";

import { Navbar } from "./_components/navbar";
import { AppSidebar } from "./_components/sidebar";
import { refreshAccount } from "@/lib/api/services/user";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  
  const user = await refreshAccount();
  if(!user.success || !user.response) {
    return (
      <div></div>
    )
  }

  return (
    <SidebarProvider>
      <div className="w-full h-dvh flex flex-col">
        <Navbar refresh_token={refreshToken} user={user.response} />
        <div className="flex flex-1">
          <AppSidebar />
          <div className="flex-1 h-[calc(100vh-77px)] overflow-auto">
            <SidebarInset className="w-full h-full flex-1 rounded-none! bg-background! m-0!">
              <div className="w-full h-full overflow-auto">{children}</div>
            </SidebarInset>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
