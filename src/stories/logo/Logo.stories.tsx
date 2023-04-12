import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Logo from '@/components/logo';

export default {
  title: 'logo/Logo',
  component: Logo,
  argTypes: {
    showPicture: { control: 'boolean' },
    showText: { control: 'boolean' },
  },
} as ComponentMeta<typeof Logo>;

const Container = styled.div`
  width: 300px;
`;

const Template: ComponentStory<typeof Logo> = (args) => (
  <Container>
    <Logo {...args} />
  </Container>
);

export const Primary = Template.bind({});
Primary.args = {};

export const OnlyPicture = Template.bind({});
OnlyPicture.args = {
  showPicture: false,
};

export const OnlyText = Template.bind({});
OnlyText.args = {
  showText: false,
};
