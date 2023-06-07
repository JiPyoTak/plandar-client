import React, { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import { FONT_BOLD_8 } from '@/styles/font';
import { TIMETABLE_SCROLL_STYLE } from '@/styles/timetable';

type TProps = PropsWithChildren<{
  className?: string;
  fixedComponent?: React.ReactNode;
  showScroll?: boolean;
}>;

const TimetableHorizontalScroller: React.FC<TProps> = ({
  className,
  fixedComponent,
  children,
  showScroll,
}) => {
  return (
    <FlexibleContainer className={className}>
      {!!fixedComponent && <GuideComponent>{fixedComponent}</GuideComponent>}
      <HorizontalScroller css={{ overflowX: showScroll ? 'auto' : 'hidden' }}>
        <div css={{ display: 'flex' }}>{children}</div>
      </HorizontalScroller>
    </FlexibleContainer>
  );
};

const FlexibleContainer = styled.div`
  display: flex;
  overflow: hidden;

  border-bottom: 1px solid ${({ theme }) => theme.border2};
`;

const GuideComponent = styled.div`
  ${FONT_BOLD_8}

  flex: 0 0 4rem;

  color: ${({ theme }) => theme.text4};
  background-color: ${({ theme }) => theme.background1};
  text-align: end;
  user-select: none;
`;

const HorizontalScroller = styled.div`
  ${TIMETABLE_SCROLL_STYLE}

  flex: 1 0 0;

  overflow-y: hidden;
`;

export default TimetableHorizontalScroller;
