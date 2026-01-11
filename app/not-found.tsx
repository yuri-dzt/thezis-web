import Link from "next/link";
import { OctagonAlertIcon } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="w-full h-screen max-h-screen grid place-items-center bg-white">
      <div className="w-[85%] lg:w-[30%] flex flex-col gap-8">
        <OctagonAlertIcon className="w-16.25 h-16.25 object-fit" />
        <div className="w-fit flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-black">
            🔍 Página não encontrada
          </h1>
          <span>
            Talvez o link esteja incorreto ou a página não exista mais.
            Verifique o endereço ou volte para a{" "}
            <Link href="/" className="font-bold text-primary underline">
              página inicial
            </Link>
            .
          </span>
        </div>
      </div>
    </div>
  );
}
