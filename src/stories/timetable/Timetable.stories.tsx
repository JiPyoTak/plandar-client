import { ComponentMeta, ComponentStory } from '@storybook/react';

import Timetable from '@/components/timetable';

export default {
  title: 'timetable/DayTimetable',
  component: Timetable,
  argTypes: {
    rangeAmount: { control: 'number' },
  },
} as ComponentMeta<typeof Timetable>;

const Template: ComponentStory<typeof Timetable> = (args) => (
  <Timetable {...args} />
);

export const DayTimeTable = Template.bind({});
DayTimeTable.args = { rangeAmount: 1 };

export const WeekTimeTable = Template.bind({});
WeekTimeTable.args = { rangeAmount: 7 };
