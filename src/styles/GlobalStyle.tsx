import { Global, css } from '@emotion/react';
import { reset } from '@/styles/reset';

const GlobalStyle = () => (
  <Global
    styles={css`
      ${reset}

      * {
        font-family: sans-serif !important;
        box-sizing: border-box;
      }
    `}
  />
);

export default GlobalStyle;