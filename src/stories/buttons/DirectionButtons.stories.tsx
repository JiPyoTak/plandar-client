import { ComponentMeta, ComponentStory } from '@storybook/react';

import DirectionButtons from '@/components/buttons/DirectionButtons';

export default {
  title: 'Buttons/DirectionButtons',
  component: DirectionButtons,
} as ComponentMeta<typeof DirectionButtons>;

const Template: ComponentStory<typeof DirectionButtons> = () => (
  <DirectionButtons />
);

export const Primary = Template.bind({});
Primary.args = {};
