import React from 'react';

import frameIconComponent, { TIconProps } from '@/utils/frameIconComponent';

type TProps = {
  type?: 'up' | 'down' | 'left' | 'right';
};

const TYPE_TRANSFORM_STYLE = {
  up: 'rotate(0)',
  down: 'rotate(0.25turn)',
  left: 'rotate(0.5turn)',
  right: 'rotate(0.75turn)',
} as const;
const DefaultChevronIcon = frameIconComponent('./icons/chevron.svg');

const ChevronIcon: React.FC<TIconProps & Partial<TProps>> = ({
  type,
  ...restProps
}) => {
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
