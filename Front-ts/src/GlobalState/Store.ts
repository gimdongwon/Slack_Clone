import React, { createContext, useReducer } from "react";
import reducer, { initialState } from "./Reducer";

export const Store = createContext(null);

export const GlobalProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const store = { state, dispatch };

  return (
    <Store.Proivder value={store}>
      {children}
    </Store.Proivder>
  );
};

export const GlobalConsumer = Store.Consumer;
