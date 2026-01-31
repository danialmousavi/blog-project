import { useState } from "react";
import { createContext } from "vm";
type usertype = {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  user: null | usertype;
};

const AuthContext = createContext({} as AuthContextType);
export default AuthContext;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<usertype | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = (user: usertype) => {
    // Logic to authenticate user and set user state
    setUser(user);
    setIsAuthenticated(true);
  };
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
