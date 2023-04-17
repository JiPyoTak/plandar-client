import { useState } from 'react';

import ColorPicker from '@/components/common/ColorPicker';

export default {
  title: 'Common/ColorPicker',
  component: ColorPicker,
};

export const Primary = () => {
  const [color, setColor] = useState('primary');
  return (
    <ColorPicker
      selectedColor={color}
      onSelect={(color) => {
        setColor(color);
      }}
    />
  );
};
