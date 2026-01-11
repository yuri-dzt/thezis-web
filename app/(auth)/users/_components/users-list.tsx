// import { Mail } from "lucide-react";

// import { UserItem } from "./user-list-item";
// import { User } from "@/types/entities/user";
// import { Card, CardContent } from "@/components/ui/card";

// interface UserListProps {
//   users: User[];
// }

// export const UserList = ({ users }: UserListProps) => {
//   if (!users || users.length === 0)
//     return (
//       <Card className="border-dashed">
//         <CardContent className="flex flex-col items-center justify-center py-16 px-4">
//           <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
//             <Mail className="w-10 h-10 text-muted-foreground" />
//           </div>
//           <h3 className="text-lg font-semibold text-foreground mb-2">
//             Nenhum usuário encontrado
//           </h3>
//           <p className="text-sm text-muted-foreground">
//             Tente ajustar seus filtros de busca
//           </p>
//         </CardContent>
//       </Card>
//     );

//   return (
//     <div className="flex flex-col items-center justify-center gap-3 w-ull">
//       {users.map((user, index) => (
//         <UserItem key={user.id} user={user} index={index} />
//       ))}
//     </div>
//   );
// };

import { UserItem } from "./user-list-item";
import { User } from "@/types/entities/user";
import { Users, Plus, Filter } from "lucide-react";
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
