import React, { InputHTMLAttributes } from 'react';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { FONT_BOLD_3 } from '@/styles/font';

type TCheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label?: string;
  checked: boolean;
  id?: string;
};

type TCheckbox = React.FC<TCheckboxProps>;

const Checkbox: TCheckbox = ({
  className,
  label,
  checked,
  id = 'all_day_checkbox',
  ...rest
}: TCheckboxProps) => {
  return (
    <Container className={className}>
      <CheckboxInput type="checkbox" id={id} checked={checked} {...rest} />
      <Label htmlFor={id}>
        <CheckboxSquare />
        {label}
      </Label>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: fit-content;
`;

const checkboxCheck = keyframes`
  0% {
    width: 0;
    height: 0;
    border-color: white;
    transform: translate(0, 0) rotate(45deg);
  }
  33% {
    width: .2em;
    height: 0;
    transform: translate(0, 0) rotate(45deg);
  }
  100% {
    width: .2em;
    height: .5em;
    border-color: white;
    transform: translate(0, -.5em) rotate(45deg);
  }
`;

const shrinkBounce = keyframes`
  0%{
    transform: scale(1);
  }
  33%{
    transform: scale(.85);
  }
  100%{
    transform: scale(1);
  }
`;

const CheckboxInput = styled.input`
  width: 0;
  height: 0;
  margin: 0;

  &:checked + label > span {
    border: 0.5em solid ${({ theme }) => theme.primary};
    animation: ${shrinkBounce} 200ms cubic-bezier(0.4, 0, 0.23, 1);

    &:before {
      content: '';
      position: absolute;
      top: 0.45em;
      left: 0.2em;
      border-right: 3px solid transparent;
      border-bottom: 3px solid transparent;
      transform: rotate(45deg);
      transform-origin: 0 100%;
      animation: ${checkboxCheck} 125ms 250ms cubic-bezier(0.4, 0, 0.23, 1)
        forwards;
    }
  }
`;

const Label = styled.label`
  position: relative;
  display: flex;
  column-gap: 8px;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.black};
  transition: color 250ms cubic-bezier(0.4, 0, 0.23, 1);
  ${FONT_BOLD_3}
`;

const CheckboxSquare = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1em;
  height: 1em;
  font-size: 24px;
  background: transparent;
  border: 2px solid #9e9e9e;
  border-radius: 5px;
  transition: all 250ms cubic-bezier(0.4, 0, 0.23, 1);
`;

export default Checkbox;
