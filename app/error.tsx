"use client";

import Link from "next/link";
import { OctagonAlertIcon } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="w-full h-screen max-h-screen grid place-items-center bg-white">
      <div className="w-[85%] lg:w-[30%] flex flex-col gap-8">
        <OctagonAlertIcon className="w-16.25 h-16.25 object-fit" />
        <div className="w-fit flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-black">
            ⚠️ Algo deu errado por aqui
          </h1>
          <span>
            Estamos enfrentando um problema interno. Já estamos cuidando disso —
            tente novamente em alguns instantes ou entre em contato com o
            suporte.
          </span>
          <Link href="/" className="font-bold text-primary underline">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
