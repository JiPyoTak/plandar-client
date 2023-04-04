import React from 'react';

import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StylishButton from '@/components/buttons/StylishButton';
import { PlusIcon } from '@/components/icons';

export default {
  title: 'Buttons/StylishButton',
  component: StylishButton,
  argTypes: {
    onClick: { control: 'function' },
    children: { control: 'text' },
    size: { control: 'text' },
    color: { control: 'boolean' },
    square: { control: 'boolean' },
  },
} as ComponentMeta<typeof StylishButton>;

const Template: ComponentStory<typeof StylishButton> = (args) => (
  <StylishButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
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

export const PlusButton = Template.bind({});
PlusButton.args = {
  onClick: () => console.log('clicked'),
  size: 'small',
  color: true,

  children: (
    <PlusIcon
      css={css`
        width: 1.5rem;
        height: 1.5rem;
      `}
      color="white"
    />
  ),
};

export const TodayButton = Template.bind({});
TodayButton.args = {
  onClick: () => console.log('clicked'),
  size: 'small',
  children: '오늘',
};
