import React, { useEffect } from 'react';

import styled from '@emotion/styled';

import { shallow } from 'zustand/shallow';

import Category from '@/components/common/modal/Category';
import { Color, TITLE_STYLE } from '@/components/common/modal/styles';
import TimeStamp from '@/components/common/modal/Timestamp';
import Modal from '@/components/modal/ModalPortal';
import { useEffectModal } from '@/hooks/useEffectModal';
import useHoveredPlanState from '@/stores/plan/hoveredPlan';

import useSelectedPlanState from '@/stores/plan/selectedPlan';
import { FONT_REGULAR_5 } from '@/styles/font';

const HoveredPlanModal = () => {
  const { hoveredPlan, dom, clearHoveredPlan } = useHoveredPlanState(
    ({ hoveredPlan, dom, clearHoveredPlan }) => ({
      hoveredPlan,
      dom,
      clearHoveredPlan,
    }),
    shallow,
  );
  const selectedPlan = useSelectedPlanState((state) => state.selectedPlan);

  const [plan, ref] = useEffectModal({
    initialPlan: hoveredPlan,
    rect: dom?.getBoundingClientRect(),
    delay: 0,
  });

  useEffect(() => {
    if (!selectedPlan) return;

    clearHoveredPlan();
  }, [selectedPlan]);

  if (!plan) return null;

  const { startTime, endTime, title, isAllDay, categoryId, color } = plan;

  return (
    <HoveredModal ref={ref} isCloseBtn={false}>
      <Color width={12} height={12} backgroundColor={color} />
      <h3 css={TITLE_STYLE}>{title}</h3>
      <Category categoryId={categoryId} />
      <TimeStamp startTime={startTime} endTime={endTime} hasTime={!isAllDay} />
    </HoveredModal>
  );
};

const HoveredModal = styled(Modal)`
  position: absolute;

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

export default HoveredPlanModal;
