import React, { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import { TIMETABLE_SCROLL_STYLE } from '@/styles/timetable';

type TProps = PropsWithChildren<{
  className?: string;
  fixedComponent?: React.ReactNode;
}>;

const TimetableHorizontalScroller: React.FC<TProps> = ({
  className,
  fixedComponent,
  children,
}) => {
  return (
    <FlexibleContainer className={className}>
      {!!fixedComponent && (
        <div css={{ flex: '0 0 4rem' }}>{fixedComponent}</div>
      )}
      <HorizontalScroller>
        <div css={{ display: 'flex' }}>{children}</div>
      </HorizontalScroller>
    </FlexibleContainer>
  );
};

const FlexibleContainer = styled.div`
  flex: 1 0 auto;

  display: flex;
  overflow: hidden;
`;

const HorizontalScroller = styled.div`
  ${TIMETABLE_SCROLL_STYLE}

  flex: 1 0 0;

  overflow-x: auto;
  overflow-y: hidden;
`;

export default TimetableHorizontalScroller;
