import { Users, Plus } from "lucide-react";
import { UserItem } from "./user-list-item";
import { User } from "@/types/entities/user";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface UserListProps {
  users: User[];
}

export const UserList = ({ users }: UserListProps) => {
  if (!users || users.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Users />
          </EmptyMedia>
          <EmptyTitle>Nenhum usuário encontrado</EmptyTitle>
          <EmptyDescription>
            Não há usuários cadastrados no momento ou nenhum resultado
            corresponde aos seus filtros de busca.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Usuário
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full">
      {users.map((user, index) => (
        <UserItem key={user.id} user={user} index={index} />
      ))}
    </div>
  );
};
