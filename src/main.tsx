import React from 'react';
import { createRoot } from 'react-dom/client';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import App from '@/App';

const isProduction = process.env.NODE_ENV === 'production';

const root = createRoot(document.getElementById('root') as HTMLElement);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={!isProduction} />
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
