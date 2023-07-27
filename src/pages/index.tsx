import React from 'react';

import styled from '@emotion/styled';

import MainCalendar from '@/components/home/main/calendar';
import Header from '@/components/home/main/header';
import Timetable from '@/components/home/main/timetable';
import SideBar from '@/components/home/sidebar';
import CreatePlanModal from '@/components/modal/plan/create';
import HoveredPlanModal from '@/components/modal/plan/hover';
import SelectedPlanModal from '@/components/modal/plan/select';
import useDateState from '@/stores/date';

const CALENDAR_COMPONENTS = {
  day: Timetable,
  days: Timetable,
  week: Timetable,
  month: MainCalendar,
} as const;

const Home: React.FC = () => {
  const calendar = useDateState(({ calendarUnit }) => calendarUnit);

  const CalendarComponent = CALENDAR_COMPONENTS[calendar];

  return (
    <>
      <Container>
        <SideBar />
        <CalendarContainer>
          <Header />
          <div className="calendar-main">
            <CalendarComponent />
          </div>
        </CalendarContainer>
      </Container>
      <HoveredPlanModal />
      <SelectedPlanModal />
      <CreatePlanModal />
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
`;

const CalendarContainer = styled.section`
  flex: 1 0 0;
  height: 100%;

  display: flex;
  flex-direction: column;

  overflow: hidden;

  & > .calendar-main {
    flex: 1 0 0;
    overflow: hidden;

    border-top: 1px solid ${({ theme }) => theme.background3};
  }
`;

export default Home;
