import React, { useEffect, useRef } from 'react';

import styled from '@emotion/styled';

import TimeStamp from '@/components/common/modal/Timestamp';
import Modal from '@/components/modal';
import useHoveredPlanState from '@/stores/plan/hoveredPlan';

import { FONT_REGULAR_4, FONT_REGULAR_5 } from '@/styles/font';
import { getPositionByViewPort } from '@/utils/calendar/getPositionByViewPort';

const Hovered = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { hoveredPlan, rect } = useHoveredPlanState();

  useEffect(() => {
    if (!ref.current || !hoveredPlan) return;

    const { width, height } = ref.current.getBoundingClientRect();

    const rec = getPositionByViewPort(rect, { width, height });

    ref.current.style.top = `${rec.top}px`;
    ref.current.style.left = `${rec.left}px`;
  }, [hoveredPlan, ref.current]);

  if (!hoveredPlan) return <></>;

  const { startTime, endTime, title, type } = hoveredPlan;

  return (
    hoveredPlan && (
      <HoveredModal ref={ref} isCloseBtn={false}>
        <div>카테고리</div>
        <div css={FONT_REGULAR_4}>{title}</div>
        <TimeStamp startTime={startTime} endTime={endTime} type={type} />
      </HoveredModal>
    )
  );
};

const HoveredModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  width: 300px;

  padding: 1rem;

  border-radius: 10px;

  gap: 0.5rem;
  box-shadow: 1px 10px 25px rgba(0, 0, 0, 0.25);

  & > div {
    ${FONT_REGULAR_5}
    white-space: pre-wrap;
    word-break: break-all;
    flex: 1;
  }
`;

export default Hovered;
