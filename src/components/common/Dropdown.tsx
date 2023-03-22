import React, {
  PropsWithChildren,
  useState,
  cloneElement,
  Children,
} from 'react';

type TDropdownProps = PropsWithChildren<{
  defaultVisibility?: boolean;
}>;

const Dropdown = ({ children, defaultVisibility }: TDropdownProps) => {
  const [isShow, setIsShow] = useState<boolean>(defaultVisibility ?? true);

  const toggleShow = () => {
    setIsShow((prev) => !prev);
  };

  children = children ?? [];
  const controllerChildren = Array.prototype.filter
    .call(children, (child) => child.type === Controller)
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
    (child) => child?.type !== Controller,
  );

  return (
    <>
      {controllerChildren}
      {isShow ? itemChildren : undefined}
    </>
  );
};

type TControllerProps = PropsWithChildren<{
  isShow?: boolean;
  toggleShow?: () => void;
}>;

const Controller = ({
  isShow = false,
  toggleShow = () => undefined,
  children,
}: TControllerProps) => {
  const newChildren = Children.map(children, (child) => {
    if (
      typeof child === 'object' &&
      Object.hasOwnProperty.call(child, '$$typeof')
    ) {
      const functionalChild = child as React.ReactElement & PropsWithChildren;
      const childType = functionalChild.type;
      let newProps = { ...functionalChild.props };
      if (typeof childType === 'object') {
        newProps = { ...newProps, isShow };
      }
      return cloneElement(functionalChild, newProps);
    }
    return child;
  }) as React.ReactNode[];

  return (
    <button
      css={{
        background: 'inherit',
        border: 'none',
        boxShadow: 'none',
        borderRadius: 0,
        padding: 0,
        overflow: 'visible',
        cursor: 'pointer',
      }}
      onClick={toggleShow}
    >
      {newChildren}
    </button>
  );
};

Dropdown.Controller = Controller;
export default Dropdown;
