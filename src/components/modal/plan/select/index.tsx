import React, { useEffect } from 'react';

import styled from '@emotion/styled';

import { PencilIcon, TrashcanIcon } from '@/components/common/icons';
import Category from '@/components/common/modal/Category';
import { Color, TITLE_STYLE } from '@/components/common/modal/styles';
import TimeStamp from '@/components/common/modal/Timestamp';
import TagButton from '@/components/core/buttons/TagButton';
import ModalContainer from '@/components/modal/ModalPortal';
import { toast } from '@/core/toast';
import { useDeletePlanMutation } from '@/hooks/query/plan';
import { useEffectModal } from '@/hooks/useEffectModal';
import useModalState from '@/stores/modal';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import useSelectedPlanState from '@/stores/plan/selectedPlan';
import { FONT_REGULAR_5 } from '@/styles/font';

const SelectedPlanModal = () => {
  const { mutate } = useDeletePlanMutation();

  const editDragPlan = useFocusedPlanState((state) => state.editDragPlan);
  const openModal = useModalState((state) => state.openModal);

  const { dom, initialPlan, clearSelectedPlan } = useSelectedPlanState(
    (state) => ({
      dom: state.dom,
      initialPlan: state.selectedPlan,
      clearSelectedPlan: state.clearSelectedPlan,
    }),
  );

  const [plan, ref] = useEffectModal({
    initialPlan,
    rect: dom?.getBoundingClientRect(),
    delay: 0,
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const element = target.closest('.is_selected');

      if (element || !(ref.current && !ref.current.contains(target))) return;

      clearSelectedPlan();
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  if (!plan) return null;

  const {
    id,
    title,
    description,
    color,
    startTime,
    endTime,
    tags,
    categoryId,
    isAllDay,
  } = plan;

  const deletePlan = () => {
    mutate(id, {
      onSuccess: () => {
        clearSelectedPlan();
        toast(`${title} 일정이 삭제되었습니다`);
      },
      onError: () => {
        toast('일정 삭제에 실패했습니다');
      },
    });
  };

  const editPlan = () => {
    editDragPlan(plan);
    openModal();
    clearSelectedPlan();
  };

  return (
    <Modal
      ref={ref}
      isCloseBtn={true}
      onClose={clearSelectedPlan}
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
    >
      <h3 css={TITLE_STYLE}>{title}</h3>
      {description && <p css={{ whiteSpace: 'pre-wrap' }}>{description}</p>}
      <Category categoryId={categoryId} />
      <TimeStamp startTime={startTime} endTime={endTime} hasTime={!isAllDay} />
      <TagList>
        {tags.map((tag) => (
          <TagButton key={tag}>{tag}</TagButton>
        ))}
      </TagList>
    </Modal>
  );
};

const Modal = styled(ModalContainer)`
  position: absolute;

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

export default SelectedPlanModal;
