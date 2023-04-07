import React, { PropsWithChildren, useState } from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import ChevronIcon from '@/components/icons/ChevronIcon';
import { TSelectableColor } from '@/types';

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
    <span>
      <PickerButton>
        <span
          css={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            backgroundColor: theme[selectedColor as keyof typeof theme],
          }}
        />
        <ChevronIcon css={{ width: 14 }} type="down" color="black" />
      </PickerButton>
      <Popup></Popup>
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
`;

const Popup = styled.div`
  position: absolute;
  left: 50px;
  top: 100px;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
`;

export default ColorPicker;
