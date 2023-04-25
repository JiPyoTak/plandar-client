import React, { cloneElement, PropsWithChildren } from 'react';

import { css, Theme, useTheme } from '@emotion/react';
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
  const theme = useTheme();
  const itemChildren = Array.prototype.filter
    .call(children, (child) => child.type === CandidateItem)
    .map((child, index) =>
      cloneElement(child, {
        ...child.props,
        type,
        key: `Controller-${index}`,
      }),
    );

  return (
    <Container className={className} css={itemChildren.length && Border(theme)}>
      {itemChildren}
    </Container>
  );
};

const Border = (theme: Theme) => css`
  border: 1px solid ${theme.border1};
`;

const Container = styled.div`
  width: 100%;
  border-radius: 5px;
`;

export default CandidateList;
