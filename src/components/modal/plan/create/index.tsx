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
import {
  useCreatePlanMutation,
  useUpdatePlanMutation,
} from '@/hooks/query/plan';
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
  const category = useCategoryQuery();

  const onCloseHandler = () => {
    onClose?.();
    clearPlan();
  };

  const onSubmit = async () => {
    if (!focusedPlan) {
      return;
    }

    // *: React-Query의 Category 값과 동기화시키고 서버에 데이터 값을 보낸다.
    /// Category 값이 없음에도 categoryId 값이 있는 것으로 보낼 수 있기 때문이다.
    /// + 서버에서는 categoryId 값에 대한 Validation을 하고 있다.
    /// + 클라이언트도 React-Query의 categoryId 값이 있는지에 대해 Validation을 해주는 것이 맞다고 판단
    if (!category) {
      focusedPlan.categoryId = null;
    }

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
