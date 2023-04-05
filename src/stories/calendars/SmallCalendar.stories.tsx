import React from 'react';

import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Calendar from '@/components/calendars/small/index';

export default {
  title: 'calendars/SmallCalendar',
  component: Calendar,
} as ComponentMeta<typeof Calendar>;

const Container = styled.div`
  width: 300px;
`;

const Template: ComponentStory<typeof Calendar> = () => (
  <Container>
    <Calendar />
  </Container>
);

export const Primary = Template.bind({});
Primary.args = {};
