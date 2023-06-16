import React, { useEffect } from 'react';

import styled from '@emotion/styled';
import { shallow } from 'zustand/shallow';

import TagButton from '@/components/buttons/TagButton';
import Category from '@/components/common/modal/Category';
import { Color, TITLE_STYLE } from '@/components/common/modal/styles';
import TimeStamp from '@/components/common/modal/Timestamp';
import { PencilIcon, TrashcanIcon } from '@/components/icons';
import ModalContainer from '@/components/modal';
import { useDeletePlanMutation } from '@/hooks/rq/plan';
import { useEffectModal } from '@/hooks/useEffectModal';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import useSelectedPlanState from '@/stores/plan/selectedPlan';
import { FONT_REGULAR_5 } from '@/styles/font';
import { getPositionByViewPort } from '@/utils/calendar/getPositionByViewPort';

const Selected = () => {
  const { mutate } = useDeletePlanMutation();

  const { focusedPlan, editDragPlan } = useFocusedPlanState(
    (state) => ({
      focusedPlan: state.focusedPlan,
      editDragPlan: state.editDragPlan,
    }),
    shallow,
  );

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

  useEffect(() => {
    if (!focusedPlan) return;

    clearPlan();
  }, [focusedPlan]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const element = target.closest('.is_selected');

      if (element || !(ref.current && !ref.current.contains(target))) return;

      clearPlan();
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  if (!plan) return null;

  const { title, color, startTime, endTime, tags, categoryId, isAllDay } = plan;
  const position = getPositionByViewPort(rect, {
    width: 350,
    height: categoryId === null ? 160 : 210,
  });

  const deletePlan = () => {
    mutate(plan.id);
    clearPlan();
  };

  const editPlan = () => {
    editDragPlan(plan);
  };

  return (
    <Modal
      ref={ref}
      isCloseBtn={true}
      onClose={clearPlan}
      HeaderLeftComponent={
        <Color width={12} height={12} backgroundColor={color} />
      }
      HeaderRightComponent={
        <>
          <button onClick={editPlan}>
            <PencilIcon />
          </button>
          <button onClick={deletePlan}>
            <TrashcanIcon />
          </button>
        </>
      }
      css={{ ...position }}
    >
      <h3 css={TITLE_STYLE}>{title}</h3>
      {categoryId !== null && <Category categoryId={categoryId} />}
      <TimeStamp startTime={startTime} endTime={endTime} isAllDay={isAllDay} />
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

  z-index: 100;

  padding: 1rem;

  border-radius: 10px;

  transition: all 0.3s;

  gap: 0.8rem;
  box-shadow: 1px 10px 25px rgba(0, 0, 0, 0.25);

  ${FONT_REGULAR_5}
`;

const TagList = styled.div`
  display: flex;

  gap: 0.3rem;
`;

export default Selected;