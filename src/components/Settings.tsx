import React, { useState, useCallback, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useMemoryDispatch } from '../context/memory-context';
import { Modal, ModalState } from './Modal';

import { Button } from './ui/Button';
import { rangeSliderStyle } from './ui/RangeSlider';

const Container = styled.div`
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.cardColor};
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.titleColor};
  font-size: 1.4rem;
  letter-spacing: 2px;
  margin: 0;
`;

const StyledForm = styled.form`
  max-width: 400px;
  margin: 1rem auto 1rem auto;
  text-align: center;
`;

const FormSection = styled.section`
  margin: 1.5rem 0;
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.8rem;
  height: 55px;

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 2rem;
    width: 55px;
    height: 55px;
    padding: 1rem;
  }

  input[type='radio'] {
    visibility: hidden;
    &:checked ~ label {
      border: 6px solid ${({ theme }) => theme.backgroundColor};
      border-radius: 100%;
    }
  }
`;

const Ranges = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    margin: 0 12px;
  }
`;

const Range = styled.span<{ range: number; current: number }>`
  &::after {
    font-family: inherit;
    font-size: 2rem;
    transition: ${({ theme }) => theme.transition};
    content: '${p => p.range}';
    ${({ current, range }) =>
      current === range ? 'opacity: 1' : 'opacity: 0.4'}
  }
`;

const RangeInput = styled.input`
  ${rangeSliderStyle}
`;

const ModalButton = styled.button`
  span {
    font-size: 3rem;
    color: ${({ theme }) => theme.cardColor};
  }
`;

export const ShowModalButton = ({ setShowModal }: ModalState) => (
  <div style={{ textAlign: 'center' }}>
    <ModalButton onClick={() => setShowModal(true)}>
      <span role="img" aria-label="settings">
        ⚙
      </span>
    </ModalButton>
  </div>
);

const ranges = [6, 12, 18, 24, 30, 36];

export const Settings = ({ showModal, setShowModal }: ModalState) => {
  const dispatch = useMemoryDispatch();
  const [cardCount, setCardCount] = useState<number>(12);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setCardCount(Number(e.target.value));

      dispatch({
        type: 'INIT',
        payload: { cardCount: Number(e.target.value) }
      });
    },
    [dispatch]
  );

  // function handleSumbit(e: FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   dispatch({
  //     type: 'INIT',
  //     payload: { cardCount }
  //   });
  // }

  const modalProps = { showModal, setShowModal };

  return (
    <Modal {...modalProps}>
      <Container>
        <StyledForm>
          <FormSection>
            <Title>Card type</Title>
            <LabelContainer>
              <div style={{ opacity: '0.2' }}>
                <input type="radio" name="cardType" id="emoji-none" disabled />
                <label htmlFor="emoji-none">
                  <span role="img" aria-label="Type of card">
                    🎨
                  </span>
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="cardType"
                  id="emoji-animals"
                  checked
                />
                <label htmlFor="emoji-animals">
                  <span role="img" aria-label="Type of card">
                    🐶
                  </span>
                </label>
              </div>
              <div style={{ opacity: '0.2' }}>
                <input type="radio" name="cardType" id="emoji-foods" disabled />
                <label htmlFor="emoji-foods">
                  <span role="img" aria-label="Type of card">
                    🌭
                  </span>
                </label>
              </div>
            </LabelContainer>
          </FormSection>
          <FormSection>
            <Title>How many cards?</Title>
            <Ranges>
              {ranges.map(range => (
                <Range range={range} key={range} current={cardCount} />
              ))}
            </Ranges>
            <RangeInput
              type="range"
              defaultValue={cardCount}
              min="6"
              max="36"
              step="6"
              name="cardCount"
              onChange={handleChange}
            />
            <div>
              <Button
                onClick={() => setShowModal(false)}
                size="large"
                color="success"
                type="button"
              >
                OK
              </Button>
            </div>
          </FormSection>
        </StyledForm>
      </Container>
    </Modal>
  );
};
