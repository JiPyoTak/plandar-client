import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import StylishButton from '@/components/buttons/StylishButton';

export default {
  title: 'Buttons/StylishButton',
  component: StylishButton,
  argTypes: {
    onClick: { control: 'function' },
    children: { control: 'text' },
    size: { control: 'text' },
    color: { control: 'boolean' },
    square: { control: 'boolean' },
    radiusDir: { control: 'text' },
  },
} as ComponentMeta<typeof StylishButton>;

const Template: ComponentStory<typeof StylishButton> = (args) => (
  <StylishButton {...args} />
);

export const Colored = Template.bind({});
Colored.args = {
  onClick: () => console.log('clicked'),
  color: true,
  children: 'Hello World',
};

export const NonColor = Template.bind({});
NonColor.args = {
  onClick: () => console.log('clicked'),
  color: false,
  children: 'Hello World',
};
