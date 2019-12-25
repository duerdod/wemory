import React, { useEffect } from 'react';
import { Board } from './components/Board';
import { useMemoryDispatch } from './context/memory-context';
import { Title } from './components/Title';

const App: React.FC = () => {
  const dispatch = useMemoryDispatch();
  useEffect(() => {
    async function fetchDogs() {
      const url = `https://dog.ceo/api/breeds/image/random`;
      const data = await fetch(url);
      const response = await data.json();
      return response;
    }
  }, []);
  return (
    <>
      <Title title="Do you have a dogs memory?" />
      <Board />
    </>
  );
};

export default App;
