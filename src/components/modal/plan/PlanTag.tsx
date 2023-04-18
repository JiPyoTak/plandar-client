import React from 'react';

import styled from '@emotion/styled';

import Dropdown from '@/components/common/dropdown';

type TPlanTagProps = {};

type TPlanTag = React.FC<TPlanTagProps>;

const PlanTag = ({}: TPlanTagProps) => {
  return <Container></Container>;
};

const Container = styled(Dropdown)`
  width: 100%;
`;

export default PlanTag;
