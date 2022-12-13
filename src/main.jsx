import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'

import App from './App'
import './styles.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RecoilRoot>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider theme={{ token: { colorPrimary: '#8b5cf6' } }}>
            <App />
          </ConfigProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </RecoilRoot>
  </>
)
