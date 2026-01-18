import { User as UserIcon } from "iconoir-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/types/entities/user";
import { Separator } from "@/components/ui/separator";
import { EditAccountInfoBtn } from "./edit-account-info-btn";
import { UserRole } from "@/types/enums/user-role";

interface AccountInfoCardProps {
  user: User;
}

export async function AccountInfoCard({ user }: AccountInfoCardProps) {
  return (
    <Card className="relative w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="w-5 h-5" />
          Informações Pessoais
        </CardTitle>
        <CardDescription>
          Atualize suas informações pessoais e dados de contato
        </CardDescription>
        <EditAccountInfoBtn user={user} />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Nome</span>
            <span className="font-normal text-sm">
              {user.name || "Não definido"}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">E-mail</span>
            <span className="font-normal text-sm">
              {user.email || "Não definido"}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Cargo</span>
            <span className="font-normal text-sm">
              {user.role === UserRole.ADMIN ? "Administrador" : "Usuário"}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Data de cadastro
            </span>
            <span className="font-normal text-sm">
              {new Date(user.created_at).toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
