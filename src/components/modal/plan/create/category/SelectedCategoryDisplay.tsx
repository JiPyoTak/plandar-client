import React, { MouseEventHandler, MouseEvent, useState } from 'react';

import { css, Theme, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import ColorPopup from '@/components/common/color-picker/ColorList';
import PickButton from '@/components/common/color-picker/PickButton';
import ModalBackground from '@/components/common/modal/ModalBackground';
import { toast } from '@/core/toast';
import useModalPopupPosition from '@/hooks/modal/useModalPopupPositon';
import { useUpdateCategory } from '@/hooks/query/category';
import { ColorCircle } from '@/styles/category';
import {
  ClassifierAdditionalFontStyle,
  ClassifierAdditionalMarginRight,
} from '@/styles/plan-modal';
import { TColor } from '@/types';
import { ICategory, ICategoryWithoutId } from '@/types/query/category';

type TSelectedCategoryDisplayProps = {
  category: ICategoryWithoutId;
  onUpdateCategory: (categoryId: number) => void;
};

type TSelectedCategoryDisplay = React.FC<TSelectedCategoryDisplayProps>;

const SelectedCategoryDisplay: TSelectedCategoryDisplay = ({
  category,
  onUpdateCategory,
}: TSelectedCategoryDisplayProps) => {
  const theme = useTheme();
  const [popupOpened, setPopupOpened] = useState(false);

  const { mutateAsync: updateCategory } = useUpdateCategory();
  const { positionTopRef, setPositionTop } = useModalPopupPosition();

  const onSelect = async (newColor: TColor) => {
    // id가 없다면 아직 서버로부터 생성되지 않은 상태므로 return
    if (!Object.hasOwnProperty.call(category, 'id')) {
      toast('카테고리가 생성되지 않았습니다');

      return;
    }

    try {
      // category는 id가 있으므로 ICategory 타입
      const newCategory = { ...category, color: newColor } as ICategory;

      await updateCategory(newCategory);
      onUpdateCategory(newCategory.id);
      toast(
        <div>
          {newCategory.name} 카테고리 색상이 <ColorCircle color={newColor} />
          으로 수정되었습니다.
        </div>,
      );
    } catch (e) {
      toast('카테고리 수정에 실패했습니다');
    }
  };

  const onClickPickerButton: MouseEventHandler = (e) => {
    e.stopPropagation();

    const target = e.target as HTMLButtonElement;

    setPositionTop(target.getBoundingClientRect());
    setPopupOpened((prev) => !prev);
  };

  const onClickColor = (e: MouseEvent<HTMLButtonElement>, color: TColor) => {
    e.stopPropagation();
    onSelect(color);
    setPopupOpened(false);
  };

  return (
    <Container>
      <div>
        <PickButton
          selectedColor={category.color}
          circleSize="small"
          additionalComponent={<CategoryName>{category.name}</CategoryName>}
          onClick={onClickPickerButton}
          css={ColorPickerStyle(theme)}
        />
        <ColorPopup
          css={{
            top: positionTopRef.current,
          }}
          isOpen={popupOpened}
          selectedColor={category.color}
          onClick={onClickColor}
        />
        <ModalBackground
          isOpen={popupOpened}
          onClose={() => setPopupOpened(false)}
        />
      </div>
    </Container>
  );
};

const ColorPickerStyle = (theme: Theme) => css`
  padding: 5px 9px;
  background-color: ${theme.background2};

  &:hover {
    background-color: ${theme.background3};
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${ClassifierAdditionalMarginRight};
  gap: 5px;
`;

const CategoryName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text3};
  gap: 5px;
  ${ClassifierAdditionalFontStyle}
`;

export default SelectedCategoryDisplay;
