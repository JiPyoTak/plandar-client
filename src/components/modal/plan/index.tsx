import React from 'react';

import styled from '@emotion/styled';

import { shallow } from 'zustand/shallow';

import ModalContainer from '..';

import StylishButton from '@/components/buttons/StylishButton';
import PlanAllDay from '@/components/modal/plan/PlanAllDay';
import PlanCategory from '@/components/modal/plan/PlanCategory';
import PlanColorPicker from '@/components/modal/plan/PlanColorPicker';
import PlanDate from '@/components/modal/plan/PlanDate';
import PlanMemo from '@/components/modal/plan/PlanMemo';
import PlanTag from '@/components/modal/plan/PlanTag';
import PlanTitleInput from '@/components/modal/plan/PlanTitleInput';
import { useCreatePlanMutation, useUpdatePlanMutation } from '@/hooks/rq/plan';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import { ColorCircle } from '@/styles/category';
import { toast } from '@/toast';

type TPlanModalProps = {
  onClose?: () => void;
  onDone?: () => void;
  openModal?: boolean;
};

type TPlanModal = React.FC<TPlanModalProps>;

const PlanModal: TPlanModal = ({
  openModal: initOpenModal,
  onClose,
  onDone,
}: TPlanModalProps) => {
const { focusedPlan, openModal, clearPlan, isDisabled, isEdit } =
    useFocusedPlanState(
      ({ focusedPlan, isDragging, clearDraggedPlan, type }) => ({
        focusedPlan,
        openModal: initOpenModal || (!isDragging && !!focusedPlan),
        clearPlan: clearDraggedPlan,
        isDisabled: !focusedPlan?.startTime || !focusedPlan?.endTime,
        isEdit: type === 'edit',
      }),
      shallow,
    );
  const { mutateAsync: createMutate } = useCreatePlanMutation();
  const { mutateAsync: updateMutate } = useUpdatePlanMutation();

  const onCloseHandler = () => {
    onClose?.();
    clearPlan();
  };

  const onSubmit = async () => {
    if (!focusedPlan) return;
    const { id, ...rest } = focusedPlan;

    try {
      if (isEdit) {
        await updateMutate({ id, ...rest });
        toast(
          <div>
            <ColorCircle color={focusedPlan.color} />
            {` ${focusedPlan.title}`} 으로 일정을 수정했습니다
          </div>,
        );
      } else {
        await createMutate(rest);
        toast(
          <div>
            <ColorCircle color={focusedPlan.color} />
            {` ${focusedPlan.title}`} 일정을 생성했습니다
          </div>,
        );
      }
      onDone?.();
      clearPlan();
    } catch (e) {
      toast(`일정 ${isEdit ? '수정' : '생성'}에 실패했습니다.`);
    }
  };

  if (!openModal) {
    return null;
  }

  return (
    <Modal
      onClose={onCloseHandler}
      isBgBlack={true}
      HeaderLeftComponent={<PlanColorPicker />}
    >
      <PlanTitleInput />
      <PlanDate />
      <PlanAllDay />
      <Hr />
      <PlanMemo />
      <Hr />
      <PlanCategory />
      <Hr />
      <PlanTag />
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
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 400px;
  padding: 24px;
  box-shadow: 1px 10px 25px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

const Hr = styled.hr`
  width: 100%;
  height: 1px;
  border: none;
  background-color: ${({ theme }) => theme.border1};
`;

export default PlanModal;
