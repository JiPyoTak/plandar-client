import React, { FormEvent, useRef, useState } from 'react';

import styled from '@emotion/styled';

import ModalContainer from './index';
import StylishButton from '@/components/buttons/StylishButton';
import ColorPicker from '@/components/common/ColorPicker';
import Input from '@/components/common/Input';
import { useCategoryQuery } from '@/hooks/rq/category';
import { FONT_BOLD_1, FONT_REGULAR_5 } from '@/styles/font';
import { TColor } from '@/types';
import { ICategoryWithoutId } from '@/types/rq/category';
import { SELECTABLE_COLOR } from '@/utils/constants';

type TCategoryModalProps = {
  onClose: () => void;
  onDone: (obj: { categoryName: string; color: TColor }) => void;
  isEdit?: boolean;
  category?: ICategoryWithoutId & { id?: number };
};

type TCategoryModal = React.FC<TCategoryModalProps>;

const CategoryModal: TCategoryModal = ({
  onClose,
  onDone,
  isEdit,
  category: originalCategory = { name: '', color: SELECTABLE_COLOR[0] },
}: TCategoryModalProps) => {
  const { data: categoryData } = useCategoryQuery();
  const inputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const [selectedColor, setSelectedColor] = useState<TColor>(
    originalCategory?.color,
  );
  const [error, setError] = useState<string>('');
  const [newCategoryName, setNewCategoryName] = useState<string>(
    originalCategory?.name,
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkCategoryValid()) return;
    onDone({ categoryName: newCategoryName.trim(), color: selectedColor });
  };

  const checkCategoryValid = () => {
    // 색상 혹은 이름 변경 여부 검사
    if (
      newCategoryName === originalCategory.name &&
      selectedColor === originalCategory.color
    ) {
      setError('카테고리 이름 혹은 색상을 변경해야 합니다.');
      return false;
    }
    // 동일한 이름의 카테고리가 존재하는지 검사
    else if (
      categoryData?.some(
        (category) =>
          category.id !== originalCategory?.id &&
          category.name === newCategoryName.trim(),
      )
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
