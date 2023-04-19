import React, {
  ForwardedRef,
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  useState,
} from 'react';

import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { CrossIcon, SearchIcon } from '@/components/icons';
import { FONT_BOLD_4 } from '@/styles/font';

type TInputProps = InputHTMLAttributes<HTMLInputElement> & {
  isInline?: boolean;
  className?: string;
  isSearchIcon?: boolean;
  onClear?: () => void;
};

type TInput = ForwardRefRenderFunction<HTMLInputElement, TInputProps>;

const Input: TInput = (
  {
    isInline,
    className,
    isSearchIcon,
    onClear,
    onFocus,
    onBlur,
    ...rest
  }: TInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const theme = useTheme();
  const InputComponent = isInline ? InlineInput : BoxInput;
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div css={{ position: 'relative', width: '100%' }}>
      <InputComponent
        ref={ref}
        onFocus={(e) => {
          onFocus?.(e);
          setIsFocus(true);
        }}
        onBlur={(e) => {
          onBlur?.(e);
          setIsFocus(false);
        }}
        className={className}
        css={isSearchIcon && { paddingLeft: 35 }}
        {...rest}
      />
      {isSearchIcon && <SearchMarker color={theme.text3} />}
      <ClearButton
        type="button"
        css={onClear && isFocus ? ClearButtonVisible : ClearButtonHidden}
        disabled={!onClear || !isFocus}
        onMouseDown={onClear}
      >
        <CrossIcon className="x-icon" />
      </ClearButton>
    </div>
  );
};

const ClearButtonVisible = css`
  opacity: 1;
`;

const ClearButtonHidden = css`
  opacity: 0;
  cursor: default;
`;

const CommonInput = styled.input`
  width: 100%;
  color: ${({ theme }) => theme.text1};
  &::placeholder {
    color: ${({ theme }) => theme.text3};
  }
`;

const InlineInput = styled(CommonInput)`
  outline: 0;
  border-width: 0 0 1px;
  border-color: ${({ theme }) => theme.text3};
`;

const BoxInput = styled(CommonInput)`
  outline: 0;
  border: 1px solid ${({ theme }) => theme.background2};
  padding: 10px;
  background-color: ${({ theme }) => theme.background2};
  border-radius: 5px;
  ${FONT_BOLD_4}

  &:focus {
    background-color: ${({ theme }) => theme.white};
    border-color: ${({ theme }) => theme.border1};
  }
`;

const SearchMarker = styled(SearchIcon)`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`;

const ClearButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background-color: ${({ theme }) => theme.background3};
  border-radius: 100%;

  & > .x-icon {
    width: 20px;
    height: 20px;

    & > path {
      stroke: ${({ theme }) => theme.white};
    }
  }
`;

export default forwardRef(Input);
