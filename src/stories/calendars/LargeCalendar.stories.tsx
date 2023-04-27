import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import CalendarView from '@/components/calendars/large';
import CalendarHeader from '@/components/common/calendar/CalendarHeader';

export default {
  title: 'calendars/LargeCalendar',
  component: CalendarView,
} as ComponentMeta<typeof CalendarView>;

const Template: ComponentStory<typeof CalendarView> = () => <CalendarView />;
const Template2 = () => <CalendarHeader />;

export const View = Template.bind({});
View.args = {};

export const Header = Template2.bind({});
Template2.args = {};
