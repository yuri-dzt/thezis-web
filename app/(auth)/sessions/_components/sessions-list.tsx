import { Users } from "lucide-react";

import { User } from "@/types/entities/user";
import { SessionItem } from "./session-list-item";
import { Session } from "@/types/entities/session";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface SessionsListProps {
  sessions: Session[];
  user: User;
}

export const SessionsList = ({ sessions, user }: SessionsListProps) => {
  if (!sessions || sessions.length < 1) {
    return (
      <Empty className="w-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Users className="h-8 w-8" />
          </EmptyMedia>
          <EmptyTitle>Nenhuma sessão encontrada</EmptyTitle>
          <EmptyDescription>
            Não há sessões ativas no momento. As sessões serão exibidas aqui
            quando fizer login.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full">
      {sessions.map((session, index) => (
        <SessionItem
          key={session.id}
          session={session}
          index={index}
          user={user}
        />
      ))}
    </div>
  );
};
