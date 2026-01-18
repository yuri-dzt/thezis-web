"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PlusCircle } from "iconoir-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { ApiError } from "@/lib/api/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createUser } from "@/lib/api/services/user";
import { PasswordInput } from "@/components/ui/password-input";
import { createUserSchema, CreateUserSchemaType } from "@/schemas/user/create";
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

export const CreateUserPopup = () => {
  const [open, setOpen] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  const form = useForm<CreateUserSchemaType>({
    resolver: zodResolver(createUserSchema),
  });

  async function onSubmit(props: CreateUserSchemaType) {
    try {
      await createUser(props);

      setOpen(false);
      toast.success("Usuário criado com sucesso!");
    } catch (error) {
      console.log("Error creating user: ", error);

      toast.error("Erro ao criar usuário", {
        description: (error as ApiError).message,
      });
    }
  }

  return (
    <div className="w-fit h-fit flex">
      <button
        onClick={() => setOpen(true)}
        className="w-fit h-fit flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all"
      >
        <PlusCircle className="w-5 h-5" />
      </button>

      <Dialog
        open={open}
        onOpenChange={(open) => {
          if (!open) setShowCloseConfirm(false);
          setOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Usuário</DialogTitle>
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
                    <FormLabel>E-mail:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full!">
                    <FormLabel>Senha:</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
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
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Você fez alterações que ainda não foram salvas. Tem certeza que
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
                  name: "",
                  email: "",
                  password:  "",
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
