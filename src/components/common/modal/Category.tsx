import React from 'react';

import styled from '@emotion/styled';

import { Color } from './styles';
import { useCategoryQuery } from '@/hooks/rq/category';

interface IProps {
  categoryId: number;
}

const Category: React.FC<IProps> = ({ categoryId }) => {
  const { data: categoryData } = useCategoryQuery();

  const category = categoryData?.find((category) => category.id === categoryId);

  if (!category) return null;

  const { color, name } = category;

  return (
    <Container>
      <Color width={12} height={12} backgroundColor={color} />
      <span>{name}</span>
    </Container>
  );
};

const Container = styled.div`
  width: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 5px;

  border-radius: 5px;
  padding: 5px 9px;
  background-color: ${({ theme }) => theme.background2};

  &:hover {
    background-color: ${({ theme }) => theme.background3};
  }
`;

export default Category;
