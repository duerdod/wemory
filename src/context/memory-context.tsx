import { useMachine } from '@xstate/react';
import React, { createContext, useContext } from 'react';
import { Action } from '../machine/actions';
import { MemoryMachine } from '../machine/memoryMachine';

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
  moves: number;
  cardType: EmojiType;
};

interface ExtendedMemoryState extends MemoryState {
  isGameWon: boolean;
}

export type EmojiType = 'foods' | 'animals' | null;

type MemoryDispatch = (action: Action) => void;

const MemoryStateContext = createContext<ExtendedMemoryState | undefined>(
  undefined
);
const MemoryDispatchContext = createContext<MemoryDispatch | undefined>(
  undefined
);

const MemoryProvider: React.FC = ({ children }) => {
  const [current, send] = useMachine(MemoryMachine);

  const isGameWon = current.matches('gameWon');

  return (
    <MemoryStateContext.Provider value={{ ...current.context, isGameWon }}>
      <MemoryDispatchContext.Provider value={send}>
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
  const send = useContext(MemoryDispatchContext);
  if (!send) {
    throw new Error('UseMemoryDispatch is not inside MemoryProvider');
  }
  return send;
}

export { MemoryProvider, useMemoryState, useMemoryDispatch };
