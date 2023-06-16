import React from 'react';

import styled from '@emotion/styled';

import { shallow } from 'zustand/shallow';

import Category from '@/components/common/modal/Category';
import { Color, TITLE_STYLE } from '@/components/common/modal/styles';
import TimeStamp from '@/components/common/modal/Timestamp';
import Modal from '@/components/modal';
import { useEffectModal } from '@/hooks/useEffectModal';
import useHoveredPlanState from '@/stores/plan/hoveredPlan';

import { FONT_REGULAR_5 } from '@/styles/font';
import { getPositionByViewPort } from '@/utils/calendar/getPositionByViewPort';

const Hovered = () => {
  const { hoveredPlan, rect } = useHoveredPlanState(
    (state) => ({
      hoveredPlan: state.hoveredPlan,
      rect: state.rect,
    }),
    shallow,
  );

  const [plan, ref] = useEffectModal({ initialPlan: hoveredPlan });

  if (!plan) return null;

  const { startTime, endTime, title, type, categoryId, color } = plan;
  const position = getPositionByViewPort(rect, {
    width: 300,
    height: categoryId === null ? 100 : 150,
  });

  return (
    <HoveredModal ref={ref} isCloseBtn={false} css={position}>
      <Color width={12} height={12} backgroundColor={color} />
      <h3 css={TITLE_STYLE}>{title}</h3>
      {categoryId !== null && <Category categoryId={categoryId} />}
      <TimeStamp startTime={startTime} endTime={endTime} type={type} />
    </HoveredModal>
  );
};

const HoveredModal = styled(Modal)`
  opacity: 0;

  z-index: 101;

  display: flex;
  flex-direction: column;
  width: 300px;

  padding: 1rem;

  border-radius: 10px;

  gap: 0.8rem;
  box-shadow: 1px 10px 25px rgba(0, 0, 0, 0.25);

  transition: opacity 0.3s;

  ${FONT_REGULAR_5}
`;

export default Hovered;
