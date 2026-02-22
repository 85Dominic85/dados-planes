"use client"

import { useEffect, useState } from "react"
import { DICE, getFaceText, rollFace } from "./dice-data"
import { Button } from "@/components/ui/button"
import { Lock, LockOpen, RotateCcw, Check } from "lucide-react"

export interface DiceResult {
  diceId: number
  face: number    // 1–12
  locked: boolean
}

interface RollScreenProps {
  results: DiceResult[]
  lockedDiceId: number | null
  hasRerolled: boolean
  isAnimating: boolean
  onLock: (diceId: number) => void
  onReroll: (newResults: DiceResult[]) => void
  onAccept: () => void
}

export function RollScreen({
  results,
  lockedDiceId,
  hasRerolled,
  isAnimating,
  onLock,
  onReroll,
  onAccept,
}: RollScreenProps) {
  // Valores de display durante la animación (números que "ruedan")
  const [displayFaces, setDisplayFaces] = useState<Record<number, number>>(
    Object.fromEntries(results.map((r) => [r.diceId, r.face]))
  )

  // Cuando llega una animación, ciclar números aleatorios y luego fijar los reales
  useEffect(() => {
    if (!isAnimating) {
      setDisplayFaces(Object.fromEntries(results.map((r) => [r.diceId, r.face])))
      return
    }

    const interval = setInterval(() => {
      setDisplayFaces(
        Object.fromEntries(results.map((r) => [r.diceId, rollFace()]))
      )
    }, 80)

    const timeout = setTimeout(() => {
      clearInterval(interval)
      setDisplayFaces(Object.fromEntries(results.map((r) => [r.diceId, r.face])))
    }, 700)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [isAnimating, results])

  function handleReroll() {
    const newResults: DiceResult[] = results.map((r) => ({
      ...r,
      face: r.locked ? r.face : rollFace(),
    }))
    onReroll(newResults)
  }

  const canReroll = lockedDiceId !== null && !hasRerolled && !isAnimating
  const canLockAny = lockedDiceId === null && !isAnimating

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">
          {isAnimating ? "¡Tirando...!" : "Tus resultados"}
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          {isAnimating
            ? "El azar está decidiendo..."
            : lockedDiceId === null
              ? "Puedes bloquear UN dado antes de re-tirar."
              : hasRerolled
                ? "Resultados definitivos. ¡Acepta el plan!"
                : "Dado bloqueado. Puedes re-tirar una vez los demás."}
        </p>
      </div>

      {/* Dice cards */}
      <div className="flex flex-col gap-3">
        {results.map((result) => {
          const dice = DICE.find((d) => d.id === result.diceId)!
          const isLocked = result.diceId === lockedDiceId
          const displayFace = displayFaces[result.diceId] ?? result.face
          // faceText always uses the real face value to avoid a flash of wrong text
          // when animation ends before displayFaces resets
          const faceText = getFaceText(result.diceId, result.face)

          // Si hay un dado bloqueado y éste NO es el bloqueado, ocultamos el candado
          const showLockButton = isLocked || canLockAny

          return (
            <div
              key={result.diceId}
              className={[
                "relative flex items-center gap-4 rounded-xl border p-4 transition-all duration-300",
                isLocked
                  ? "border-amber-500/70 bg-slate-800 shadow-lg shadow-amber-900/30"
                  : isAnimating
                    ? "border-slate-600/60 bg-slate-900/80 animate-pulse"
                    : "border-slate-700/60 bg-slate-900/60",
              ].join(" ")}
            >
              {/* Emoji */}
              <span
                className={[
                  "text-2xl transition-all duration-300",
                  isAnimating && !isLocked ? "scale-110" : "",
                ].join(" ")}
              >
                {dice.emoji}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {dice.name}
                </p>
                <p
                  className={[
                    "mt-0.5 font-bold truncate transition-colors",
                    isLocked
                      ? "text-amber-300"
                      : isAnimating
                        ? "text-slate-400 font-mono"
                        : "text-white",
                  ].join(" ")}
                >
                  {isAnimating && !isLocked ? (
                    <span className="font-mono text-slate-400">{displayFace}</span>
                  ) : (
                    faceText
                  )}
                </p>
              </div>

              {/* Face number badge */}
              <span
                className={[
                  "shrink-0 rounded-md px-2 py-0.5 text-xs font-mono font-bold border",
                  isLocked
                    ? "border-amber-500/40 text-amber-400 bg-amber-950/40"
                    : "border-slate-700 text-slate-500 bg-slate-900",
                ].join(" ")}
              >
                {isAnimating && !isLocked ? "?" : displayFace}
              </span>

              {/* Lock button — zona táctil ≥44px para móvil */}
              {showLockButton && !isAnimating && (
                <button
                  onClick={() => {
                    if (!isLocked && canLockAny) onLock(result.diceId)
                  }}
                  title={isLocked ? "Dado bloqueado" : "Bloquear este dado"}
                  className={[
                    "shrink-0 rounded-lg p-3 -m-1 transition-all duration-200",
                    isLocked
                      ? "text-amber-400 cursor-default"
                      : "text-slate-500 hover:text-rose-400 active:text-rose-400 hover:bg-slate-800",
                  ].join(" ")}
                >
                  {isLocked ? (
                    <Lock className="h-5 w-5" />
                  ) : (
                    <LockOpen className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Lock hint */}
      {!isAnimating && lockedDiceId === null && (
        <p className="text-center text-xs text-slate-600 -mt-2">
          Toca el candado 🔓 de un resultado para bloquearlo antes de re-tirar
        </p>
      )}

      {/* Action buttons */}
      <div className="flex flex-col gap-3 pt-2">
        {/* Re-roll button: only when a die is locked AND hasn't rerolled yet */}
        {canReroll && (
          <Button
            onClick={handleReroll}
            variant="outline"
            size="lg"
            className="w-full border-slate-600 text-slate-200 hover:bg-slate-800 hover:border-slate-500 hover:text-white transition-all"
          >
            <RotateCcw className="h-4 w-4" />
            Re-tirar los no bloqueados
            <span className="ml-1 text-xs text-slate-500">(1 vez)</span>
          </Button>
        )}

        <Button
          onClick={onAccept}
          disabled={isAnimating}
          size="lg"
          className="w-full bg-rose-600 text-white hover:bg-rose-500 disabled:opacity-40 shadow-lg shadow-rose-900/40 transition-all duration-200 text-base font-semibold"
        >
          <Check className="h-5 w-5" />
          ¡Aceptar este Plan!
        </Button>
      </div>
    </div>
  )
}
