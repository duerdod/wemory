import React, { useContext, createContext, useReducer } from 'react';

import { generateCards, isDev } from '../utils/index';
import { memoryReducer } from '../reducers/memoryReducer';
import { Action } from '../reducers/actions';

const CARD_COUNT = isDev() ? 2 : 16;

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
  moves: number;
  cardType: EmojiType;
};

export type EmojiType = 'foods' | 'animals' | null;

type MemoryDispatch = (action: Action) => void;

const MemoryStateContext = createContext<MemoryState | undefined>(undefined);
const MemoryDispatchContext = createContext<MemoryDispatch | undefined>(
  undefined
);

export const initialState: MemoryState = {
  cards: generateCards(CARD_COUNT, 'animals'),
  selectedCards: [],
  isGameWon: false,
  moves: 0,
  cardType: 'animals'
};

const MemoryProvider: React.FC = ({ children }) => {
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
