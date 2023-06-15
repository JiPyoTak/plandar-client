import GlobalStyle from '../src/styles/GlobalStyle';
import { theme } from '../src/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initialize, mswLoader, mswDecorator } from 'msw-storybook-addon';

// MSW 초기화 함수 실행
initialize();

export const decorators = [
  mswDecorator,
  (Story) => (
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    </QueryClientProvider>
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
  loaders: [mswLoader],
};
