import React, { useState } from 'react';
import Board from './components/Board';
import { Settings, ShowModalButton } from './components/Settings';
import { Title } from './components/Title';
import Moves from './components/Moves';
import { Container } from './components/Container';

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const modalProps = { showModal, setShowModal };

  return (
    <>
      <Title />
      <Container>
        <ShowModalButton {...modalProps} />
        <Moves />
      </Container>
      {showModal && <Settings {...modalProps} />}
      <Board />
    </>
  );
};

export default App;
