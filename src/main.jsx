import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Modal } from 'antd'

import { StoreProvider } from '@/store'
import App from './App'
import './global.less'

const confirmFn = (msg = '', cb = () => {}) => {
  Modal.confirm({
    title: '提示',
    content: msg,
    onOk: () => cb(true),
    onCancel: () => cb(false),
  })
}

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter getUserConfirmation={confirmFn}>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
