import { ComponentMeta, ComponentStory } from '@storybook/react';

import CategoryClassifier from '@/components/sidebar/CategoryClassifier';

export default {
  title: 'Sidebar/Classifier',
  component: CategoryClassifier,
} as ComponentMeta<typeof CategoryClassifier>;

const Template: ComponentStory<typeof CategoryClassifier> = (args) => {
  return <CategoryClassifier {...args} />;
};

export const Category = Template.bind({});
Category.args = {};
