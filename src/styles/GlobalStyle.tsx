import { Global, css } from '@emotion/react';

import { FONT_INITILIZE } from './font';
import { reset } from '@/styles/reset';

const GlobalStyle = () => (
  <Global
    styles={css`
      ${reset}
      :root {
        ${FONT_INITILIZE}
      }
      * {
        box-sizing: border-box;
      }

      html {
        font-size: 30px;
      }

      #root {
        width: 100vw;
        height: 100vh;
      }
    `}
  />
);

export default GlobalStyle;
