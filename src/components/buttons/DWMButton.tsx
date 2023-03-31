import React from 'react';

import { css } from '@emotion/react';

import styled from '@emotion/styled';

import useDWMState from '@/stores/date/dwm';
import { theme } from '@/styles/theme';
import { TDWM } from '@/types';
import { DWM } from '@/utils/constants';

const DWMButton: React.FC = () => {
  const { selectedDWM, selectDWM } = useDWMState();

  return (
    <DWMButtonWrapper>
      <DWMButtonLabel dwm={selectedDWM} />
      {DWM.map((dwm) => (
        <DWMButtonText
          key={dwm}
          active={selectedDWM === dwm}
          onClick={() => selectDWM(dwm)}
        >
          {dwm}
        </DWMButtonText>
      ))}
    </DWMButtonWrapper>
  );
};

const DWMButtonWrapper = styled.span`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 10px;
  background-color: ${theme.background3};
  border-radius: 100px;
  width: 158px;
  height: 36px;
`;

const DWMButtonLabel = styled.span(({ dwm }: { dwm: TDWM }) => [
  css`
    position: absolute;
    pointer-events: none;
    z-index: 5;
    display: inline-block;
    background-color: white;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
    border-radius: 25px;
    width: 50px;
    height: 32px;
    transition: left 0.4s ease-in-out;
  `,
  dwm === '일' &&
    css`
      left: 5px;
    `,
  dwm === '주' &&
    css`
      left: calc(50% - 25px);
    `,
  dwm === '월' &&
    css`
      left: calc(100% - 55px);
    `,
]);

const DWMButtonText = styled.button(({ active }: { active: boolean }) => [
  css`
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    background-color: transparent;
    padding: 10px;
    gap: 10px;
    width: 50px;
    height: 32px;
    transition: color 0.4s ease-in-out;
    color: ${theme.text3};
  `,
  active &&
    css`
      color: ${theme.title_active};
    `,
]);

export default DWMButton;
