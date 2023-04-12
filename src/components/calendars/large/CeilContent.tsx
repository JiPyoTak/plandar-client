import React from 'react';

import styled from '@emotion/styled';

interface IProps {
  a?: any;
}

const CeilContent: React.FC<IProps> = () => {
  return <Conteiner></Conteiner>;
};

const Conteiner = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
`;

export default CeilContent;
