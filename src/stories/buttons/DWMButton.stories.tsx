import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import CalendarUnitButton from '@/components/buttons/CalendarUnitButton';

export default {
  title: 'Buttons/CalendarUnitButton',
  component: CalendarUnitButton,
} as ComponentMeta<typeof CalendarUnitButton>;

const Template: ComponentStory<typeof CalendarUnitButton> = () => (
  <CalendarUnitButton />
);

export const Primary = Template.bind({});
Primary.args = {};
