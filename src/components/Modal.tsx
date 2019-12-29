import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useTransition, animated, config } from 'react-spring';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 100;
  background: black;
  opacity: 0.2;
  top: 0;
  bottom: 0;
`;

const ModalContainer = styled(animated.div)`
  background: whitesmoke;
  position: absolute;
  z-index: 200;
  width: 450px;
  border-radius: 4px;
  max-width: 100%;
  max-height: 100%;
  padding: 16px;
  top: 50%;
  left: 50%;
  &::after {
    position: absolute;
    height: 120%;
    width: 100%;
    z-index: 100;
    background: black;
    opacity: 0.2;
  }
  @media screen and (max-width: 40em) {
    left: 0%;
    right: 0%;
    top: 2%;
    &&& {
      transform: translate(0%, 0%) !important;
    }
    &.center {
      top: 50%;
    }
  }
`;

export interface ModalState {
  showModal?: boolean;
  show?: boolean;
  setShowModal: (state: boolean) => void;
}

interface ModalInterface extends ModalState {
  show?: boolean;
  children: ReactNode;
}

export const Modal = ({
  children,
  showModal,
  setShowModal
}: ModalInterface) => {
  const root: HTMLElement | null = document.getElementById('root');

  const transition = useTransition(showModal, null, {
    config: { ...config.wobbly, tension: 200 },
    from: { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
    enter: { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
    leave: { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 }
  });

  function hideModal() {
    setShowModal(false);
  }

  return root
    ? createPortal(
        <>
          {transition.map(({ item, key, props }) => {
            return (
              item && (
                <ModalContainer key={key} style={props}>
                  <div>{children}</div>
                </ModalContainer>
              )
            );
          })}
          {showModal && <Backdrop onClick={hideModal} />}
        </>,
        root
      )
    : null;
};
