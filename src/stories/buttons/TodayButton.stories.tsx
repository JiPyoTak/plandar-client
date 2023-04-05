import { ComponentMeta, ComponentStory } from '@storybook/react';

import TodayButton from '@/components/buttons/TodayButton';

export default {
  title: 'Buttons/TodayButton',
  component: TodayButton,
} as ComponentMeta<typeof TodayButton>;

const Template: ComponentStory<typeof TodayButton> = () => <TodayButton />;

export const Primary = Template.bind({});
Primary.args = {};
