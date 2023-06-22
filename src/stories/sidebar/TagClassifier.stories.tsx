import { ComponentMeta, ComponentStory } from '@storybook/react';

import TagClassifier from '@/components/sidebar/TagClassifier';

export default {
  title: 'Sidebar/Classifier',
  component: TagClassifier,
} as ComponentMeta<typeof TagClassifier>;

const Template: ComponentStory<typeof TagClassifier> = (args) => {
  return <TagClassifier {...args} />;
};

export const Tag = Template.bind({});
Tag.args = {};
