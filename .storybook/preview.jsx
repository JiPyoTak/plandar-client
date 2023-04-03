import GlobalStyle from '../src/styles/GlobalStyle';
import { theme } from '../src/styles/theme';
import { ThemeProvider } from '@emotion/react';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
