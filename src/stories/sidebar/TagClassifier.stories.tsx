import { ComponentMeta, ComponentStory } from '@storybook/react';

import TagClassifier from '@/components/sidebar/TagClassifier';
import { getPlansApiHandler } from '@/stories/apis/plan';

export default {
  title: 'Sidebar/Classifier',
  component: TagClassifier,
} as ComponentMeta<typeof TagClassifier>;

const Template: ComponentStory<typeof TagClassifier> = (args) => {
  return <TagClassifier {...args} />;
};

export const Tag = Template.bind({});
Tag.args = {};
Tag.parameters = {
  msw: {
    handlers: [getPlansApiHandler],
  },
};
