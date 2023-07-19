import React, { PropsWithChildren, createContext, useContext } from 'react';

import styled from '@emotion/styled';

import useTimetableScroll, {
  TTimetableScrollController,
} from '@/hooks/useTimetableScroll';
import { FONT_BOLD_8 } from '@/styles/font';
import { TIMETABLE_SCROLL_STYLE } from '@/styles/timetable';

type TCompounds = {
  Horizontal: typeof HorizontalScroll;
  Vertical: typeof VerticalScroll;
};

const Context = createContext<TTimetableScrollController | null>(null);

const TimetableScroll: React.FC<PropsWithChildren> & TCompounds = ({
  children,
}) => {
  const controller = useTimetableScroll();
  return <Context.Provider value={controller}>{children}</Context.Provider>;
};

type THorizontalScrollProps = PropsWithChildren<{
  className?: string;
  fixedComponent?: React.ReactNode;
  scrollId?: string;
  showScroll?: boolean;
}>;

const HorizontalScroll: React.FC<THorizontalScrollProps> = ({
  className,
  fixedComponent,
  children,
  scrollId,
  showScroll,
}) => {
  const id = scrollId || '';
  const isReceiver = !showScroll && scrollId;
  const { signTag, onMoveHorizontalScroll } = useContext(Context) || {};

  const scrollCallbackRef: React.LegacyRef<HTMLDivElement> = (element) => {
    if (isReceiver && signTag) {
      signTag({ id, ref: element });
    }
  };

  // children 주의사항
  //// 하위 컴포넌트가 display: flex 을 가지지 않으면 width 를 지정해주어야 한다
  return (
    <FlexibleContainer className={className}>
      <FixedDiv>{fixedComponent}</FixedDiv>
      <HorizontalScrollDiv
        css={{ overflowX: showScroll ? 'auto' : 'hidden' }}
        ref={scrollCallbackRef}
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

const VerticalScroll = styled.div`
  ${TIMETABLE_SCROLL_STYLE}

  flex: 1 0 0;
  min-width: 100%;

  overflow-x: hidden;
  overflow-y: scroll;
`;

TimetableScroll.Horizontal = HorizontalScroll;
TimetableScroll.Vertical = VerticalScroll;
export default TimetableScroll;
