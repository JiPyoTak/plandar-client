import { ComponentMeta, ComponentStory } from '@storybook/react';

import PlanModal from '@/components/modal/plan/create';

export default {
  title: 'Modals/PlanModal',
  component: PlanModal,
} as ComponentMeta<typeof PlanModal>;

const Template: ComponentStory<typeof PlanModal> = (args) => (
  <PlanModal {...args} />
);

export const Create = Template.bind({});
Create.args = {
  openModal: true,
};

export const Update = Template.bind({});
Update.args = {
  openModal: true,
};
