import React, { Children, cloneElement, PropsWithChildren } from 'react';

type TControllerProps = PropsWithChildren<{
  isShow?: boolean;
  toggleShow?: () => void;
}>;

const DropdownController = ({
  isShow = false,
  toggleShow = () => undefined,
  children,
}: TControllerProps) => {
  const newChildren = Children.map(children, (child, index) => {
    if (
      typeof child === 'object' &&
      Object.hasOwnProperty.call(child, '$$typeof')
    ) {
      const functionalChild = child as React.ReactElement;
      const childType = functionalChild.type;

      // type 이 function 일 경우 = Functional Component
      // div, span과 같은 기존 DOM = string
      // React에서 사용하는 것 = symbol
      let newProps = { ...functionalChild.props, key: index };
      if (typeof childType === 'function') {
        newProps = { ...newProps, isShow };
      }

      return cloneElement(functionalChild, newProps);
    }
    return child;
  }) as React.ReactNode[];

  return (
    <button css={{ width: '100%' }} onClick={toggleShow}>
      {newChildren}
    </button>
  );
};

export default DropdownController;
