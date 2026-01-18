import { Suspense } from "react";

import { Page } from "../_components/page-wrapper";
import { refreshAccount } from "@/lib/api/services/user";
import { getSessions } from "@/lib/api/services/sessions";
import { SessionsList } from "./_components/sessions-list";
import { SessionsListSkeleton } from "./_components/sessions-list-skeleton";

export const dynamic = "force-dynamic";

export default async function Sessions() {
  const sessions = await getSessions();

  if (sessions.error || !sessions.success || !sessions.response) {
    return (
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Lista de Sessões</h1>
        <p className="text-red-500">Erro ao carregar sessões.</p>
      </main>
    );
  }

  const user = await refreshAccount();

  if (user.error || !user.success || !user.response) {
    return (
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Configurações</h1>
        <p className="text-red-500">Erro ao carregar usuário.</p>
      </main>
    );
  }

  return (
    <Page className="flex flex-col! items-start! gap-6">
      <h1 className="text-xl font-bold">Lista de Sessões</h1>
      <Suspense fallback={<SessionsListSkeleton />}>
        <SessionsList
          sessions={sessions.response.sessions}
          user={user.response}
        />
      </Suspense>
    </Page>
  );
}
