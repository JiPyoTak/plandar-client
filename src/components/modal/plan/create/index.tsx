import React from 'react';

import styled from '@emotion/styled';

import { shallow } from 'zustand/shallow';

import StylishButton from '@/components/core/buttons/StylishButton';
import ModalContainer from '@/components/modal/ModalPortal';
import PlanDate from '@/components/modal/plan/create/plan-date';
import PlanAllDay from '@/components/modal/plan/create/PlanAllDay';
import PlanCategory from '@/components/modal/plan/create/PlanCategory';
import PlanColorPicker from '@/components/modal/plan/create/PlanColorPicker';
import PlanMemo from '@/components/modal/plan/create/PlanMemo';
import PlanTag from '@/components/modal/plan/create/PlanTag';
import PlanTitleInput from '@/components/modal/plan/create/PlanTitleInput';
import { toast } from '@/core/toast';
import { useCategoryQuery } from '@/hooks/query/category';
import { useCreatePlan, useUpdatePlan } from '@/hooks/query/plan';
import useCreateModalState from '@/stores/modal/create';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import { ColorCircle } from '@/styles/category';

type TCreatePlanModalProps = {
  onClose?: () => void;
  onDone?: () => void;
  openModal?: boolean;
};

type TCreatePlanModal = React.FC<TCreatePlanModalProps>;

const CreatePlanModal: TCreatePlanModal = ({
  openModal: initOpenModal,
  onClose,
  onDone,
}: TCreatePlanModalProps) => {
  const { focusedPlan, isDisabled, isEdit, clearPlan } = useFocusedPlanState(
    ({ focusedPlan, clearDraggedPlan, type }) => ({
      focusedPlan,
      isEdit: type === 'edit',
      isDisabled: !focusedPlan?.startTime || !focusedPlan?.endTime,
      clearPlan: clearDraggedPlan,
    }),
    shallow,
  );

  const [isOpen, closeModal] = useCreateModalState(
    (state) => {
      return [(initOpenModal || state.isOpen) && focusedPlan, state.closeModal];
    },
    (prev, cur) => prev === cur,
  );

  const { mutateAsync: createMutate } = useCreatePlan();
  const { mutateAsync: updateMutate } = useUpdatePlan();
  const category = useCategoryQuery();

  const onCloseHandler = () => {
    onClose?.();
    clearPlan();
    closeModal();
  };

  const onSubmit = async () => {
    if (!focusedPlan) {
      return;
    }

    if (!category) {
      focusedPlan.categoryId = null;
    }

    const message = isEdit ? '수정' : '생성';

    const id = isEdit ? focusedPlan.id : undefined;
    const mutate = isEdit ? updateMutate : createMutate;

    try {
      await mutate({ ...focusedPlan, id });

      toast(
        <div>
          <ColorCircle color={focusedPlan.color} />
          {`${focusedPlan.title} 일정을 ${message}했습니다.`}
        </div>,
      );
      onDone?.();
      clearPlan();
    } catch (e) {
      toast(`일정 ${message}에 실패했습니다.`);
    } finally {
      onCloseHandler();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      isBgBlack={true}
      onClose={onCloseHandler}
      HeaderLeftComponent={<PlanColorPicker />}
    >
      <Inner>
        <PlanTitleInput />
        <PlanDate />
        <PlanAllDay />
        {[PlanMemo, PlanCategory, PlanTag].map((Component) => (
          <BorderBox key={Component.name}>
            <Component />
          </BorderBox>
        ))}
      </Inner>
      <StylishButton
        isColor={true}
        size="large"
        onClick={onSubmit}
        css={{ marginTop: 20 }}
        disabled={isDisabled}
      >
        {isEdit ? '수정' : '생성'}
      </StylishButton>
    </Modal>
  );
};

const Modal = styled(ModalContainer)`
  display: flex;
  flex-direction: column;

  min-width: 400px;
  max-height: 80vh;

  padding: 24px;
  box-shadow: 1px 10px 25px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

const Inner = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;

  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BorderBox = styled.div`
  width: 100%;
  padding: 0.5rem 0;

  border-top: 1px solid ${({ theme }) => theme.border1};
`;

export default CreatePlanModal;
