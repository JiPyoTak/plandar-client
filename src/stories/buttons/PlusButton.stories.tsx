import { ComponentMeta, ComponentStory } from '@storybook/react';

import PlusButton from '@/components/buttons/PlusButton';

export default {
  title: 'Buttons/PlusButton',
  component: PlusButton,
} as ComponentMeta<typeof PlusButton>;

const Template: ComponentStory<typeof PlusButton> = () => <PlusButton />;

export const Primary = Template.bind({});
Primary.args = {};
