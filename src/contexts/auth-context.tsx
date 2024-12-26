import { createContext, useContext, ReactNode, useState } from 'react';

interface RegisterParams {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (params: RegisterParams) => Promise<void>;
  logout: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'freelancer' | 'client';
  avatar?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock login
    setIsAuthenticated(true);
    setUser({
      id: '1',
      name: 'John Doe',
      email: email,
      role: 'freelancer',
    });
  };

  const register = async ({ email, password, confirmPassword, name }: RegisterParams) => {
    // Mock registration
    setIsAuthenticated(true);
    setUser({
      id: '1',
      name,
      email,
      role: 'freelancer',
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
