import React, { ReactNode } from 'react';

import styled from '@emotion/styled';

import ChevronIcon from '@/components/icons/ChevronIcon';
import { FONT_BOLD_3 } from '@/styles/font';

type TProps = {
  title: string;
  additionalIcon?: ReactNode;
  isShow?: boolean;
};

const ClassifierTitle: React.FC<TProps> = ({
  title,
  additionalIcon,
  isShow,
}) => {
  return (
    <Wrapper>
      <div css={FONT_BOLD_3}>{title}</div>
      <div css={{ display: 'flex', columnGap: 5 }}>
        {additionalIcon}
        <ChevronIcon width={18} height={18} type={isShow ? 'up' : 'down'} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 2.875rem;
  padding: 0.75rem 1.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default ClassifierTitle;
