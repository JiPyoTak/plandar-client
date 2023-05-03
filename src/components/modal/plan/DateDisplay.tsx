import React from 'react';

import styled from '@emotion/styled';

// todo: store의 상태와 연동하여 날짜 보여주기, 현재는 임시 구현
const DateDisplay: React.FC = () => {
  return <Container>일정 기간 표시</Container>;
};

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 48px;
`;

export default DateDisplay;
