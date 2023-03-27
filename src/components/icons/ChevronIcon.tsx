import React from 'react';

import { ReactComponent as IconComponent } from '@/assets/chevron-icon.svg';
import frameIconComponent, { TIconProps } from '@/utils/frameIconComponent';

type TProps = {
  type?: 'up' | 'down' | 'left' | 'right';
};

const TYPE_TRANSFORM_STYLE = {
  up: 'rotate(0.5turn)',
  down: 'rotate(0)',
  left: 'rotate(0.25turn)',
  right: 'rotate(0.75turn)',
} as const;
const DefaultChevronIcon = frameIconComponent(IconComponent);

const ChevronIcon: React.FC<TIconProps & TProps> = ({ type, ...restProps }) => {
  return (
    <DefaultChevronIcon
      css={{
        transition: 'transform 0.25s',
        transform: TYPE_TRANSFORM_STYLE[type ?? 'down'],
      }}
      {...restProps}
    />
  );
};

export default ChevronIcon;
