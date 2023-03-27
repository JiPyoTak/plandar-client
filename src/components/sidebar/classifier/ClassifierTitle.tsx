import React, { ReactNode } from 'react';

import styled from '@emotion/styled';

import ChevronIcon from '@/components/icons/ChevronIcon';
import { FONT_BOLD_3 } from '@/styles/font';

type TProps = {
  title: string;
  additionalIcon?: ReactNode;
  isShow?: boolean;
};

const CLASSIFIER_TITLE_ICON_SIZE = 18;

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
        <ChevronIcon
          width={CLASSIFIER_TITLE_ICON_SIZE}
          height={CLASSIFIER_TITLE_ICON_SIZE}
          type={isShow ? 'down' : 'up'}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 2.875rem;
  padding: 0.75rem 1.5rem;
  margin-top: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export { CLASSIFIER_TITLE_ICON_SIZE };
export default ClassifierTitle;
