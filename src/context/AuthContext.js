import React, { createContext, useContext} from "react";
import { useAuth } from "../utils/useAuth";

// this const AuthContext is to use as a component in this function.
export const AuthContext = createContext();

export const AuthProvider = ({children }) => {
  const currentUser = useAuth();

  return(
  <AuthContext.Provider value={currentUser}>
    {children}
  </AuthContext.Provider>
  ) 
};

export const useLoggedinUser = () => useContext(AuthContext);
