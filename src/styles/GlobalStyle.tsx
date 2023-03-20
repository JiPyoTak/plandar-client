import { Global, css } from '@emotion/react';

import { FONT_INITILIZE } from './font';
import { reset } from '@/styles/reset';

const GlobalStyle: React.FC = () => (
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

      body {
        width: 100vw;
        height: 100vh;

        overflow: hidden;
      }

      #root {
        width: 100%;
        height: 100%;
      }
    `}
  />
);

export default GlobalStyle;
