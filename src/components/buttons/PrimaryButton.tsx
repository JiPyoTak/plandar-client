import { PropsWithChildren } from 'react';

import { useTheme } from '@emotion/react';

import StylishButton from '@/components/buttons/StylishButton';

type TPrimaryButtonProps = PropsWithChildren<{
  onClick: () => void;
}>;

const PrimaryButton = ({ children, onClick, ...rest }: TPrimaryButtonProps) => {
  const theme = useTheme();
  return (
    <StylishButton
      onClick={onClick}
      css={{ backgroundColor: theme.primary }}
      {...rest}
    >
      {children}
    </StylishButton>
  );
};

export default PrimaryButton;
