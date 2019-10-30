import React from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { createStore, TStore } from './store/Store';

export const storeContext = React.createContext<TStore | null>(null);

export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(createStore);

  return (
    <storeContext.Provider value={store}>
      {children}
    </storeContext.Provider>
  );
};

export default StoreProvider;
