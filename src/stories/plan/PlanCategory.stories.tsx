import { ComponentMeta, ComponentStory } from '@storybook/react';

import PlanCategory from '@/components/modal/plan/PlanCategory';

export default {
  title: 'Plan/PlanCategory',
  component: PlanCategory,
} as ComponentMeta<typeof PlanCategory>;

const Template: ComponentStory<typeof PlanCategory> = (args) => {
  return <PlanCategory {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {};
