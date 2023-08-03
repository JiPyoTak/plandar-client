import React, { FormEvent, useEffect, useLayoutEffect, useState } from 'react';

import styled from '@emotion/styled';

import { useQueryClient } from '@tanstack/react-query';

import ColorPicker from '@/components/common/color-picker';
import ChevronIcon from '@/components/common/icons/ChevronIcon';
import StylishButton from '@/components/core/buttons/StylishButton';
import Input from '@/components/core/Input';
import ModalContainer from '@/components/modal/ModalPortal';
import { SELECTABLE_COLOR } from '@/constants';
import { CATEGORY_KEY } from '@/constants/rqKeys';
import { toast } from '@/core/toast';
import {
  useCategoryCreate,
  useCategoryQuery,
  useCategoryUpdate,
} from '@/hooks/query/category';
import { ColorCircle } from '@/styles/category';
import { FONT_BOLD_1, FONT_REGULAR_5 } from '@/styles/font';
import { TColor } from '@/types';
import { ICategory } from '@/types/query/category';

type TEditId = number | null;

type TProps = {
  setEditableIdRef: React.MutableRefObject<
    React.Dispatch<React.SetStateAction<TEditId>> | undefined
  >;
};

const DEFAULT_NAME = '';
const DEFAULT_COLOR = SELECTABLE_COLOR[0];

const CategoryModal: React.FC<TProps> = ({ setEditableIdRef }) => {
  const [id, setId] = useState<TEditId>(null);
  const [newName, setNewName] = useState<string>(DEFAULT_NAME);
  const [selectedColor, setSelectedColor] = useState<TColor>(DEFAULT_COLOR);
  const queryClient = useQueryClient();
  const originalCategory = queryClient.getQueryData<ICategory>([
    CATEGORY_KEY,
    { id },
  ]);
  const { data: categoryData } = useCategoryQuery();
  const { mutate: categoryCreate } = useCategoryCreate();
  const { mutate: categoryUpdate } = useCategoryUpdate();

  const [error, setError] = useState<string>('');
  const actionText = id !== -1 ? '수정' : '생성';

  useEffect(() => {
    setEditableIdRef.current = setId;
  }, [setId]);
  useLayoutEffect(() => {
    const { name, color } = originalCategory ?? {};
    setNewName(name ?? '');
    setSelectedColor(color ?? SELECTABLE_COLOR[0]);
  }, [originalCategory]);

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
      if (id === -1) {
        categoryCreate(newData);
      } else if (id !== null && id > 0) {
        categoryUpdate({ id, ...newData });
      }
      setId(null);
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

  // id 대상이 없으면 수정, 추가 무엇도 아니다
  if (id === null) {
    return <></>;
  }

  return (
    <Modal
      onClose={() => setId(null)}
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
        <StylishButton
          type="submit"
          isColor={true}
          size="large"
          disabled={!newName}
        >
          {actionText}
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

export default CategoryModal;
