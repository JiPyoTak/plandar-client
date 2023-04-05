import { ComponentMeta, ComponentStory } from '@storybook/react';

import TagButton from '@/components/buttons/TagButton';

export default {
  title: 'Buttons/TagButton',
  component: TagButton,
  argTypes: {
    children: { control: 'text' },
    onClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof TagButton>;

const Template: ComponentStory<typeof TagButton> = (args) => (
  <TagButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  onClick: () => console.log('clicked'),
  children: '태그 버튼입니다',
};
