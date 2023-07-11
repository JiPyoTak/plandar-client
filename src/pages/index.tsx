import React from 'react';

import styled from '@emotion/styled';

import MainCalendar from '@/components/calendars/large';
import CalendarHeader from '@/components/common/calendar/CalendarHeader';
import PlanModal from '@/components/modal/plan/Created';
import HoveredPlanModal from '@/components/modal/plan/Hovered';
import SelectedPlanModal from '@/components/modal/plan/Selected';
import SideBar from '@/components/sidebar';
import Timetable from '@/components/timetable';
import useCalendarUnitState from '@/stores/date/calendarUnit';

const CALENDAR_COMPONENTS = {
  월: MainCalendar,
  주: Timetable,
  일: Timetable,
} as const;

const Home: React.FC = () => {
  const { selectedCalendarUnit } = useCalendarUnitState();

  const CalendarComponent = CALENDAR_COMPONENTS[selectedCalendarUnit];

  return (
    <>
      <Container>
        <SideBar />
        <section className="content-main">
          <CalendarHeader />
          <CalendarComponent />
        </section>
      </Container>
      <HoveredPlanModal />
      <SelectedPlanModal />
      <PlanModal />
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;

  & > .content-main {
    flex: 1 0 0;
    height: 100%;

    display: flex;
    flex-direction: column;

    overflow: hidden;
  }
`;

export default Home;
