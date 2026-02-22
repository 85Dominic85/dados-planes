"use client"

import { DICE } from "./dice-data"
import { Button } from "@/components/ui/button"
import { Dices } from "lucide-react"

interface SetupScreenProps {
  selectedDice: number[]
  onToggleDice: (id: number) => void
  onSelectAll: () => void
  onRoll: () => void
}

export function SetupScreen({
  selectedDice,
  onToggleDice,
  onSelectAll,
  onRoll,
}: SetupScreenProps) {
  const allSelected = selectedDice.length === DICE.length

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Dados & Planes
        </h1>
        <p className="mt-2 text-slate-400">
          Selecciona qué dados quieres tirar y deja que el azar decida.
        </p>
      </div>

      {/* Dice selector list */}
      <div className="flex flex-col gap-3">
        {DICE.map((dice) => {
          const isSelected = selectedDice.includes(dice.id)
          return (
            <button
              key={dice.id}
              onClick={() => onToggleDice(dice.id)}
              className={[
                "flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200",
                isSelected
                  ? "border-rose-500/60 bg-slate-800/80 shadow-lg shadow-rose-900/20"
                  : "border-slate-700/60 bg-slate-900/60 hover:border-slate-600 hover:bg-slate-800/60",
              ].join(" ")}
            >
              {/* Checkbox visual */}
              <div
                className={[
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                  isSelected
                    ? "border-rose-500 bg-rose-500"
                    : "border-slate-600 bg-transparent",
                ].join(" ")}
              >
                {isSelected && (
                  <svg
                    className="h-3 w-3 text-white"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="2,6 5,9 10,3" />
                  </svg>
                )}
              </div>

              {/* Emoji */}
              <span className="text-2xl">{dice.emoji}</span>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p
                  className={[
                    "font-semibold transition-colors",
                    isSelected ? "text-white" : "text-slate-300",
                  ].join(" ")}
                >
                  {dice.name}
                </p>
                <p className="text-sm text-slate-500 truncate">
                  {dice.description}
                </p>
              </div>

              {/* D12 badge */}
              <span
                className={[
                  "shrink-0 rounded-md px-2 py-0.5 text-xs font-mono font-bold border transition-colors",
                  isSelected
                    ? "border-rose-500/40 text-rose-400 bg-rose-950/40"
                    : "border-slate-700 text-slate-500 bg-slate-900",
                ].join(" ")}
              >
                D12
              </span>
            </button>
          )
        })}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3 pt-2">
        <button
          onClick={onSelectAll}
          className="py-2 text-sm text-slate-400 underline underline-offset-4 hover:text-rose-400 active:text-rose-400 transition-colors"
        >
          {allSelected ? "Deseleccionar todos" : "Seleccionar todos"}
        </button>

        <Button
          onClick={onRoll}
          disabled={selectedDice.length === 0}
          size="lg"
          className="w-full bg-rose-600 text-white hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-rose-900/40 transition-all duration-200 text-base font-semibold"
        >
          <Dices className="h-5 w-5" />
          Tirar Dados
          {selectedDice.length > 0 && (
            <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">
              {selectedDice.length}
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}
