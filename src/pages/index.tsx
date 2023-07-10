import React from 'react';

import styled from '@emotion/styled';

import HamburgerButton from '@/components/buttons/HamburgerButton';
import MainCalendar from '@/components/calendars/large';
import CalendarHeader from '@/components/common/calendar/CalendarHeader';
import Logo from '@/components/logo';
import PlanModal from '@/components/modal/plan/Created';
import HoveredPlanModal from '@/components/modal/plan/Hovered';
import SelectedPlanModal from '@/components/modal/plan/Selected';
import SideBar from '@/components/sidebar';
import Timetable from '@/components/timetable';
import useCalendarUnitState from '@/stores/date/calendarUnit';
import { SIDEBAR_WIDTH } from '@/styles/home';

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
        <Header>
          <div className="header-side">
            <HamburgerButton />
            <Logo />
          </div>
          <div className="header-main">
            <CalendarHeader />
          </div>
        </Header>
        <ContentSizer>
          <SideBar />
          <section className="content-main">
            <Backgrounder>
              <CalendarComponent />
            </Backgrounder>
          </section>
        </ContentSizer>
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
  flex-direction: column;

  background-color: ${({ theme }) => theme.primary_light3};
`;

const Header = styled.header`
  display: flex;
  justify-content: stretch;
  align-items: center;

  background-color: ${({ theme }) => theme.white};
  border-bottom: 1px solid ${({ theme }) => theme.border2};

  & > .header-side {
    flex: 0 0 ${SIDEBAR_WIDTH};
    height: 100%;
    padding: 0.5rem 1rem;

    display: flex;
    justify-content: stretch;
    align-items: center;
  }

  & > .header-main {
    flex: 1 0 0;
  }
`;

const ContentSizer = styled.div`
  flex: 1 0 0;
  overflow: hidden;

  display: flex;

  & > .content-main {
    flex: 1 0 0;
    height: 100%;
    padding: 1rem;
    overflow: hidden;
  }
`;

const Backgrounder = styled.div`
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.background1};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  overflow: hidden;
`;

export default Home;
