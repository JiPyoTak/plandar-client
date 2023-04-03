import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import StylishButton from '@/components/buttons/StylishButton';

export default {
  title: 'Buttons/StylishButton',
  component: StylishButton,
  argTypes: {
    onClick: { control: 'function' },
    children: { control: 'text' },
  },
} as ComponentMeta<typeof StylishButton>;

const Template: ComponentStory<typeof StylishButton> = (args) => (
  <StylishButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  onClick: () => console.log('clicked'),
  children: 'Hello World',
};
