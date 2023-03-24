import React, { Children, cloneElement, PropsWithChildren } from 'react';

import styled from '@emotion/styled';

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
      let newProps = { ...functionalChild.props };
      if (typeof childType === 'function') {
        newProps = { ...newProps, isShow };
      }

      return cloneElement(functionalChild, { newProps, key: index });
    }
    return child;
  }) as React.ReactNode[];

  return <StylessButton onClick={toggleShow}>{newChildren}</StylessButton>;
};

const StylessButton = styled.button`
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  overflow: visible;
  cursor: pointer;
`;

export default DropdownController;
