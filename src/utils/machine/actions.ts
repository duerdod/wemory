import { MemoryCard, EmojiType } from '../context/memory-context'

export type Action =
  | {
      type: 'SELECT_CARD'
      card: MemoryCard
    }
  | {
      type: 'RESET'
      gameSettings: {
        cardCount: number
        cardType: EmojiType
      }
    }
