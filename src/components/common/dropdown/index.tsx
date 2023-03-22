import React, { PropsWithChildren, useState, cloneElement } from 'react';

import { css, keyframes } from '@emotion/react';

import DropdownController from './DropdownController';

type TDropdownProps = PropsWithChildren<{
  defaultVisibility?: boolean;
}>;

type TDropdown = React.FC<TDropdownProps> & {
  Controller: typeof DropdownController;
};

const Dropdown: TDropdown = ({
  children,
  defaultVisibility,
}: TDropdownProps) => {
  const [isShow, setIsShow] = useState<boolean>(defaultVisibility ?? true);

  const toggleShow = () => {
    setIsShow((prev) => !prev);
  };

  children = children ?? [];
  const controllerChildren = Array.prototype.filter
    .call(children, (child) => child.type === DropdownController)
    .map((child, index) =>
      cloneElement(child, {
        ...child.props,
        isShow,
        toggleShow,
        key: `Controller-${index}`,
      }),
    );
  const itemChildren = Array.prototype.filter.call(
    children,
    (child) => child?.type !== DropdownController,
  );

  return (
    <>
      {controllerChildren}
      <div css={{ overflow: 'hidden' }}>
        <div css={isShow ? slideOutAnimation : slideInAnimation}>
          {itemChildren}
        </div>
      </div>
    </>
  );
};

const slideOutKeyframe = keyframes`
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0);
  }
`;
const slideOutAnimation = css`
  animation: ${slideOutKeyframe} 0.4s ease;
  animation-fill-mode: forwards;
`;

const slideInKeyframe = keyframes`
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-100%);

  }
`;
const slideInAnimation = css`
  animation: ${slideInKeyframe} 0.4s ease;
  animation-fill-mode: forwards;
`;

Dropdown.Controller = DropdownController;
export default Dropdown;
