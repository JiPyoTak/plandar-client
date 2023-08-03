import { ComponentMeta, ComponentStory } from '@storybook/react';

import CategoryModal from '@/components/modal/category';

export default {
  title: 'Modals/CategoryModal',
  component: CategoryModal,
} as ComponentMeta<typeof CategoryModal>;

const Template: ComponentStory<typeof CategoryModal> = (args) => (
  <CategoryModal {...args} />
);

export const Create = Template.bind({});
Create.args = {};

export const Update = Template.bind({});
Update.args = {};
