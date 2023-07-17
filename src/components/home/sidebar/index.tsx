import React from 'react';

import styled from '@emotion/styled';

import SidebarContent from '@/components/home/sidebar/content';
import SidebarIcons from '@/components/home/sidebar/SidebarIcons';

const Sidebar = () => {
  return (
    <Container>
      <SidebarIcons />
      <SidebarContent />
    </Container>
  );
};

const Container = styled.div`
  height: 100%;

  display: flex;

  background-color: ${({ theme }) => theme.primary};
`;

export default Sidebar;
