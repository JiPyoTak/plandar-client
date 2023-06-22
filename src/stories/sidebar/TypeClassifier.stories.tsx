import { ComponentMeta, ComponentStory } from '@storybook/react';

import TypeClassifier from '@/components/sidebar/TypeClassifier';

export default {
  title: 'Sidebar/Classifier',
  component: TypeClassifier,
} as ComponentMeta<typeof TypeClassifier>;

const Template: ComponentStory<typeof TypeClassifier> = (args) => {
  return <TypeClassifier {...args} />;
};

export const Type = Template.bind({});
Type.args = {};
