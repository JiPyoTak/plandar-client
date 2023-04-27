import React from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import ColorPicker from '@/components/common/ColorPicker';
import { useCategoryUpdate } from '@/hooks/rq/category';
import { TColor } from '@/types';
import { ICategory, ICategoryWithoutId } from '@/types/rq/category';

type TSelectedCategoryDisplayProps = {
  category: ICategoryWithoutId;
  onUpdateCategory: (category: ICategory) => void;
};

type TSelectedCategoryDisplay = React.FC<TSelectedCategoryDisplayProps>;

const SelectedCategoryDisplay: TSelectedCategoryDisplay = ({
  category,
  onUpdateCategory,
}: TSelectedCategoryDisplayProps) => {
  const theme = useTheme();
  const { mutateAsync: updateCategory } = useCategoryUpdate();

  const onSelect = async (newColor: TColor) => {
    // id가 없다면 아직 서버로부터 생성되지 않은 상태므로 return
    if (!Object.hasOwnProperty.call(category, 'id')) {
      alert('카테고리가 생성되지 않았습니다.');
      // todo: 토스트 메시지로 실패했다고 알림
      return;
    }

    try {
      // category는 id가 있으므로 ICategory 타입
      const newCategory = { ...category, color: newColor } as ICategory;

      await updateCategory(newCategory);
      onUpdateCategory(newCategory);
    } catch (e) {
      alert('카테고리 수정에 실패했습니다.');
      // todo: 토스트 메시지로 실패했다고 알림
    }
  };

  return (
    <Container>
      <ColorPicker
        selectedColor={category.color}
        onSelect={onSelect}
        additionalComponent={<CategoryName>{category.name}</CategoryName>}
        css={{ border: `1px solid ${theme.border2}` }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  gap: 5px;
`;

const CategoryName = styled.div`
  color: ${({ theme }) => theme.text3};
  padding: 5px 0;
`;

export default SelectedCategoryDisplay;
