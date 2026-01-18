"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { EditPencil } from "iconoir-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { ApiError } from "@/lib/api/client";
import { User } from "@/types/entities/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/lib/api/services/user";
import { updateUserSchema, UpdateUserSchemaType } from "@/schemas/user/update";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditAccountInfoBtnProps {
  user: User;
}

export const EditAccountInfoBtn = ({ user }: EditAccountInfoBtnProps) => {
  const [open, setOpen] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  const form = useForm<UpdateUserSchemaType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      user_id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.toLowerCase(),
    },
  });

  async function onSubmit(props: UpdateUserSchemaType) {
    try {
      await updateUser(props);

      setOpen(false);
      toast.success("Informações alteradas com sucesso");
    } catch (error) {
      console.log("Error updating user info: ", error);

      toast.error("Erro ao atualizar informações", {
        description: (error as ApiError).message,
      });
    }
  }

  return (
    <div className="w-fit h-fit flex absolute top-3 right-2">
      <button
        onClick={() => setOpen(true)}
        className="w-fit h-fit flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all"
      >
        <EditPencil className="w-4 h-4" />
      </button>

      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            const values = form.getValues();

            const nameChanged = values.name !== (user?.name ?? "");
            const emailChanged = values.email !== (user?.email ?? "");
            const roleChanged = values.role !== (user?.role ?? "");

            const hasChanges = nameChanged || emailChanged || roleChanged;

            if (hasChanges) {
              setShowCloseConfirm(true);
              return;
            }
          }
          setOpen(nextOpen);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar informações</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full h-fit flex flex-col items-start gap-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full!">
                    <FormLabel>Nome:</FormLabel>
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
                  <FormItem className="w-full!">
                    <FormLabel>Nome:</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
              
              <DialogFooter className="w-full flex-row justify-end">
                <DialogClose asChild>
                  <Button className="w-fit" variant="outline">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  loading={form.formState.isSubmitting}
                  className="w-fit"
                  type="submit"
                >
                  Salvar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showCloseConfirm} onOpenChange={setShowCloseConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Descartar alterações?</AlertDialogTitle>
            <AlertDialogDescription>
              Você fez mudanças que ainda não foram salvas. Tem certeza que
              deseja fechar sem salvar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="w-fit cursor-pointer">
              Voltar
            </AlertDialogCancel>
            <AlertDialogAction
              className="w-fit"
              onClick={() => {
                setShowCloseConfirm(false);
                setOpen(false);
                form.reset({
                  name: user?.name ?? "",
                  email: user?.email ?? "",
                  role: user?.role ?? "",
                });
              }}
            >
              Sim, fechar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
