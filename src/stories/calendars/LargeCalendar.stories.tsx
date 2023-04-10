import React from 'react';

import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import CalendarView from '@/components/calendars/large';
import CalendarHeader from '@/components/common/calendar/CalendarHeader';

export default {
  title: 'calendars/LargeCalendar',
  component: CalendarView,
} as ComponentMeta<typeof CalendarView>;

const Template: ComponentStory<typeof CalendarView> = () => <CalendarView />;
const Template2 = () => <CalendarHeader />;
const Template3 = () => {
  return (
    <Container>
      <CalendarHeader />
      <CalendarView />
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  height: 100%;

  flex-direction: column;
`;

export const View = Template.bind({});
View.args = {};

export const Header = Template2.bind({});
Template2.args = {};

export const Main = Template3.bind({});
Template3.args = {};
