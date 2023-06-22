import { ComponentMeta, ComponentStory } from '@storybook/react';

import DirectionButtons from '@/components/buttons/DirectionButtons';

export default {
  title: 'Buttons/DirectionButtons',
  component: DirectionButtons,
} as ComponentMeta<typeof DirectionButtons>;

const Template: ComponentStory<typeof DirectionButtons> = (args) => (
  <DirectionButtons {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  onClickLeftButton: () => console.log('왼쪽 클릭'),
  onClickRightButton: () => console.log('오른쪽 클릭'),
};
