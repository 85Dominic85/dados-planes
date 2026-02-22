"use client"

import { RotateCcw, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DICE, getFaceText } from "./dice-data"
import type { DiceResult } from "./roll-screen"

interface ResultScreenProps {
  results: DiceResult[]
  onRestart: () => void
}

export function ResultScreen({ results, onRestart }: ResultScreenProps) {
  const now = new Date()
  const dateStr = now.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const timeStr = now.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-950/30 px-4 py-1.5 text-sm text-rose-400">
          <Ticket className="h-4 w-4" />
          Plan definitivo
        </div>
        <h2 className="mt-3 text-2xl font-bold text-white">¡El destino ha hablado!</h2>
        <p className="mt-1 text-sm text-slate-500">
          {dateStr} · {timeStr}
        </p>
      </div>

      {/* Ticket card */}
      <div className="relative rounded-2xl border border-slate-700/60 bg-slate-900 overflow-hidden">
        {/* Ticket top notches */}
        <div className="absolute -top-3.5 left-8 h-7 w-7 rounded-full bg-slate-950" />
        <div className="absolute -top-3.5 right-8 h-7 w-7 rounded-full bg-slate-950" />

        {/* Ticket header */}
        <div className="bg-gradient-to-r from-rose-950/60 to-slate-900 px-6 pt-6 pb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-rose-400/70">
            Dados &amp; Planes · Tu noche perfecta
          </p>
        </div>

        {/* Dashed divider */}
        <div className="mx-6 border-t border-dashed border-slate-700/60" />

        {/* Results list */}
        <div className="flex flex-col divide-y divide-slate-800/80 px-6">
          {results.map((result) => {
            const dice = DICE.find((d) => d.id === result.diceId)!
            const faceText = getFaceText(result.diceId, result.face)
            return (
              <div key={result.diceId} className="flex items-center gap-4 py-4">
                {/* Emoji + name */}
                <div className="flex shrink-0 flex-col items-center gap-1">
                  <span className="text-xl">{dice.emoji}</span>
                </div>

                <div className="flex flex-1 min-w-0 flex-col gap-0.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {dice.name}
                  </span>
                  <span className="font-bold text-white leading-tight">{faceText}</span>
                </div>

                {/* Locked indicator */}
                {result.locked && (
                  <span className="shrink-0 rounded-md border border-amber-500/30 bg-amber-950/30 px-2 py-0.5 text-xs font-bold text-amber-400">
                    Fijo
                  </span>
                )}

                {/* Face number */}
                <span className="shrink-0 font-mono text-xs text-slate-600">
                  #{result.face}
                </span>
              </div>
            )
          })}
        </div>

        {/* Dashed divider */}
        <div className="mx-6 border-t border-dashed border-slate-700/60" />

        {/* Ticket footer */}
        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-xs text-slate-600">🎲 × {results.length}</span>
          <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
            ¡A disfrutar!
          </span>
          <span className="text-xs text-slate-600">D12</span>
        </div>

        {/* Ticket bottom notches */}
        <div className="absolute -bottom-3.5 left-8 h-7 w-7 rounded-full bg-slate-950" />
        <div className="absolute -bottom-3.5 right-8 h-7 w-7 rounded-full bg-slate-950" />
      </div>

      {/* Restart button */}
      <Button
        onClick={onRestart}
        variant="outline"
        size="lg"
        className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-500 hover:text-white transition-all"
      >
        <RotateCcw className="h-4 w-4" />
        Empezar de nuevo
      </Button>
    </div>
  )
}
