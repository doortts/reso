import React from 'react'

import { useLocalStore } from 'mobx-react-lite'

import { createStore, TStore } from './store/EmployeeStore'

export const storeContext = React.createContext<TStore | null>(null)

export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(createStore)

  return (
    <storeContext.Provider value={store}>
      {children}
    </storeContext.Provider>
  )
}

export const useStore = () => {
  const store = React.useContext(storeContext)
  if (!store) {
    throw new Error('You have forgot to use StoreProvider.')
  }

  return store
}

export default StoreProvider
