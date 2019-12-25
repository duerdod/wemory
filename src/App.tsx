import React from 'react';
import { Board } from './components/Board';
import { Title } from './components/Title';

const App: React.FC = () => {
  return (
    <>
      <Title title="Do you have a dogs memory?" />
      <Board />
    </>
  );
};

export default App;
