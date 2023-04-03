import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import PrimaryButton from '@/components/buttons/PrimaryButton';

export default {
  title: 'Buttons/PrimaryButton',
  component: PrimaryButton,
  argTypes: {
    onClick: { control: 'function' },
    children: { control: 'text' },
  },
} as ComponentMeta<typeof PrimaryButton>;

const Template: ComponentStory<typeof PrimaryButton> = (args) => (
  <PrimaryButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  onClick: () => console.log('clicked'),
  children: 'Hello World',
};
