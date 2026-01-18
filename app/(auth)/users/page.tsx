import { Suspense } from "react";

import { getUsers } from "@/lib/api/services/user";
import { UserList } from "./_components/users-list";
import { UserListSkeleton } from "./_components/users-list-skeleton";
import { Page } from "../_components/page-wrapper";
import { CreateUserPopup } from "./_components/create-user-popup";

export default async function Home() {
  const users = await getUsers();

  if (users.error || !users.success || !users.response) {
    return (
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Lista de Usuários</h1>
        <p className="text-red-500">Erro ao carregar usuários.</p>
      </main>
    );
  }

  return (
    <Page className="flex flex-col! items-start! gap-6">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl font-bold">Lista de Usuários</h1>
      <CreateUserPopup />
      </div>

      <Suspense fallback={<UserListSkeleton />}>
        <UserList users={users.response.users} />
      </Suspense>
    </Page>
  );
}
