import React from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from '@/App';
import { ToastContainer } from '@/components/toast/ToastContainer';
import { theme } from '@/styles/theme';

const isProduction = process.env.NODE_ENV === 'production';

const root = createRoot(document.getElementById('root') as HTMLElement);

const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={!isProduction} />
        <App />
        <ToastContainer />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
