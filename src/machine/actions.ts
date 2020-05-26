import { MemoryCard, EmojiType } from '../context/memory-context'

export type Action =
    | {
        type: 'SELECT';
        payload: { selectedCard: MemoryCard };
    }
    | {
        type: 'RESET';
        gameSettings: {
            cardCount: number,
            cardType: EmojiType,
        };
    };
