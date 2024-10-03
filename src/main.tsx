import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'react-quill/dist/quill.snow.css'
import 'react-toastify/dist/ReactToastify.css'
import '../node_modules/highlight.js/styles/atom-one-dark.css'
import '@fontsource/raleway/400.css'
import '@fontsource/open-sans/700.css'
import { ToastContainer } from 'react-toastify'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Theme } from './theme'
import UserContextProvider from '@context/userContext.tsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={Theme}>
        <UserContextProvider>
          <App />
        </UserContextProvider>
        <ToastContainer />
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
)
