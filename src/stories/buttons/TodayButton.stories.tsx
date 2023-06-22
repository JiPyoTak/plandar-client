import { ComponentMeta, ComponentStory } from '@storybook/react';

import TodayButton from '@/components/buttons/TodayButton';

export default {
  title: 'Buttons/TodayButton',
  component: TodayButton,
} as ComponentMeta<typeof TodayButton>;

const Template: ComponentStory<typeof TodayButton> = (arg) => (
  <TodayButton {...arg} />
);

export const Primary = Template.bind({});
Primary.args = {
  onClick: () => console.log('today'),
};
