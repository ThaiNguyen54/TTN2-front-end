import { createContext, useState } from 'react';
import Global from "../constant/Global";

const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isLoggedIn: localStorage.getItem(Global.key.isLoggedIn), token: localStorage.getItem(Global.key.token) });
  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
