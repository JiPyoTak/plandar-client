import React from 'react';

import styled from '@emotion/styled';

import { shallow } from 'zustand/shallow';

import ModalContainer from '..';

import StylishButton from '@/components/buttons/StylishButton';
import DateDisplay from '@/components/modal/plan/DateDisplay';
import PlanAllDay from '@/components/modal/plan/PlanAllDay';
import PlanCategory from '@/components/modal/plan/PlanCategory';
import PlanColorPicker from '@/components/modal/plan/PlanColorPicker';
import PlanMemo from '@/components/modal/plan/PlanMemo';
import PlanTag from '@/components/modal/plan/PlanTag';
import PlanTitleInput from '@/components/modal/plan/PlanTitleInput';
import useFocusedPlanState from '@/stores/plan/focusedPlan';

type TPlanModalProps = {
  isEdit?: boolean;
  onClose?: () => void;
  onDone?: () => void;
  openModal?: boolean;
};

type TPlanModal = React.FC<TPlanModalProps>;

const PlanModal: TPlanModal = ({
  openModal: initOpenModal,
  isEdit = false,
  onClose,
  onDone,
}: TPlanModalProps) => {
  const { openModal, clearPlan, isDisabled } = useFocusedPlanState(
    ({ focusedPlan, isDragging, clearDraggedPlan }) => ({
      openModal: initOpenModal || (!isDragging && !!focusedPlan),
      clearPlan: clearDraggedPlan,
      isDisabled: !focusedPlan?.startTime || !focusedPlan?.endTime,
    }),
    shallow,
  );

  const onCloseHandler = () => {
    onClose?.();
    clearPlan();
  };

  const onSubmit = () => {
    // todo: 일정생성 api 호출
    onDone?.();
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
      <DateDisplay />
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
  width: 400px;
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
