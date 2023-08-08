import React, { ComponentProps, FormEvent, useState } from 'react';

import styled from '@emotion/styled';

import ColorPicker from '@/components/common/color-picker';
import ChevronIcon from '@/components/common/icons/ChevronIcon';
import StylishButton from '@/components/core/buttons/StylishButton';
import Input from '@/components/core/Input';
import ModalContainer from '@/components/modal/ModalPortal';
import { SELECTABLE_COLOR } from '@/constants';
import { toast } from '@/core/toast';
import {
  useCategoryCreate,
  useCategoryDelete,
  useCategoryQuery,
  useCategoryUpdate,
} from '@/hooks/query/category';
import useCategoryModalState from '@/stores/modal/category';
import { ColorCircle } from '@/styles/category';
import { FONT_BOLD_1, FONT_REGULAR_5 } from '@/styles/font';
import { TColor } from '@/types';

const DEFAULT_NAME = '';
const DEFAULT_COLOR = SELECTABLE_COLOR[0];

// isOpen에 따라 Category Modal State를 리셋해줌에 따라 initial State를 original Category 값을 넣을 수 있다.
const CategoryModal: React.FC<ComponentProps<typeof CategoryModalViewer>> = (
  props,
) => {
  const isOpen = useCategoryModalState(({ isOpen }) => isOpen);

  if (!isOpen) {
    return <></>;
  }

  return <CategoryModalViewer {...props} />;
};

const CategoryModalViewer: React.FC<object> = () => {
  const { type, id, closeCategoryModal } = useCategoryModalState();

  const originalCategory = useCategoryQuery({ id });
  const { data: categoryData } = useCategoryQuery();
  const { mutate: createCategory } = useCategoryCreate();
  const { mutate: updateCategory } = useCategoryUpdate();
  const { mutate: deleteCategory } = useCategoryDelete();

  const [newName, setNewName] = useState<string>(
    originalCategory?.name ?? DEFAULT_NAME,
  );
  const [selectedColor, setSelectedColor] = useState<TColor>(
    originalCategory?.color ?? DEFAULT_COLOR,
  );
  const [error, setError] = useState<string>('');
  const isEdit = type === 'edit';
  const actionText = isEdit ? '수정' : '생성';

  const checkCategoryValid = () => {
    // 색상 혹은 이름 변경 여부 검사
    if (
      newName === originalCategory?.name &&
      selectedColor === originalCategory?.color
    ) {
      setError('카테고리 이름 혹은 색상을 변경해야 합니다.');

      return false;
    }
    // 동일한 이름의 카테고리가 존재하는지 검사
    else if (
      categoryData?.some(
        (category) =>
          category.id !== originalCategory?.id &&
          category.name === newName.trim(),
      )
    ) {
      setError('중복된 이름의 카테고리가 있습니다');

      return false;
    }

    return true;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkCategoryValid()) return;

    try {
      const newData = { name: newName, color: selectedColor };
      if (type === 'create') {
        createCategory(newData);
      } else if (isEdit && id !== null) {
        updateCategory({ id, ...newData });
      }
      closeCategoryModal();
      toast(
        <div>
          <ColorCircle color={newData.color} />
          {` ${newData.name} `}
          카테고리를 {actionText}했습니다
        </div>,
      );
    } catch (e) {
      toast('카테고리 생성에 실패했습니다');
    }
  };

  const onDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // *: prevent from submit
    e.preventDefault();
    // *: if editing or no category info, don't execute
    if (!isEdit || !originalCategory) return;

    try {
      deleteCategory(originalCategory);
      closeCategoryModal();
      toast(
        <div>
          <ColorCircle color={originalCategory.color} />
          {` ${originalCategory.name} `}
          카테고리를 삭제했습니다
        </div>,
      );
    } catch (e) {
      toast('카테고리 삭제에 실패했습니다');
    }
  };

  return (
    <Modal
      onClose={closeCategoryModal}
      isBgBlack={true}
      HeaderLeftComponent={
        <ColorPicker
          selectedColor={selectedColor}
          onSelect={(color: TColor) => setSelectedColor(color)}
          additionalComponent={
            <ChevronIcon type="down" color="black" width="14" />
          }
        />
      }
    >
      <Form onSubmit={onSubmit}>
        <CategoryInput
          type="text"
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setNewName((e.target as HTMLInputElement).value)
          }
          value={newName}
          placeholder="카테고리 이름"
          isInline={true}
        />
        <Warning>{error}</Warning>
        <ButtonContainer>
          {isEdit && (
            <ErrorButton
              type="button"
              size="large"
              disabled={!newName}
              onClick={onDelete}
            >
              삭제
            </ErrorButton>
          )}
          <StylishButton
            type="submit"
            isColor={true}
            size="large"
            disabled={!newName}
          >
            {actionText}
          </StylishButton>
        </ButtonContainer>
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

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  column-gap: 1rem;
`;

const ErrorButton = styled(StylishButton)`
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.red_dark};

  &:hover {
    background-color: ${({ theme }) => theme.red};
  }
`;

export default CategoryModal;
