import { Global, css } from '@emotion/react';

import { reset } from '@/theme/reset';

const GlobalStyle = () => (
  <Global
    styles={css`
      ${reset}
      * {
        font-family: sans-serif !important;
        box-sizing: border-box;
      }

      html {
        font-size: 30px;
      }
    `}
  />
);

export default GlobalStyle;
