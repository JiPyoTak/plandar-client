import React from 'react';

import { css } from '@emotion/react';

export type TIconProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
  color?: string;
} & React.HTMLAttributes<HTMLOrSVGElement>;
const frameIconComponent =
  (
    IconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
  ): React.FC<TIconProps> =>
  ({ className, width, height, color, ...restProps }) => {
    const sizeProps: { width?: string | number; height?: string | number } = {};
    if (width) sizeProps.width = width;
    if (height) sizeProps.height = height;

    return (
      <IconComponent
        className={className}
        {...sizeProps}
        {...restProps}
        css={[
          color ? { '& *': { color, stroke: color } } : {},
          css`
            -webkit-user-drag: none;
            user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
          `,
        ]}
      />
    );
  };

export default frameIconComponent;
