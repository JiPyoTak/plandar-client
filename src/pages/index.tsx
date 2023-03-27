import React from 'react';

import styled from '@emotion/styled';

import SideBar from '@/components/SideBar';

const Home: React.FC = () => {
  return (
    <FlexWrapper>
      <SideSizer>
        <SideBar />
      </SideSizer>
      <MainSizer></MainSizer>
    </FlexWrapper>
  );
};

const FlexWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
`;

const SideSizer = styled.aside`
  flex: 0 0 332px;
  height: 100%;
`;

const MainSizer = styled.div`
  flex: 1;
  height: 100%;
`;

export default Home;
