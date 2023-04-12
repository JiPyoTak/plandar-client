import React from 'react';

import styled from '@emotion/styled';

import MainCalendar from '@/components/calendars/large';
import CalendarHeader from '@/components/common/calendar/CalendarHeader';
import Logo from '@/components/Logo';
import SideBar from '@/components/sidebar';

const Home: React.FC = () => {
  return (
    <Container>
      <Header>
        <Logo />
        <CalendarHeader />
      </Header>
      <MainContent>
        <SideBar />
        <section>
          <MainCalendar />
        </section>
      </MainContent>
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

const Header = styled.div`
  display: flex;

  background-color: ${({ theme }) => theme.white};
  border-bottom: 1px solid ${({ theme }) => theme.border2};
`;

const MainContent = styled.div`
  flex: 1;
  height: 100%;
  display: flex;

  & > section {
    flex: 1;
    display: flex;

    padding: 1rem;
  }
`;

export default Home;
