import React, { useRef, useState } from 'react';

import styled from '@emotion/styled';

import { SELECTABLE_COLOR } from '@/constants';
import { useCategoryCreate } from '@/hooks/rq/category';
import { FONT_REGULAR_3 } from '@/styles/font';
import { ICategoryWithoutId } from '@/types/rq/category';

type TCategoryCreateProps = {
  name: string;
  onSuccess: (newCategory: ICategoryWithoutId) => void;
};

type TCategoryCreate = React.FC<TCategoryCreateProps>;

const CategoryCreateForm: TCategoryCreate = ({
  name,
  onSuccess,
}: TCategoryCreateProps) => {
  const [error, setError] = useState('');
  const loadingRef = useRef(false);
  const { mutateAsync: createCategory } = useCategoryCreate();
  const newCategoryName = name.trim();

  const onMouseDown = async () => {
    if (loadingRef.current) return;
    try {
      loadingRef.current = true;
      const newCategory = await createCategory({
        name: newCategoryName,
        color: SELECTABLE_COLOR[0],
      });
      onSuccess(newCategory);
    } catch (e) {
      setError('카테고리 생성에 실패했습니다.');
      // todo: 토스트 메시지 띄워주기
    } finally {
      loadingRef.current = false;
    }
  };

  return (
    <Container>
      <span>"{newCategoryName}"</span>
      <Button onMouseDown={onMouseDown}>카테고리 생성하기</Button>
      <Warning>{error}</Warning>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.placeholder};
  ${FONT_REGULAR_3}
`;

const Button = styled.button`
  color: inherit;
  font: inherit;
  width: fit-content;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Warning = styled.span`
  color: ${({ theme }) => theme.red};
`;

export default CategoryCreateForm;
