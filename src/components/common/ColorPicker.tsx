import React, { PropsWithChildren, useState } from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { CheckIcon } from '@/components/icons';
import ChevronIcon from '@/components/icons/ChevronIcon';
import { TSelectableColor } from '@/types';
import { SELECTABLE_COLOR } from '@/utils/constants';

type TColorPickerProps = PropsWithChildren<{
  selectedColor: string;
  onSelect: (color: TSelectableColor) => void;
}>;

type TColorPicker = React.FC<TColorPickerProps>;

const ColorPicker: TColorPicker = ({
  selectedColor,
  onSelect,
}: TColorPickerProps) => {
  const theme = useTheme();
  const [popupOpened, setPopupOpened] = useState(false);

  return (
    <span css={{ position: 'relative' }}>
      <PickerButton onClick={() => setPopupOpened((prev) => !prev)}>
        <span
          css={{
            backgroundColor: theme[selectedColor as keyof typeof theme],
          }}
        />
        <ChevronIcon css={{ width: 14 }} type="down" color="black" />
      </PickerButton>
      {popupOpened && (
        <Popup>
          {SELECTABLE_COLOR.map((color: TSelectableColor) => (
            <button
              onClick={() => {
                onSelect(color);
                setPopupOpened(false);
              }}
              css={{ position: 'relative' }}
              key={color}
            >
              <ColorCircle css={{ backgroundColor: theme[color] }} />
              {selectedColor === color && <CheckMarker color={theme.white} />}
            </button>
          ))}
        </Popup>
      )}
    </span>
  );
};

const PickerButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 0 5px;
  border-radius: 5px;
  &:hover {
    background-color: ${({ theme }) => theme.background3};
  }

  & > span {
    width: 14px;
    height: 14px;
    border-radius: 50%;
  }
`;

const Popup = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.border1};
  padding: 15px;
  border-radius: 10px;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  left: 0;
  top: 22px;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  z-index: 50;
`;

const ColorCircle = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 100%;
`;

const CheckMarker = styled(CheckIcon)`
  position: absolute;
  width: 16px;
  height: 16px;
  top: calc(50% + 1px);
  left: clac(50% - 1px);
  transform: translate(-50%, -50%);
`;

export default ColorPicker;
