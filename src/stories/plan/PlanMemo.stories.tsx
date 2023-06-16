import { ComponentMeta, ComponentStory } from '@storybook/react';

import PlanMemo from '@/components/modal/plan/PlanMemo';

export default {
  title: 'Plan/PlanMemo',
  component: PlanMemo,
} as ComponentMeta<typeof PlanMemo>;

const Template: ComponentStory<typeof PlanMemo> = (args) => {
  return (
    <>
      <PlanMemo {...args} />
      <hr />
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
