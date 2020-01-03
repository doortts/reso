import React, { ReactElement } from 'react'

import { useLocalStore } from 'mobx-react-lite'

import { createStore, TStore } from './store/RootStore'

export const storeContext = React.createContext<TStore | null>(null)

interface Props {
  children: ReactElement
  store?: TStore
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

export enum StoreType {
  Employee,
  Setting,
}

export const useStore = (storeType?: StoreType) => {
  const store = React.useContext(storeContext)
  if (!store) {
    throw new Error('You have forgot to use StoreProvider.')
  }

  switch (storeType) {
    case StoreType.Setting:
      return store.settingStore
    case StoreType.Employee:
    default:
      return store.employeeStore
  }
}

export default StoreProvider
