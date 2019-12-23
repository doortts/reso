import React, { ReactElement } from 'react'

import { useLocalStore } from 'mobx-react-lite'

import { createStore, EmployeeStore, TStore } from './store/EmployeeStore'

export const storeContext = React.createContext<TStore | null>(null)

interface Props {
  children: ReactElement
  store?: EmployeeStore
}

export const StoreProvider = (props: Props) => {
  const { children, store} = props
  const localStore = store || useLocalStore(createStore)

  return (
    <storeContext.Provider value={localStore}>
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
