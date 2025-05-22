"use client";

import { store } from "@/redux/store";
import React, { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { loadUser } from "./redux/action/user";

interface ProviderProps {
  children?: ReactNode;
}

export function Providers({ children }: ProviderProps) {
  useEffect(() => {
    store.dispatch<any>(loadUser()); // Dispatching the admin fetch here
  }, []);
  return <Provider store={store}>{children}</Provider>;
}
