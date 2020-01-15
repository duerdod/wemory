import React, { useState } from 'react';
import Board from './components/Board';
import { Title } from './components/Title';
import { Settings, ShowModalButton } from './components/Settings';

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const modalProps = { showModal, setShowModal };

  return (
    <>
      <Title />
      <ShowModalButton {...modalProps} />
      {showModal && <Settings {...modalProps} />}
      <Board />
    </>
  );
};

export default App;
