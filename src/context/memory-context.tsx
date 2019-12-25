import React, {
  useContext,
  createContext,
  useReducer,
  FunctionComponent
} from 'react';

interface MemoryCard {
  id: string;
  color: string;
}

type MemoryState = MemoryCard[];

type Action = { type: 'SELECT'; id: number };
type MemoryDispatch = (action: Action) => void;

const MemoryStateContext = createContext<MemoryState | undefined>(undefined);
const MemoryDispatchContext = createContext<MemoryDispatch | undefined>(
  undefined
);

function memoryReducer(state: MemoryState, action: Action): MemoryState {
  switch (action.type) {
    case 'SELECT':
      return state;
    default:
      throw new Error('Not a valid action type.');
  }
}

const MemoryProvider: FunctionComponent = ({ children }) => {
  const [memoryState, memoryDispatch] = useReducer(memoryReducer, []);
  return (
    <MemoryStateContext.Provider value={memoryState}>
      <MemoryDispatchContext.Provider value={memoryDispatch}>
        {children}
      </MemoryDispatchContext.Provider>
    </MemoryStateContext.Provider>
  );
};

export { MemoryProvider };
