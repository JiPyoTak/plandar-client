import { ComponentMeta, ComponentStory } from '@storybook/react';

import PlanModal from '@/components/modal/plan';

export default {
  title: 'Modals/PlanModal',
  component: PlanModal,
} as ComponentMeta<typeof PlanModal>;

const Template: ComponentStory<typeof PlanModal> = (args) => (
  <PlanModal {...args} />
);

export const Create = Template.bind({});
Create.args = {};

export const Update = Template.bind({});
Update.args = {
  // isEdit: true,
  onDone: () => console.log('done'),
};
