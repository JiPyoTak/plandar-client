import React, { useState } from 'react';

import ColorPicker from '@/components/common/color-picker';
import ChevronIcon from '@/components/common/icons/ChevronIcon';
import { SELECTABLE_COLOR } from '@/constants';
import { TColor } from '@/types';

export default {
  title: 'Common/ColorPicker',
  component: ColorPicker,
};

export const Primary = () => {
  const [color, setColor] = useState<TColor>(SELECTABLE_COLOR[0]);

  return (
    <ColorPicker
      selectedColor={color}
      onSelect={(color) => {
        setColor(color);
      }}
      additionalComponent={<ChevronIcon width="14" type="down" color="black" />}
    />
  );
};
