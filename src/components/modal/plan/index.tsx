import React, { useState } from 'react';

import styled from '@emotion/styled';

import ModalContainer from '..';

import StylishButton from '@/components/buttons/StylishButton';
import ColorPicker from '@/components/common/ColorPicker';
import Input from '@/components/common/Input';
import ChevronIcon from '@/components/icons/ChevronIcon';
import PlanAllDay from '@/components/modal/plan/PlanAllDay';
import PlanCategory from '@/components/modal/plan/PlanCategory';
import PlanMemo from '@/components/modal/plan/PlanMemo';
import PlanTag from '@/components/modal/plan/PlanTag';
import { SELECTABLE_COLOR } from '@/constants';
import { useCategoryQuery } from '@/hooks/rq/category';
import { FONT_BOLD_1 } from '@/styles/font';
import { TColor } from '@/types';

type TPlanModalProps = {
  onClose: () => void;
  onDone: (obj: any) => void;
};

type TPlanModal = React.FC<TPlanModalProps>;

const PlanModal: TPlanModal = ({ onClose, onDone }: TPlanModalProps) => {
  const { data: categoryData } = useCategoryQuery();
  const [selectedColor, setSelectedColor] = useState<TColor>(
    SELECTABLE_COLOR[0],
  );
  const [planName, setPlanName] = useState('');

  const onSubmit = () => {
    console.log('클릭');
  };

  return (
    <Modal
      onClose={onClose}
      isBgBlack={true}
      HeaderLeftComponent={
        <ColorPicker
          selectedColor={selectedColor}
          onSelect={(color: TColor) => setSelectedColor(color)}
          additionalComponent={
            <ChevronIcon width="14" type="down" color="black" />
          }
        />
      }
    >
      <PlanInput
        type="text"
        isInline={true}
        placeholder="일정 제목"
        value={planName}
        onChange={(e) => setPlanName(e.target.value)}
      />
      <PlanAllDay />
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
        // disabled={!newCategoryName}
      >
        생성
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

const PlanInput = styled(Input)`
  padding: 15px 0;
  ${FONT_BOLD_1};
`;

const Hr = styled.hr`
  width: 100%;
  height: 1px;
  border: none;
  background-color: ${({ theme }) => theme.background3};
`;
export default PlanModal;
