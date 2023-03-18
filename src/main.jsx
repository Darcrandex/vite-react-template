import { StyleProvider } from '@ant-design/cssinjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from './router'
import './styles.css'

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } })

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider theme={{ token: { colorPrimary: '#8b5cf6' } }}>
      <StyleProvider hashPriority='high'>
        <React.Suspense>
          <RouterProvider router={router} />
        </React.Suspense>
      </StyleProvider>
    </ConfigProvider>
  </QueryClientProvider>
)
