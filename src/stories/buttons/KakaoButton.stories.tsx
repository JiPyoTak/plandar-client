import { ComponentStory, ComponentMeta } from '@storybook/react';

import KakaoButton from '@/components/buttons/KakaoButton';

export default {
  title: 'Buttons/KakaoButton',
  component: KakaoButton,
} as ComponentMeta<typeof KakaoButton>;

const Template: ComponentStory<typeof KakaoButton> = () => <KakaoButton />;

export const Primary = Template.bind({});
Primary.args = {};
