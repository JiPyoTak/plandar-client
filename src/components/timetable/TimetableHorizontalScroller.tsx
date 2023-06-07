import React, { PropsWithChildren, useEffect, useMemo, useRef } from 'react';

import styled from '@emotion/styled';

import { FONT_BOLD_8 } from '@/styles/font';
import { TIMETABLE_SCROLL_STYLE } from '@/styles/timetable';

type TProps = PropsWithChildren<{
  className?: string;
  fixedComponent?: React.ReactNode;
  scrollId?: string;
  scrollerController?: {
    registTag?: (arg: { id: string; ref: HTMLDivElement | null }) => void;
    removeTag?: (id: string) => void;
  };
  onScroll?: React.UIEventHandler<HTMLElement>;
  showScroll?: boolean;
}>;

const TimetableHorizontalScroller: React.FC<TProps> = ({
  className,
  fixedComponent,
  children,
  scrollId,
  scrollerController,
  onScroll,
  showScroll,
}) => {
  const id = scrollId || '';
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { registTag, removeTag } = scrollerController || {};

  useEffect(() => {
    return () => removeTag?.(id);
  }, []);

  useMemo(
    () => registTag?.({ id, ref: scrollerRef.current }),
    [scrollerRef.current],
  );

  // children 주의사항
  //// 하위 컴포넌트가 display: flex 을 가지지 않으면 width 를 지정해주어야 한다
  return (
    <FlexibleContainer className={className}>
      <GuideComponent>{fixedComponent}</GuideComponent>
      <HorizontalScroller
        css={{ overflowX: showScroll ? 'auto' : 'hidden' }}
        ref={scrollerRef}
        onScroll={onScroll}
      >
        {children}
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
