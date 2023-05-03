import { useEffect } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Timetable from '@/components/timetable';
import useCalendarUnitState from '@/stores/date/calendarUnit';

export default {
  title: 'timetable/DayTimetable',
  component: Timetable,
  argTypes: {
    rangeAmount: { control: 'number' },
  },
} as ComponentMeta<typeof Timetable>;

const Template: ComponentStory<typeof Timetable> = (args) => {
  const { selectCalendarUnit } = useCalendarUnitState();
  useEffect(() => {
    selectCalendarUnit('주');
  }, []);

  return <Timetable {...args} />;
};

export const WeekTimetable = Template.bind({});
WeekTimetable.args = { rangeAmount: 7 };
