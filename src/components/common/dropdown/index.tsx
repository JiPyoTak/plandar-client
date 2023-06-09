import React, {
  PropsWithChildren,
  useState,
  cloneElement,
  useRef,
  useEffect,
} from 'react';

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleShow = () => {
    setIsShow((prev) => !prev);
  };

  useEffect(() => {
    if (!dropdownRef.current) return;
    dropdownRef.current.style.maxHeight = `${
      isShow ? dropdownRef.current.scrollHeight : 0
    }px`;
  });

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
          ref={dropdownRef}
          css={[
            {
              paddingTop: '0px',
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
