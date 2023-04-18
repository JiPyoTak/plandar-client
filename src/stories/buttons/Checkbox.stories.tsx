import { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Checkbox from '@/components/buttons/Checkbox';

export default {
  title: 'Buttons/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => {
  const [checked, setChecked] = useState(false);
  const { checked: _, ...rest } = args;
  return (
    <Checkbox
      onChange={(e) => setChecked(e.target.checked)}
      checked={checked}
      {...rest}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  label: '체크박스입니다',
};
