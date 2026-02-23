"use client"

import { useState, useCallback } from "react"
import { DICE, rollFace } from "@/components/game/dice-data"
import { ResultScreen } from "@/components/game/result-screen"
import { RollScreen, type DiceResult } from "@/components/game/roll-screen"
import { SetupScreen } from "@/components/game/setup-screen"

// ─── Types ────────────────────────────────────────────────────────────────────

type GamePhase = "setup" | "rolling" | "result"

interface GameState {
  phase: GamePhase
  selectedDice: number[]       // IDs de dados activos (1–5)
  results: DiceResult[]        // resultado de los dados en juego
  lockedDiceId: number | null  // ID del dado bloqueado (solo 1 permitido)
  hasRerolled: boolean         // true una vez que se usa el re-roll
  isAnimating: boolean         // true durante la animación de tirada
}

const INITIAL_STATE: GameState = {
  phase: "setup",
  selectedDice: DICE.map((d) => d.id), // todos seleccionados por defecto
  results: [],
  lockedDiceId: null,
  hasRerolled: false,
  isAnimating: false,
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function GamePage() {
  const [game, setGame] = useState<GameState>(INITIAL_STATE)

  // ── Setup handlers ─────────────────────────────────────────────────────────

  const handleToggleDice = useCallback((id: number) => {
    setGame((prev) => ({
      ...prev,
      selectedDice: prev.selectedDice.includes(id)
        ? prev.selectedDice.filter((d) => d !== id)
        : [...prev.selectedDice, id],
    }))
  }, [])

  const handleSelectAll = useCallback(() => {
    setGame((prev) => ({
      ...prev,
      selectedDice:
        prev.selectedDice.length === DICE.length
          ? []
          : DICE.map((d) => d.id),
    }))
  }, [])

  // ── Roll handler ───────────────────────────────────────────────────────────

  const handleRoll = useCallback(() => {
    const newResults: DiceResult[] = game.selectedDice
      .slice()
      .sort((a, b) => a - b) // mantener orden visual
      .map((diceId) => ({
        diceId,
        face: rollFace(),
        locked: false,
      }))

    setGame((prev) => ({
      ...prev,
      phase: "rolling",
      results: newResults,
      lockedDiceId: null,
      hasRerolled: false,
      isAnimating: true,
    }))

    // Terminar la animación tras 4.5 s
    setTimeout(() => {
      setGame((prev) => ({ ...prev, isAnimating: false }))
    }, 4500)
  }, [game.selectedDice])

  // ── Lock handler ───────────────────────────────────────────────────────────

  const handleLock = useCallback((diceId: number) => {
    setGame((prev) => {
      // Solo se puede bloquear si todavía no hay ninguno bloqueado
      if (prev.lockedDiceId !== null) return prev
      return {
        ...prev,
        lockedDiceId: diceId,
        results: prev.results.map((r) => ({
          ...r,
          locked: r.diceId === diceId,
        })),
      }
    })
  }, [])

  // ── Reroll handler ─────────────────────────────────────────────────────────

  const handleReroll = useCallback((newResults: DiceResult[]) => {
    setGame((prev) => ({
      ...prev,
      results: newResults,
      hasRerolled: true,
      isAnimating: true,
    }))

    setTimeout(() => {
      setGame((prev) => ({ ...prev, isAnimating: false }))
    }, 4500)
  }, [])

  // ── Accept handler ─────────────────────────────────────────────────────────

  const handleAccept = useCallback(() => {
    setGame((prev) => ({ ...prev, phase: "result" }))
  }, [])

  // ── Restart handler ────────────────────────────────────────────────────────

  const handleRestart = useCallback(() => {
    setGame(INITIAL_STATE)
  }, [])

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <main className="min-h-svh bg-slate-950 bg-gradient-to-b from-slate-950 via-slate-950 to-rose-950/10">
      {/* safe-area-inset-top para notch/Dynamic Island */}
      <div className="mx-auto max-w-md px-4 pt-10 pb-12 sm:pt-14 sm:pb-16"
           style={{ paddingBottom: "max(3rem, env(safe-area-inset-bottom))" }}>
        {/* Decorative top accent */}
        <div className="mb-8 flex justify-center">
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-rose-600 to-rose-400 opacity-60" />
        </div>

        {/* Screen renderer */}
        {game.phase === "setup" && (
          <SetupScreen
            selectedDice={game.selectedDice}
            onToggleDice={handleToggleDice}
            onSelectAll={handleSelectAll}
            onRoll={handleRoll}
          />
        )}

        {game.phase === "rolling" && (
          <RollScreen
            results={game.results}
            lockedDiceId={game.lockedDiceId}
            hasRerolled={game.hasRerolled}
            isAnimating={game.isAnimating}
            onLock={handleLock}
            onReroll={handleReroll}
            onAccept={handleAccept}
          />
        )}

        {game.phase === "result" && (
          <ResultScreen results={game.results} onRestart={handleRestart} />
        )}

        {/* Decorative bottom accent */}
        <div className="mt-10 flex justify-center">
          <div className="h-1 w-8 rounded-full bg-gradient-to-r from-rose-600 to-rose-400 opacity-30" />
        </div>
      </div>
    </main>
  )
}
