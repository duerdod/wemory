import { EmojiType } from '../utils/generateCards';
import { MemoryCard, MemoryState } from '../context/memory-context'

export type Action =
    | {
        type: 'INIT';
        payload: { cardCount: number; cardType: EmojiType };
    }
    | {
        type: 'TRY_WIN';
    }
    | {
        type: 'SELECT';
        payload: { selectedCard: MemoryCard };
    }
    | {
        type: 'CHECK_MATCH';
        payload: { selectedCards: MemoryCard[] };
    }
    | {
        type: 'CLOSE_CARDS';
        payload: {
            selectedCards: MemoryCard[];
        };
    }
    | {
        type: 'RESET';
        payload: {
            initialState: MemoryState;
        };
    };
