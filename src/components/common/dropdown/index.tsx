import React, { PropsWithChildren, useState, cloneElement } from 'react';

import DropdownController from './DropdownController';

type TDropdownProps = PropsWithChildren<{
  defaultVisibility?: boolean;
  className?: string;
  duration?: number;
}>;

type TDropdown = React.FC<TDropdownProps> & {
  Controller: typeof DropdownController;
};

const Dropdown: TDropdown = ({
  children,
  defaultVisibility,
  className,
  duration = 0.35,
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
        isShow: isShow,
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
      <div className={className}>
        <div
          css={[
            {
              paddingTop: '0px',
              maxHeight: isShow ? '100vh' : '0px',
              overflow: 'hidden',
              transition: `max-height ${duration}s ease-in-out`,
            },
          ]}
        >
          {itemChildren}
        </div>
      </div>
    </>
  );
};

Dropdown.Controller = DropdownController;
export default Dropdown;
