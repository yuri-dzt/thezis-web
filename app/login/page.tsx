import LoginForm from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4">
      {/* Grid Pattern - Sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-size-[3rem_3rem] dark:bg-[linear-gradient(to_right,#1e293b40_1px,transparent_1px),linear-gradient(to_bottom,#1e293b40_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* Gradient Orbs - Minimalistas */}
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-accent-foreground/5 dark:bg-accent-foreground/10 rounded-full blur-3xl" />

      {/* Decorative Elements - Discretos */}
      <div className="absolute top-1/4 left-[10%] w-2 h-2 rounded-full bg-primary/30 animate-pulse" />
      <div className="absolute top-1/3 right-[15%] w-1.5 h-1.5 rounded-full bg-primary/20 animate-pulse [animation-delay:400ms]" />
      <div className="absolute bottom-1/3 left-[20%] w-2.5 h-2.5 rounded-full bg-primary/25 animate-pulse [animation-delay:800ms]" />
      <div className="absolute bottom-1/4 right-[12%] w-1.5 h-1.5 rounded-full bg-primary/20 animate-pulse [animation-delay:1200ms]" />

      <LoginForm />

      {/* Bottom Brand Text - Opcional */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-sm text-muted-foreground">
          Desenvolvido com{" "}
          <span className="text-primary font-medium">tecnologia de ponta</span>
        </p>
      </div>
    </div>
  );
}
