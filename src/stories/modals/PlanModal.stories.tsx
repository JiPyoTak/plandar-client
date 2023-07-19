import { ComponentMeta, ComponentStory } from '@storybook/react';

import CreatePlanModal from '@/components/modal/plan/create';

export default {
  title: 'Modals/PlanModal',
  component: CreatePlanModal,
} as ComponentMeta<typeof CreatePlanModal>;

const Template: ComponentStory<typeof CreatePlanModal> = (args) => (
  <CreatePlanModal {...args} />
);

export const Create = Template.bind({});
Create.args = {
  openModal: true,
};

export const Update = Template.bind({});
Update.args = {
  openModal: true,
};
