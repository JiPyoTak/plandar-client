import React, { PropsWithChildren, createContext, useContext } from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import useTimetableScroll, {
  TTimetableScrollController,
} from '@/hooks/useTimetableScroll';
import useSelectedPlanState from '@/stores/plan/selectedPlan';
import { FONT_BOLD_8 } from '@/styles/font';
import {
  TIMETABLE_HIDE_SCROLL_STYLE,
  TIMETABLE_SCROLL_STYLE,
  TIMETABLE_SCROLL_WIDTH,
} from '@/styles/timetable';

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
  const theme = useTheme();
  const id = scrollId || '';
  const isReceiver = !showScroll && scrollId;
  const { signTag, onMoveHorizontalScroll } = useContext(Context) || {};

  const scrollCallbackRef: React.LegacyRef<HTMLDivElement> = (element) => {
    if (signTag) {
      signTag({ id, ref: element });
    }
  };

  // children 주의사항
  //// 하위 컴포넌트가 display: flex 을 가지지 않으면 width 를 지정해주어야 한다
  return (
    <FlexibleContainer className={className}>
      <FixedDiv>{fixedComponent}</FixedDiv>
      <HorizontalScrollDiv
        css={
          isReceiver
            ? TIMETABLE_HIDE_SCROLL_STYLE
            : TIMETABLE_SCROLL_STYLE({ theme })
        }
        ref={scrollCallbackRef}
        onScroll={onMoveHorizontalScroll}
      >
        {children}
      </HorizontalScrollDiv>
    </FlexibleContainer>
  );
};

type TVerticalScrollProps = PropsWithChildren<{
  className?: string;
}>;

const VerticalScroll: React.FC<TVerticalScrollProps> = ({
  children,
  className,
}) => {
  const selectedPlanId = useSelectedPlanState(
    (state) => state.selectedPlan?.id,
    (prev, next) => prev === next,
  );
  const showScroll = !selectedPlanId;

  return (
    <VerticalFlexibleContainer className={className}>
      <VerticalScrollDiv css={{ overflowY: showScroll ? 'scroll' : 'hidden' }}>
        {children}
      </VerticalScrollDiv>
      {!showScroll && (
        <div css={{ flex: `0 0 ${TIMETABLE_SCROLL_WIDTH}` }}></div>
      )}
    </VerticalFlexibleContainer>
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
  flex: 1 0 0;

  overflow-x: auto;
  overflow-y: hidden;
`;

const VerticalFlexibleContainer = styled.div`
  flex: 1 0 0;
  min-width: 100%;

  display: flex;
  overflow: hidden;
`;

const VerticalScrollDiv = styled.div`
  ${TIMETABLE_SCROLL_STYLE}

  flex: 1 0 0;
  overflow-x: hidden;
`;

TimetableScroll.Horizontal = HorizontalScroll;
TimetableScroll.Vertical = VerticalScroll;
export default TimetableScroll;
