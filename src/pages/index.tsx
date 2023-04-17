import React from 'react';

import styled from '@emotion/styled';

import MainCalendar from '@/components/calendars/large';
import CalendarHeader from '@/components/common/calendar/CalendarHeader';
import Logo from '@/components/Logo';
import SideBar from '@/components/sidebar';
import Timetable from '@/components/timetable';
import useCalendarUnitState from '@/stores/date/calendarUnit';
import { SIDEBAR_WIDTH } from '@/styles/home';

const Home: React.FC = () => {
  const { selectedCalendarUnit } = useCalendarUnitState();

  return (
    <Container>
      <Header>
        <div className="header-side">
          <Logo />
        </div>
        <div className="header-main">
          <CalendarHeader />
        </div>
      </Header>
      <ContentSizer>
        <div className="content-side">
          <SideBar />
        </div>
        <section className="content-main">
          <Backgrounder>
            {selectedCalendarUnit === '월' && <MainCalendar />}
            {selectedCalendarUnit === '주' && <Timetable rangeAmount={7} />}
            {selectedCalendarUnit === '일' && <Timetable rangeAmount={1} />}
          </Backgrounder>
        </section>
      </ContentSizer>
    </Container>
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
  // Height에 대해서 넘어가지 않게 하는 hidden
  overflow: hidden;

  display: flex;

  & > .content-side {
    flex: 0 0 ${SIDEBAR_WIDTH};
    height: 100%;
  }

  & > .content-main {
    flex: 1 0 0;
    height: 100%;
    padding: 1rem;

    // Width에 대해서 넘어가지 않게 하는 hidden
    overflow: hidden;
  }
`;

const Backgrounder = styled.div`
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.background1};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
`;

export default Home;
