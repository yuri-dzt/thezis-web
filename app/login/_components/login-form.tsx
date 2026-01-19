"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/api/services/auth";
import { PasswordInput } from "@/components/ui/password-input";
import { loginSchema, type LoginSchemaType } from "@/schemas/auth/login";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

export default function LoginForm() {
  const { replace } = useRouter();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginSchemaType) {
    try {
      await login(data);

      replace("/users");
    } catch (error) {
      toast.error("Erro ao autenticar", {
        description: "E-mail ou senha inválidos.",
      });
    }
  }

  return (
    <Card className="w-full max-w-md border-border/50 bg-card shadow-lg z-10">
      <CardHeader className="space-y-2 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center ring-1 ring-primary/20">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <div className="h-px flex-1 bg-linear-to-r from-border via-primary/20 to-transparent" />
        </div>

        <CardTitle className="text-2xl font-semibold tracking-tight text-foreground">
          Acessar sua conta
        </CardTitle>

        <CardDescription className="text-muted-foreground">
          Entre com suas credenciais para continuar
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    E-mail
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type="email"
                        placeholder="seu@email.com"
                        className="h-11 bg-background"
                      />
                    </div>
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
                  <FormLabel className="text-foreground font-medium">
                    Senha
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <PasswordInput
                        {...field}
                        placeholder="••••••••"
                        className="h-11 bg-background"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end pt-1">
              <button
                type="button"
                className="text-sm text-primary hover:text-primary/80 transition-colors font-medium cursor-pointer"
              >
                Esqueceu a senha?
              </button>
            </div>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full h-11 mt-2 group"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
