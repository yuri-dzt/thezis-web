import { Toaster } from "sonner";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const satoshiFont = localFont({
  src: [
    {
      path: "../public/fonts/satoshi/light.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/satoshi/regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/satoshi/medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/satoshi/bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/satoshi/black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Stack Base Frontend | Starter Kit",
  description:
    "Comece seu projeto frontend rapidamente com o Stack Base Frontend, um starter kit completo e organizado para aplicações modernas.",
  openGraph: {
    title: "Stack Base Frontend | Starter Kit",
    description:
      "Acelere o desenvolvimento do seu frontend com um kit pronto, estruturado e fácil de personalizar.",
    siteName: "Stack Base",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stack Base Frontend | Starter Kit",
    description:
      "Starter kit pronto para você começar seu frontend com estrutura moderna e boas práticas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${satoshiFont.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
