import React, { FormEvent, useRef, useState } from 'react';

import styled from '@emotion/styled';

import ModalContainer from './index';
import StylishButton from '@/components/buttons/StylishButton';
import ColorPicker from '@/components/common/ColorPicker';
import Input from '@/components/common/Input';
import { useCategoryQuery } from '@/hooks/rq/category';
import { FONT_BOLD_1, FONT_REGULAR_5 } from '@/styles/font';
import { TColor } from '@/types';
import { SELECTABLE_COLOR } from '@/utils/constants';

type TCategoryModalProps = {
  onClose: () => void;
  onDone: (obj: { categoryName: string; color: TColor }) => void;
  isEdit?: boolean;
  categoryName?: string;
  color?: TColor;
};

type TCategoryModal = React.FC<TCategoryModalProps>;

const CategoryModal: TCategoryModal = ({
  onClose,
  onDone,
  isEdit,
  categoryName: originalCategoryName = '',
  color: originalColor = SELECTABLE_COLOR[0],
}: TCategoryModalProps) => {
  const { data: categoryData } = useCategoryQuery();
  const inputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const [selectedColor, setSelectedColor] = useState<TColor>(originalColor);
  const [error, setError] = useState<string>('');
  const [newCategoryName, setNewCategoryName] =
    useState<string>(originalCategoryName);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkCategoryValid()) return;
    onDone({ categoryName: newCategoryName, color: selectedColor });
  };

  const checkCategoryValid = () => {
    if (newCategoryName === originalCategoryName) {
      setError('카테고리 이름을 변경해야 합니다.');
      return false;
    } else if (
      categoryData?.some((category) => category.name === newCategoryName.trim())
    ) {
      setError('중복된 이름의 카테고리가 있습니다');
      return false;
    }
    return true;
  };

  return (
    <Modal
      onClose={onClose}
      isBgBlack={true}
      HeaderLeftComponent={
        <ColorPicker
          selectedColor={selectedColor}
          onSelect={(color: TColor) => setSelectedColor(color)}
        />
      }
    >
      <Form onSubmit={onSubmit}>
        <CategoryInput
          ref={inputRef}
          type="text"
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setNewCategoryName((e.target as HTMLInputElement).value)
          }
          value={newCategoryName}
          placeholder="카테고리 이름"
          isInline={true}
        />
        <Warning>{error}</Warning>
        <StylishButton
          type="submit"
          isColor={true}
          size="large"
          disabled={!newCategoryName}
        >
          {isEdit ? '수정' : '생성'}
        </StylishButton>
      </Form>
    </Modal>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  row-gap: 10px;
`;

const Modal = styled(ModalContainer)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 24px;
  box-shadow: 1px 10px 25px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

const CategoryInput = styled(Input)`
  padding: 15px 0;
  ${FONT_BOLD_1};
`;

const Warning = styled.div`
  width: 100%;
  height: 17px;
  text-align: left;
  color: ${({ theme }) => theme.red_dark};
  ${FONT_REGULAR_5}
`;

export type { TCategoryModalProps };
export default CategoryModal;
