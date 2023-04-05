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
    isColor: { control: 'boolean' },
    isSquare: { control: 'boolean' },
    radiusDir: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} as ComponentMeta<typeof StylishButton>;

const Template: ComponentStory<typeof StylishButton> = (args) => (
  <StylishButton {...args} />
);

export const Colored = Template.bind({});
Colored.args = {
  onClick: () => console.log('clicked'),
  isColor: true,
  children: 'Hello World',
};

export const NonColor = Template.bind({});
NonColor.args = {
  onClick: () => console.log('clicked'),
  isColor: false,
  children: 'Hello World',
};
