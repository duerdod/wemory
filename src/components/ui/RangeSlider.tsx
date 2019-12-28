import { css } from 'styled-components';
import { theme } from '../../Theme';

export const rangeSliderStyle = css`
  height: 58px;
  appearance: none;
  margin: 10px 0;
  width: 100%;
  background: transparent;

  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 14px;
    cursor: pointer;
    box-shadow: 0px 0px 0px #000000;
    background: ${theme.cardColor};
    border-radius: 50px;
    border: 1px solid #000000;
  }
  &::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000;
    border: 1px solid #000000;
    height: 50px;
    width: 50px;
    border-radius: 50px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -19px;
  }
  &:focus::-webkit-slider-runnable-track {
    background: ${theme.cardColor};
  }
  &::-moz-range-track {
    width: 100%;
    height: 14px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: ${theme.cardColor};
    border-radius: 50px;
    border: 1px solid #000000;
  }
  &::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000;
    border: 1px solid #000000;
    height: 50px;
    width: 50px;
    border-radius: 50px;
    background: #ffffff;
    cursor: pointer;
  }
  &::-ms-track {
    width: 100%;
    height: 14px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: #3071a9;
    border: 1px solid #000000;
    border-radius: 100px;
    box-shadow: 0px 0px 0px #000000;
  }
  &::-ms-fill-upper {
    background: #3071a9;
    border: 1px solid #000000;
    border-radius: 100px;
    box-shadow: 0px 0px 0px #000000;
  }
  &::-ms-thumb {
    margin-top: 1px;
    box-shadow: 1px 1px 1px #000000;
    border: 1px solid #000000;
    height: 50px;
    width: 50px;
    border-radius: 50px;
    background: #ffffff;
    cursor: pointer;
  }
  &:focus::-ms-fill-lower {
    background: ${theme.cardColor};
  }
  &:focus::-ms-fill-upper {
    background: ${theme.cardColor};
  }
`;
