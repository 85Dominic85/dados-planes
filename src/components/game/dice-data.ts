// Definición de los 5 dados D12 con sus temáticas y resultados posibles

export interface Dice {
  id: number
  name: string
  emoji: string
  description: string
  colorClass: string       // Tailwind border/text color para el dado
  glowClass: string        // Tailwind glow para el estado bloqueado
  faces: string[]          // 12 caras, indexadas 0–11 (cara = índice + 1)
}

export const DICE: Dice[] = [
  {
    id: 1,
    name: "Acción",
    emoji: "🎬",
    description: "¿Qué hacemos hoy?",
    colorClass: "border-sky-500 text-sky-400",
    glowClass: "shadow-sky-500/30",
    faces: [
      "Cine",
      "Teatro",
      "Cena fuera",
      "Pedir a domicilio",
      "Tardeo / Copas",
      "Paseo al aire libre",
      "Noche de Juegos de Mesa / Rol",
      "Maratón de Videojuegos",
      "Escape Room / Arcade",
      "Noche casera relax",
      "Concierto / Evento",
      "Escapada improvisada",
    ],
  },
  {
    id: 2,
    name: "Comida",
    emoji: "🍕",
    description: "¿Qué comemos?",
    colorClass: "border-orange-500 text-orange-400",
    glowClass: "shadow-orange-500/30",
    faces: [
      "Sushi / Asiática",
      "Hamburguesas",
      "Pizza / Italiana",
      "Tacos / Mexicana",
      "Tapas / Raciones",
      "Kebab / Durum",
      "Sana / Poke",
      "India / Especiada",
      "Cena de picoteo elegante",
      "Postre por cena",
      "Comer con las manos",
      "El que NO tiró elige",
    ],
  },
  {
    id: 3,
    name: "Friki",
    emoji: "🎮",
    description: "El plan alternativo",
    colorClass: "border-violet-500 text-violet-400",
    glowClass: "shadow-violet-500/30",
    faces: [
      "Peli Superhéroes",
      "Sci-Fi / Fantasía",
      "Terror / Thriller",
      "Anime / Animación",
      "Videojuego Cooperativo",
      "Videojuego Competitivo",
      "Juego de Mesa",
      "Party Game de Cartas",
      "Maratón de Saga",
      "Trash TV",
      "Documental / Lore",
      "Noche de lectura",
    ],
  },
  {
    id: 4,
    name: "Hot",
    emoji: "🔥",
    description: "Solo para vosotros",
    colorClass: "border-rose-500 text-rose-400",
    glowClass: "shadow-rose-500/30",
    faces: [
      "Masaje relajante",
      "Masaje con aceites",
      "Dress code lencería",
      "Juego de rol",
      "Strip Poker / Juego con prendas",
      "Juguete sorpresa",
      "Cata a ciegas",
      "Ducha juntos",
      "Reto exprés",
      "Romántico clásico",
      "Verdad o Reto subido de tono",
      "Pase de Oro (elige lo que quieras)",
    ],
  },
  {
    id: 5,
    name: "Condición",
    emoji: "⚡",
    description: "El giro del destino",
    colorClass: "border-yellow-500 text-yellow-400",
    glowClass: "shadow-yellow-500/30",
    faces: [
      "Invita el que tira",
      "Invita el otro",
      "Pagamos a medias",
      "Prohibido móviles",
      "Hay que arreglarse",
      "Acento inventado 15 min",
      "El perdedor friega / recoge",
      "Foto divertida de recuerdo",
      "Noche a oscuras / velas",
      "Preparar cóctel juntos",
      "Cambio de roles",
      "Comodín (cancela otro dado y elige)",
    ],
  },
  {
    id: 6,
    name: "Peli",
    emoji: "🎬",
    description: "¿Qué vemos hoy?",
    colorClass: "border-cyan-500 text-cyan-400",
    glowClass: "shadow-cyan-500/30",
    faces: [
      "Comedia Romántica",
      "Acción y Explosiones",
      "Terror / Slasher",
      "Ciencia Ficción / Distopía",
      "Fantasía Épica / Aventura",
      "Thriller Psicológico / Misterio",
      "Comedia Absurda / Parodia",
      "Basada en Hechos Reales / Biopic",
      "Musical / Animación",
      "Cine de Autor / Indie",
      "Un Clásico",
      "Ruleta Rusa: Play a lo primero que sugiera la plataforma",
    ],
  },
]

// Devuelve un número de cara aleatorio entre 1 y 12
export function rollFace(): number {
  return Math.ceil(Math.random() * 12)
}

// Devuelve el texto de una cara dado el ID del dado y el número de cara (1-12)
export function getFaceText(diceId: number, face: number): string {
  const dice = DICE.find((d) => d.id === diceId)
  if (!dice) return ""
  return dice.faces[face - 1] ?? ""
}
