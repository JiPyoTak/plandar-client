import React, { cloneElement, PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import CandidateItem from '@/components/modal/plan/Candidates/CandidateItem';

type TCandidateListProps = PropsWithChildren<{
  type: 'tag' | 'category';
  className?: string;
}>;

type TCandidateList = React.FC<TCandidateListProps>;

const CandidateList: TCandidateList = ({
  children = [],
  className,
  type,
}: TCandidateListProps) => {
  const itemChildren = Array.prototype.filter
    .call(children, (child) => child.type === CandidateItem)
    .map((child, index) =>
      cloneElement(child, {
        ...child.props,
        type,
        key: `Controller-${index}`,
      }),
    );

  return <Container className={className}>{itemChildren}</Container>;
};

const Container = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.border1};
  border-radius: 5px;
`;

export default CandidateList;
