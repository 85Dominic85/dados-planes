import Link from "next/link";
import { Dices } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <Dices className="h-16 w-16 text-rose-500/60" />
        </div>
        <h1 className="mb-2 text-4xl font-bold text-white">404</h1>
        <p className="mb-6 text-slate-400">
          Esta página no existe.
        </p>
        <Button asChild className="bg-rose-600 hover:bg-rose-700">
          <Link href="/">Volver al juego</Link>
        </Button>
      </div>
    </div>
  );
}
