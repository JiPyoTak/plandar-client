import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import Test from '@/components/Test';

export default {
  title: 'Example/Test',
  component: Test,
  argTypes: {
    text: { control: 'text' },
  },
} as ComponentMeta<typeof Test>;

const Template: ComponentStory<typeof Test> = (args) => <Test {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: 'Hello World1',
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: 'Hello World2',
};

export const Large = Template.bind({});
Large.args = {
  text: 'Hello World3',
};
