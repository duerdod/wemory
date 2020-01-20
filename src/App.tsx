import React, { useState } from 'react';
import Board from './components/Board';
import { Settings, ShowModalButton } from './components/Settings';
import { Title } from './components/Title';

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
