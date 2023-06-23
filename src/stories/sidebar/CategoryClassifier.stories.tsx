import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import CategoryClassifier from '@/components/sidebar/CategoryClassifier';
import { useCategoryCreate } from '@/hooks/rq/category';
import {
  createCategoryAPIHandler,
  getCategoryAPIHandler,
  updateCategoryAPIHandler,
} from '@/stories/apis/category';
import categoryStubManager from '@/stories/apis/data/category';

export default {
  title: 'Sidebar/Classifier',
  component: CategoryClassifier,
} as ComponentMeta<typeof CategoryClassifier>;

const Template: ComponentStory<typeof CategoryClassifier> = (args) => {
  const { mutateAsync } = useCategoryCreate();

  const createCategory = () => {
    mutateAsync(categoryStubManager.createStub());
  };

  return (
    <div>
      <Controls>
        <TestButton onClick={createCategory}>카테고리 추가하기</TestButton>
      </Controls>
      <CategoryClassifier {...args} />
    </div>
  );
};

const Controls = styled.div`
  padding: 1rem;

  display: flex;
  column-gap: 1rem;
`;

const TestButton = styled.button`
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 8px;
`;

export const Category = Template.bind({});
Category.args = {};
Category.parameters = {
  msw: {
    handlers: [
      getCategoryAPIHandler,
      createCategoryAPIHandler,
      updateCategoryAPIHandler,
    ],
  },
};
