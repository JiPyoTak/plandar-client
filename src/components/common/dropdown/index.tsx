import React, { PropsWithChildren, useState, cloneElement } from 'react';

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
      {isShow ? itemChildren : undefined}
    </>
  );
};

Dropdown.Controller = DropdownController;
export default Dropdown;
