import React from 'react';

import styled from '@emotion/styled';

import SidebarContent from '@/components/sidebar/content';
import SidebarIcons from '@/components/sidebar/SidebarIcons';

const Sidebar = () => {
  return (
    <Container>
      <SidebarIcons />
      <SidebarContent />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

export default Sidebar;
