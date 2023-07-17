import React, { memo } from 'react';

import styled from '@emotion/styled';

import { Color } from '@/components/common/modal/styles';
import Plan from '@/core/plan/Plan';
import { FONT_REGULAR_5 } from '@/styles/font';

interface IProps {
  plan: Plan;
  isSelected: boolean;
  isHovered: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>, plan: Plan) => void;
  onMouseDown: (plan: Plan) => void;
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>, plan: Plan) => void;
  onMouseLeave: () => void;
}

const DayTimePlan: React.FC<IProps> = (props) => {
  const {
    plan,
    isSelected,
    isHovered,
    onClick,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const classNames = ['time-plan'];

  if (isSelected) classNames.push('is_selected');
  if (isHovered) classNames.push('is_hovered');

  return (
    <Container
      className={classNames.join(' ')}
      onClick={(e) => onClick(e, plan)}
      onMouseDown={() => onMouseDown(plan)}
      onMouseEnter={(e) => onMouseEnter(e, plan)}
      onMouseLeave={onMouseLeave}
    >
      <div>
        <div>
          <Color width={8} height={8} backgroundColor={plan.color} />
        </div>
        <TitleText>{plan.title}</TitleText>
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 1.25rem;
  padding: 0 8px;

  cursor: pointer;
  overflow: hidden;

  & > div {
    display: flex;
    gap: 8px;
    align-items: center;

    transition: opacity 0.2s, background-color 0.2s;

    border-radius: 3px;
    padding: 2px 4px;
  }

  &.is_hovered,
  &.is_selected {
    & > div {
      background-color: rgba(0, 0, 0, 0.12);
    }
  }

  &:hover {
    & > div {
      background-color: rgba(0, 0, 0, 0.12);
    }
  }
`;

const TitleText = styled.span`
  ${FONT_REGULAR_5}

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default memo(DayTimePlan);
