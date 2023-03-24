import React from 'react';

import { css } from '@emotion/react';

export type TIconProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
  color?: string;
};

const frameIconComponent =
  (path: string): React.FC<TIconProps> =>
  ({ className, width, height, color }) => {
    return (
      <img
        src={path}
        alt="icon"
        className={className}
        width={width}
        height={height}
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
