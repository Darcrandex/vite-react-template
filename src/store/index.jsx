import React, { createContext, useContext } from 'react'
import { configure } from 'mobx'
import counter from './modules/counter'
import request from './modules/request-status'

configure({ enforceActions: 'observed' })

export const store = { counter, request }

const StoreContext = createContext(store)

export const StoreProvider = ({ children }) => <StoreContext.Provider value={store}>{children}</StoreContext.Provider>

export const useStore = () => {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error('no store')
  }

  return store
}
