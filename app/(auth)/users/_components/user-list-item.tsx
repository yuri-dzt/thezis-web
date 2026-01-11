"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Shield, MoreVertical, Edit, Trash2 } from "lucide-react";

import { User } from "@/types/entities/user";
import { Badge } from "@/components/ui/badge";
import { cn, getInitials } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/lib/api/services/user";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { updateUserSchema, UpdateUserSchemaType } from "@/schemas/user/update";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserRole } from "@/types/enums/user-role";

interface UserItemProps {
  user: User;
  index: number;
}

const getRoleColor = (role: UserRole) => {
  return role === UserRole.ADMIN
    ? "bg-gradient-to-br from-purple-500 to-pink-500"
    : "bg-gradient-to-br from-blue-500 to-cyan-500";
};

const UserItem = ({ user, index }: UserItemProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<UpdateUserSchemaType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      user_id: user.id,
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    },
  });

  async function onSubmit(data: UpdateUserSchemaType) {
    try {
      await updateUser(data);
      setIsDialogOpen(false);
      toast.success("Usuário atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar usuário", {
        description: "Não foi possível atualizar o usuário. Tente novamente.",
      });
    }
  }

  return (
    <>
      <Card
        className={cn(
          "group hover:shadow-md transition-all duration-200 w-full"
        )}
        style={{
          animation: `fadeIn 0.3s ease-out ${index * 0.05}s both`,
        }}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="relative">
                <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                  <AvatarFallback
                    className={`${getRoleColor(
                      user.role
                    )} text-white font-semibold`}
                  >
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                {user.role.toLowerCase() === UserRole.ADMIN && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-5 w-5 bg-background rounded-full flex items-center justify-center shadow-sm border border-border">
                    <Shield
                      className="h-3 w-3 text-purple-600"
                      fill="currentColor"
                    />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground truncate">
                    {user.name}
                  </h3>
                  <Badge
                    variant={
                      user.role.toLowerCase() === UserRole.ADMIN
                        ? "default"
                        : "secondary"
                    }
                    className={cn(
                      user.role.toLowerCase() === UserRole.ADMIN
                        ? "bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
                        : "",
                      "text-xs"
                    )}
                  >
                    {user.role.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setIsDialogOpen(true)}
                  className="cursor-pointer"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive cursor-pointer">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remover
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>
              Faça alterações nos dados do usuário aqui. Clique em salvar quando
              terminar.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="user_id"
                render={({ field }) => <input type="hidden" {...field} />}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Deixe em branco para manter a atual"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="w-full!">
                    <FormLabel>Função</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione a função" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">Usuário</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="w-[50%]!"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="w-[50%]!"
                  loading={form.formState.isSubmitting || false}
                >
                  Salvar alterações
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { UserItem };
