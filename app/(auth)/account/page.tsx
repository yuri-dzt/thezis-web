import { Page } from "../_components/page-wrapper";
import { refreshAccount } from "@/lib/api/services/user";
import { AccountInfoCard } from "./_components/account-info-card";

export const dynamic = "force-dynamic";

export default async function Home() {
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
      <h1 className="text-xl font-bold">Configurações</h1>
      <AccountInfoCard user={user.response} />
    </Page>
  );
}
