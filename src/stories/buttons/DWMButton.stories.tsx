import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import DWMButton from '@/components/buttons/DWMButton';

export default {
  title: 'Buttons/DWMButton',
  component: DWMButton,
} as ComponentMeta<typeof DWMButton>;

const Template: ComponentStory<typeof DWMButton> = () => <DWMButton />;

export const Primary = Template.bind({});
Primary.args = {};
