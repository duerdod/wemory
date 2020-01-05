import React, {
  useContext,
  createContext,
  useReducer,
  FunctionComponent
} from 'react';

import { generateCards } from '../utils/generateCards';
import { memoryReducer } from '../reducers/memoryReducer';
import { Action } from '../reducers/actions';

// In order to have number of cards as a setting,
// the reducer payload must be of type MemoryCard.
// ie. the MemoryCard inteface have to include itself...?
// Or maybe be extended?
export interface MemoryCard {
  memoryId: number;
  bgColor: string;
  identifier: string[] | null;
  isOpen: boolean;
  isCollected: boolean;
  uniqueId: string;
  card?: MemoryCard;
}

export type MemoryState = {
  cards: MemoryCard[];
  selectedCards: MemoryCard[];
  isGameWon: boolean;
  cardType: EmojiType;
};

export type EmojiType = 'foods' | 'animals' | null;

type MemoryDispatch = (action: Action) => void;

const MemoryStateContext = createContext<MemoryState | undefined>(undefined);
const MemoryDispatchContext = createContext<MemoryDispatch | undefined>(
  undefined
);

export const initialState: MemoryState = {
  cards: generateCards(2, 'animals'),
  selectedCards: [],
  isGameWon: false,
  cardType: 'animals'
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
