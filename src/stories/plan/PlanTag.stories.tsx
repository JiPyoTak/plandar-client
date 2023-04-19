import { ComponentMeta, ComponentStory } from '@storybook/react';

import PlanTag from '@/components/modal/plan/PlanTag';

export default {
  title: 'Plan/PlanTag',
  component: PlanTag,
} as ComponentMeta<typeof PlanTag>;

const Template: ComponentStory<typeof PlanTag> = (args) => {
  return <PlanTag {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {};
