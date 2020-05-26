import React, { useState, useCallback, FormEvent } from 'react';
import styled from 'styled-components';
import {
  useMemoryDispatch,
  useMemoryState,
  EmojiType,
} from '../context/memory-context';
import { Modal, ModalState } from './Modal';

import { Button } from './ui/Button';
import { rangeSliderStyle } from './ui/RangeSlider';

import { theme } from '../Theme';

const Container = styled.div`
  font-family: ${theme.secondFont};
  color: ${theme.cardColor};
`;

const Title = styled.h2`
  text-align: center;
  color: ${theme.titleColor};
  font-family: ${theme.secondFont};
  font-size: 2.3rem;
  letter-spacing: 2px;
  margin: 1rem 0;
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
  height: 85px;

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 3rem;
    width: 85px;
    height: 85px;
    padding: 1.5rem;
    -webkit-tap-highlight-color: transparent;
    transition: all ${theme.transition};
  }

  input[type='radio'] {
    visibility: hidden;
    &:checked ~ label {
      border: 6px solid ${theme.backgroundColor};
      background: #e1e1e1;
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
    font-size: 2.1rem;
    transition: all ${theme.transition};
    content: '${(p) => p.range}';
    ${({ current, range }) =>
      current === range ? `color: ${theme.titleColor};` : 'opacity: 0.4'}
  }
`;

const RangeInput = styled.input`
  ${rangeSliderStyle}
`;

const ModalButton = styled.button`
  span {
    font-size: 3rem;
  }
`;

export const ShowModalButton = React.memo(({ setShowModal }: ModalState) => (
  <ModalButton onClick={() => setShowModal(true)}>
    <span role="img" aria-label="settings">
      ⚙
    </span>
  </ModalButton>
));

const ranges = [6, 12, 18, 24, 30, 36];

interface ISettings {
  cardCount: number;
  cardType: EmojiType;
}

export const Settings = ({ showModal, setShowModal }: ModalState) => {
  const send = useMemoryDispatch();
  const { cards, cardType } = useMemoryState();

  const [settings, setSettings] = useState<ISettings>({
    cardCount: cards.length,
    cardType: cardType as EmojiType,
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLFormElement>) => {
    setSettings({
      cardCount: Number(e.currentTarget.cardCount.value),
      cardType: e.currentTarget.cardType.value,
    });
  }, []);

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send({
      type: 'RESET',
      gameSettings: {
        cardCount: Number(e.currentTarget.cardCount.value),
        cardType: e.currentTarget.cardType.value,
      },
    });
    setShowModal(false);
  };

  const modalProps = { showModal, setShowModal };

  return (
    <Modal {...modalProps}>
      <Container>
        <StyledForm onSubmit={handleSumbit} onChange={handleChange}>
          <FormSection>
            {/* <Title>Card</Title> */}
            <LabelContainer>
              <div>
                <input
                  type="radio"
                  name="cardType"
                  id="emoji-none"
                  value={undefined}
                  defaultChecked={settings.cardType === undefined}
                />
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
                  value="animals"
                  defaultChecked={settings.cardType === 'animals'}
                />
                <label htmlFor="emoji-animals">
                  <span role="img" aria-label="Type of card">
                    🐶
                  </span>
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="cardType"
                  id="emoji-foods"
                  value="foods"
                  defaultChecked={settings.cardType === 'foods'}
                />
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
              {ranges.map((range) => (
                <Range range={range} key={range} current={settings.cardCount} />
              ))}
            </Ranges>
            <RangeInput
              type="range"
              defaultValue={settings.cardCount}
              min="6"
              max="36"
              step="6"
              name="cardCount"
            />
            <div>
              <Button size="large" color="success" type="submit">
                play
              </Button>
            </div>
          </FormSection>
        </StyledForm>
      </Container>
    </Modal>
  );
};
