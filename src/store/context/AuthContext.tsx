import React, { useState } from "react";

import { CurrentUser } from "../../models/User";

export interface StateType {
  user: CurrentUser | null;
  isAutenticated: boolean;
}

export interface ContextType {
  state: StateType;
  setState: (state: StateType) => void;
}

export const AuthContext = React.createContext({});

export const Provider: React.FC<{}> = ({ children }) => {
  const [state, setState] = useState<StateType>({
    user: null,
    isAutenticated: localStorage.getItem("auth") === "true",
  });


  return (
    <AuthContext.Provider value={{ state, setState }}>
      {children}
    </AuthContext.Provider>
  );
};
