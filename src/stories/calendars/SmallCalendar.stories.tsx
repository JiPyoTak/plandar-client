import React, { useEffect } from 'react';

import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Calendar from '@/components/calendars/small/index';
import SmallCalendar from '@/components/sidebar/SmallCalendar';
import { CALENDAR_UNIT } from '@/constants';
import useCalendarUnitState from '@/stores/date/calendarUnit';

export default {
  title: 'calendars/SmallCalendar',
  component: Calendar,
  argTypes: {
    selectedCalendarIndex: {
      options: [0, 1, 2],
      control: {
        type: 'select',
        labels: CALENDAR_UNIT,
      },
    },
  },
} as ComponentMeta<typeof Calendar>;

const Container = styled.div`
  width: 300px;
`;

const Template: ComponentStory<
  React.FC<{
    selectedCalendarIndex: 0 | 1 | 2;
  }>
> = ({ selectedCalendarIndex }) => {
  const { selectCalendarUnit } = useCalendarUnitState();

  useEffect(() => {
    selectCalendarUnit(CALENDAR_UNIT[selectedCalendarIndex]);
  }, [selectedCalendarIndex]);

  return (
    <Container>
      <SmallCalendar />
    </Container>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  selectedCalendarIndex: 2,
};
