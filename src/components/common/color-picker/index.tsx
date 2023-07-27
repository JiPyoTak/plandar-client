import React, {
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useState,
} from 'react';

import ColorPopup from '@/components/common/color-picker/ColorList';
import PickButton from '@/components/common/color-picker/PickButton';
import { TColor } from '@/types';

type TColorPickerProps = {
  className?: string;
  selectedColor: TColor;
  onSelect: (color: TColor) => void;
  additionalComponent?: ReactNode;
  circleSize?: 'small' | 'middle';
};

type TColorPicker = React.FC<TColorPickerProps>;

const ColorPicker: TColorPicker = ({
  className,
  selectedColor,
  onSelect,
  additionalComponent,
  circleSize = 'middle',
}: TColorPickerProps) => {
  const [popupOpened, setPopupOpened] = useState(false);

  const onClickPickerButton: MouseEventHandler = (e) => {
    e.stopPropagation();
    setPopupOpened((prev) => !prev);
  };

  const onClickColor = (e: MouseEvent<HTMLButtonElement>, color: TColor) => {
    e.stopPropagation();
    onSelect(color);
    setPopupOpened(false);
  };

  return (
    <span>
      <PickButton
        selectedColor={selectedColor}
        circleSize={circleSize}
        additionalComponent={additionalComponent}
        onClick={onClickPickerButton}
        className={className}
      />
      <ColorPopup
        isOpen={popupOpened}
        selectedColor={selectedColor}
        onClick={onClickColor}
      />
    </span>
  );
};

export default ColorPicker;
