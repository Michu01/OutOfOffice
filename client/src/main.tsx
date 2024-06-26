import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'src/App.tsx'
import 'src/common/styles/styles.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "bootstrap";
import { IconContext } from 'react-icons';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <IconContext.Provider value={{ size: "1.2em" }}>
        <App />
      </IconContext.Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
