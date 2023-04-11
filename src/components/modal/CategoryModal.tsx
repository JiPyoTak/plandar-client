import React, { useRef, useState } from 'react';

import styled from '@emotion/styled';

import ModalContainer from './index';
import StylishButton from '@/components/buttons/StylishButton';
import ColorPicker from '@/components/common/ColorPicker';
import Input from '@/components/common/Input';
import { FONT_BOLD_1 } from '@/styles/font';
import { TSelectableColor } from '@/types';

const MOCK_CATEGORY = ['테스트 카테고리'];

type TCategoryModalProps = {
  isEdit?: boolean;
  categoryName?: string;
};

const CategoryModal = () => {
  const inputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const [selectedColor, setSelectedColor] =
    useState<TSelectableColor>('primary');

  return (
    <Modal
      isBgBlack={true}
      HeaderLeftComponent={
        <ColorPicker
          selectedColor={selectedColor}
          onSelect={(color: TSelectableColor) => setSelectedColor(color)}
        />
      }
    >
      <CategoryInput
        ref={inputRef}
        placeholder="카테고리 이름"
        isInline={true}
      />
      <StylishButton onClick={() => console.log('수정')} isColor={true}>
        수정
      </StylishButton>
    </Modal>
  );
};

const Modal = styled(ModalContainer)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 214px;
  padding: 24px;
  box-shadow: 1px 10px 25px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

const CategoryInput = styled(Input)`
  padding: 15px 0;
  ${FONT_BOLD_1};
`;

export default CategoryModal;
