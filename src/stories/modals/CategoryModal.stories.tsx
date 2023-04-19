import { ComponentMeta, ComponentStory } from '@storybook/react';

import CategoryModal from '@/components/modal/CategoryModal';
import { SELECTABLE_COLOR } from '@/constants';

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
Update.args = {
  isEdit: true,
  category: {
    color: SELECTABLE_COLOR[0],
    name: '테스트 카테고리',
  },
};
