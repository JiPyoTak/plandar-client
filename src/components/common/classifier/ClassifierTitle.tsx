import React, { ReactNode } from 'react';

import styled from '@emotion/styled';

import ChevronIcon from '@/components/common/icons/ChevronIcon';
import { FONT_BOLD_3 } from '@/styles/font';

type TProps = {
  title: string;
  className?: string;
  additionalComponent?: ReactNode;
  titleIcon?: ReactNode;
  isShow?: boolean;
};

const CLASSIFIER_TITLE_ICON_SIZE = 18;

const ClassifierTitle: React.FC<TProps> = ({
  className,
  title,
  titleIcon,
  additionalComponent,
  isShow,
}) => {
  return (
    <Container className={className}>
      <Title>
        {titleIcon}
        {title}
      </Title>
      <Nav>
        {additionalComponent}
        <button>
          <ChevronIcon
            width={CLASSIFIER_TITLE_ICON_SIZE}
            height={CLASSIFIER_TITLE_ICON_SIZE}
            type={isShow ? 'up' : 'down'}
          />
        </button>
      </Nav>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 2.875rem;
  padding: 0.75rem 1.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
  ${FONT_BOLD_3}
`;

const Nav = styled.div`
  display: flex;
  column-gap: 2px;
  justify-content: center;
  align-items: center;

  & > button {
    display: flex;

    padding: 0.2rem;
    border-radius: 4px;

    transition: background-color 0.2s;

    &:hover {
      background-color: ${({ theme }) => theme.background3};
    }
  }
`;

export { CLASSIFIER_TITLE_ICON_SIZE };
export default ClassifierTitle;
