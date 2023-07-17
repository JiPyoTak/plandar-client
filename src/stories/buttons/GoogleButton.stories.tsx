import { ComponentStory, ComponentMeta } from '@storybook/react';

import GoogleButton from '@/components/login/GoogleButton';

export default {
  title: 'Buttons/GoogleButton',
  component: GoogleButton,
} as ComponentMeta<typeof GoogleButton>;

const Template: ComponentStory<typeof GoogleButton> = () => <GoogleButton />;

export const Primary = Template.bind({});
Primary.args = {};
