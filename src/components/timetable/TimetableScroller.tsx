import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import styled from '@emotion/styled';

import useTimetableScroll, {
  TTimetableScrollController,
} from '@/hooks/useTimetableScroll';
import { FONT_BOLD_8 } from '@/styles/font';
import { TIMETABLE_SCROLL_STYLE } from '@/styles/timetable';

type TCompounds = {
  HorizontalScroller: typeof HorizontalScroller;
};

const Context = createContext<TTimetableScrollController | null>(null);

const TimetableScroller: React.FC<PropsWithChildren> & TCompounds = ({
  children,
}) => {
  const controller = useTimetableScroll();
  return <Context.Provider value={controller}>{children}</Context.Provider>;
};

type THorizontalScrollerProps = PropsWithChildren<{
  className?: string;
  fixedComponent?: React.ReactNode;
  scrollId?: string;
  showScroll?: boolean;
}>;

const HorizontalScroller: React.FC<THorizontalScrollerProps> = ({
  className,
  fixedComponent,
  children,
  scrollId,
  showScroll,
}) => {
  const id = scrollId || '';
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { registTag, removeTag, onMoveHorizontalScroll } =
    useContext(Context) || {};

  if (!showScroll && scrollId) {
    useEffect(() => {
      return () => removeTag?.(id);
    }, []);

    useMemo(
      () => registTag?.({ id, ref: scrollerRef.current }),
      [scrollerRef.current],
    );
  }

  // children 주의사항
  //// 하위 컴포넌트가 display: flex 을 가지지 않으면 width 를 지정해주어야 한다
  return (
    <FlexibleContainer className={className}>
      <FixedDiv>{fixedComponent}</FixedDiv>
      <HorizontalScrollDiv
        css={{ overflowX: showScroll ? 'auto' : 'hidden' }}
        ref={scrollerRef}
        onScroll={onMoveHorizontalScroll}
      >
        {children}
      </HorizontalScrollDiv>
    </FlexibleContainer>
  );
};

const FlexibleContainer = styled.div`
  display: flex;
  overflow: hidden;

  border-bottom: 1px solid ${({ theme }) => theme.border2};
`;

const FixedDiv = styled.div`
  ${FONT_BOLD_8}

  flex: 0 0 4rem;

  color: ${({ theme }) => theme.text4};
  background-color: ${({ theme }) => theme.background1};
  text-align: end;
  user-select: none;
`;

const HorizontalScrollDiv = styled.div`
  ${TIMETABLE_SCROLL_STYLE}

  flex: 1 0 0;

  overflow-y: hidden;
`;

TimetableScroller.HorizontalScroller = HorizontalScroller;
export default TimetableScroller;
