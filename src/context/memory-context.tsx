import React, {
  useContext,
  createContext,
  useReducer,
  FunctionComponent
} from 'react';

import { memoryCards } from '../constants/memoryCards';
import { memoryReducer } from '../reducers/memoryReducer';

import { shuffle } from '../utils/shuffe';

// In order to have number of cards as a setting,
// the reducer payload must be of type MemoryCard.
// ie. the MemoryCard inteface have to include itself...?
// Or maybe be extended?
export interface MemoryCard {
  memoryId: number;
  color: string;
  isOpen: boolean;
  isCollected: boolean;
  uniqueId: string;
  card?: MemoryCard;
}

export type MemoryState = {
  cards: MemoryCard[];
  selectedCards: MemoryCard[];
};

// Pass the card as payload.
export type Action =
  | {
      type: 'SELECT';
      payload: { selectedCard: MemoryCard };
    }
  | {
      type: 'CLOSE_CARDS';
      payload: {
        selectedCards: MemoryCard[];
      };
    };

type MemoryDispatch = (action: Action) => void;

const MemoryStateContext = createContext<MemoryState | undefined>(undefined);
const MemoryDispatchContext = createContext<MemoryDispatch | undefined>(
  undefined
);

const initialState: MemoryState = {
  cards: shuffle(memoryCards),
  selectedCards: []
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
  if (!state) throw new Error('UseMemoryState is not inside MemoryProvider');
  return state;
}

function useMemoryDispatch() {
  const dispatch = useContext(MemoryDispatchContext);
  if (!dispatch)
    throw new Error('UseMemoryDispatch is not inside MemoryProvider');
  return dispatch;
}

export { MemoryProvider, useMemoryState, useMemoryDispatch };
