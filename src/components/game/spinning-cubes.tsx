import { DICE } from "./dice-data"
import type { DiceResult } from "./roll-screen"

interface SpinningCubesProps {
  results: DiceResult[]
}

const DELAY_CLASSES = [
  "dice-cube--delay-0",
  "dice-cube--delay-1",
  "dice-cube--delay-2",
  "dice-cube--delay-3",
  "dice-cube--delay-4",
  "dice-cube--delay-5",
]

export function SpinningCubes({ results }: SpinningCubesProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 py-2">
      {results.map((result, index) => {
        const dice = DICE.find((d) => d.id === result.diceId)
        if (!dice) return null
        const delayClass = DELAY_CLASSES[index] ?? DELAY_CLASSES[5]

        return (
          <div key={result.diceId} className="dice-cube-scene">
            <div className={`dice-cube ${delayClass}`}>
              <div className="dice-cube-face dice-cube-face--front">{dice.emoji}</div>
              <div className="dice-cube-face dice-cube-face--back">{dice.emoji}</div>
              <div className="dice-cube-face dice-cube-face--right">{dice.emoji}</div>
              <div className="dice-cube-face dice-cube-face--left">{dice.emoji}</div>
              <div className="dice-cube-face dice-cube-face--top">{dice.emoji}</div>
              <div className="dice-cube-face dice-cube-face--bottom">{dice.emoji}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
