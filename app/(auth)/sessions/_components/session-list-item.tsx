"use client";

import {
  Calendar,
  Clock,
  MoreVertical,
  Shield,
  Trash2,
  User as UserIcon,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Session } from "@/types/entities/session";
import { User } from "@/types/entities/user";
import { deleteSession } from "@/lib/api/services/sessions";

interface SessionItemProps {
  session: Session;
  index: number;
  user: User;
}

const SessionItem = ({ session, index, user }: SessionItemProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const expiresAt = new Date(session.expires_at);
  const createdAt = new Date(session.created_at);
  const now = new Date();
  const isExpired = expiresAt < now;
  const daysUntilExpiry = Math.ceil(
    (expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );

  const getExpiryStatus = () => {
    if (isExpired) return { variant: "destructive" as const, text: "Expirada" };
    if (daysUntilExpiry <= 1)
      return { variant: "secondary" as const, text: "Expira em breve" };
    return { variant: "default" as const, text: "Ativa" };
  };

  const status = getExpiryStatus();

  const handleDelete = async () => {
    await deleteSession(session.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <Card
        className="group hover:shadow-lg hover:border-primary/30 transition-all duration-200 w-full"
        style={{
          animation: `fadeIn 0.3s ease-out ${index * 0.05}s both`,
        }}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Sessão #{index + 1}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <UserIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {user.name}
                      </p>
                    </div>
                  </div>
                </div>
                <Badge variant={status.variant}>{status.text}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Criada em</p>
                    <p className="text-sm font-medium text-foreground">
                      {createdAt.toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Expira em</p>
                    <p
                      className={cn(
                        "text-sm font-medium",
                        isExpired ? "text-destructive" : "text-foreground",
                      )}
                    >
                      {isExpired
                        ? "Expirada"
                        : `${expiresAt.toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })} (${daysUntilExpiry}d)`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="text-destructive cursor-pointer"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remover
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover sessão?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A sessão será permanentemente
              removida e o usuário precisará fazer login novamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="w-[50%]">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="w-[50%] bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export { SessionItem };
