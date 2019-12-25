import React, {
  useContext,
  createContext,
  useReducer,
  FunctionComponent
} from 'react';

import { memoryCards } from '../constants/memoryCards';

export interface MemoryCard {
  id: number;
  color: string;
  isOpen: boolean;
  isCollected: boolean;
}

type MemoryState = {
  cards: MemoryCard[];
  selectedCards: MemoryCard[];
};

type Action = { type: 'SELECT'; id: number };
type MemoryDispatch = (action: Action) => void;

const MemoryStateContext = createContext<MemoryState | undefined>(undefined);
const MemoryDispatchContext = createContext<MemoryDispatch | undefined>(
  undefined
);

function memoryReducer(state: MemoryState, action: Action): MemoryState {
  switch (action.type) {
    case 'SELECT':
      const { cards, selectedCards } = state;
      const currentSelectedCard = cards.find(c => c.id === action.id);
      const previouslySelectedCard = selectedCards.find(c => c.id);

      // Return early.
      if (!currentSelectedCard) {
        return state;
      }

      // No match
      if (
        currentSelectedCard &&
        previouslySelectedCard &&
        currentSelectedCard.id !== previouslySelectedCard.id
      ) {
        return {
          ...state,
          selectedCards: []
        };
      }

      // Match!
      if (
        previouslySelectedCard &&
        selectedCards.length < 2 &&
        previouslySelectedCard.id === currentSelectedCard.id
      ) {
        return {
          ...state,
          selectedCards: [
            { ...previouslySelectedCard, isCollected: true },
            { ...currentSelectedCard, isCollected: true, isOpen: true }
          ]
        };
      }

      // Defaults to select a card
      return {
        ...state,
        selectedCards: [{ ...currentSelectedCard, isOpen: true }]
      };

    default:
      throw new Error('Not a valid action type.');
  }
}

const initialState: MemoryState = {
  cards: memoryCards,
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
