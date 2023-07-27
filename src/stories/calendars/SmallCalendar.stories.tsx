import React, { useEffect } from 'react';

import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import MiniCalendar from '@/components/common/mini-calendar/index';
import SmallCalendar from '@/components/home/sidebar/content/SmallCalendar';
import { CALENDAR_UNIT } from '@/constants';
import useDateState from '@/stores/date';

export default {
  title: 'calendars/SmallCalendar',
  component: MiniCalendar,
  argTypes: {
    selectedCalendarIndex: {
      options: Object.values(CALENDAR_UNIT),
      mapping: Object.values(CALENDAR_UNIT),
      control: {
        type: 'select',
        labels: Object.keys(CALENDAR_UNIT),
      },
    },
  },
} as ComponentMeta<typeof MiniCalendar>;

const Container = styled.div`
  width: 300px;
`;

const Template: ComponentStory<
  React.FC<{
    selectedCalendarIndex: (typeof CALENDAR_UNIT)[keyof typeof CALENDAR_UNIT];
  }>
> = ({ selectedCalendarIndex }) => {
  const setCalendarUnit = useDateState(
    ({ setCalendarUnit }) => setCalendarUnit,
  );

  useEffect(() => {
    setCalendarUnit(CALENDAR_UNIT[selectedCalendarIndex]);
  }, [selectedCalendarIndex]);

  return (
    <Container>
      <SmallCalendar />
    </Container>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  selectedCalendarIndex: CALENDAR_UNIT.month,
};
