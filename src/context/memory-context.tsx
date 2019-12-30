import React, {
  useContext,
  createContext,
  useReducer,
  FunctionComponent
} from 'react';

import { generateCards, EmojiType } from '../utils/generateCards';
import { memoryReducer } from '../reducers/memoryReducer';

// In order to have number of cards as a setting,
// the reducer payload must be of type MemoryCard.
// ie. the MemoryCard inteface have to include itself...?
// Or maybe be extended?
export interface MemoryCard {
  memoryId: number;
  color: string;
  identifier?: string[] | null;
  isOpen: boolean;
  isCollected: boolean;
  uniqueId: string;
  card?: MemoryCard;
}

export type MemoryState = {
  cards: MemoryCard[];
  selectedCards: MemoryCard[];
  isFinished: boolean;
};

// Pass the card as payload.
export type Action =
  | {
      type: 'INIT';
      payload: { cardCount: number; cardType: EmojiType };
    }
  | {
      type: 'SET_FINISHED';
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

type MemoryDispatch = (action: Action) => void;

const MemoryStateContext = createContext<MemoryState | undefined>(undefined);
const MemoryDispatchContext = createContext<MemoryDispatch | undefined>(
  undefined
);

export const initialState: MemoryState = {
  cards: generateCards(12, 'animals'),
  selectedCards: [],
  isFinished: false
};

const MemoryProvider: FunctionComponent = ({ children }) => {
  const [memoryState, memoryDispatch] = useReducer(memoryReducer, initialState);
  return (
    <MemoryStateContext.Provider value={memoryState}>
      <MemoryDispatchContext.Provider value={memoryDispatch}>
        {children}
      </MemoryDispatchContext.Provider>
    </MemoryStateContext.Provider>
  );
};

function useMemoryState() {
  const state = useContext(MemoryStateContext);
  if (!state) {
    throw new Error('UseMemoryState is not inside MemoryProvider');
  }
  return state;
}

function useMemoryDispatch() {
  const dispatch = useContext(MemoryDispatchContext);
  if (!dispatch) {
    throw new Error('UseMemoryDispatch is not inside MemoryProvider');
  }
  return dispatch;
}

export { MemoryProvider, useMemoryState, useMemoryDispatch };
