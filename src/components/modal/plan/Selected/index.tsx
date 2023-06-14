import React from 'react';

import styled from '@emotion/styled';
import { shallow } from 'zustand/shallow';

import TagButton from '@/components/buttons/TagButton';
import Category from '@/components/common/modal/Category';
import { COLOR, TITLE } from '@/components/common/modal/styles';
import TimeStamp from '@/components/common/modal/Timestamp';
import ModalContainer from '@/components/modal';
import { useEffectModal } from '@/hooks/useEffectModal';
import useSelectedPlanState from '@/stores/plan/selectedPlan';
import { FONT_REGULAR_5 } from '@/styles/font';
import { getPositionByViewPort } from '@/utils/calendar/getPositionByViewPort';

const Selected = () => {
  const { selectedPlan, rect, clearPlan } = useSelectedPlanState(
    (state) => ({
      selectedPlan: state.selectedPlan,
      rect: state.rect,
      clearPlan: state.clearSelectedPlan,
    }),
    shallow,
  );

  const [plan, ref] = useEffectModal({
    initialPlan: selectedPlan,
    delay: 0,
  });

  if (!plan) return <></>;

  const { title, color, startTime, endTime, type, tags, categoryId } = plan;
  const position = getPositionByViewPort(rect, {
    width: 350,
    height: categoryId === null ? 160 : 210,
  });

  return (
    <Modal
      ref={ref}
      isCloseBtn={true}
      onClose={clearPlan}
      HeaderLeftComponent={
        <div
          css={COLOR({
            width: 14,
            height: 14,
            backgroundColor: color,
          })}
        />
      }
      css={{ ...position }}
    >
      <h3 css={TITLE}>{title}</h3>
      {categoryId !== null && <Category categoryId={categoryId} />}
      <TimeStamp startTime={startTime} endTime={endTime} type={type} />
      <TagList>
        {tags.map((tag) => (
          <TagButton key={tag}>{tag}</TagButton>
        ))}
      </TagList>
    </Modal>
  );
};

const Modal = styled(ModalContainer)`
  opacity: 0;

  display: flex;
  flex-direction: column;
  width: 350px;

  padding: 1rem;

  border-radius: 10px;

  transition: all 0.3s;

  gap: 0.8rem;
  box-shadow: 1px 10px 25px rgba(0, 0, 0, 0.25);

  &.is-show {
    opacity: 1;
  }

  ${FONT_REGULAR_5}
`;

const TagList = styled.div`
  display: flex;

  gap: 0.3rem;
`;

export default Selected;
