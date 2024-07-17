import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const savedAuthState = localStorage.getItem('isAuthenticated');
    return savedAuthState ? JSON.parse(savedAuthState) : false;
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    notifications.show({
      title: 'Success 😃',
      message: 'Logged in successfully.',
      autoClose: 7000,
      color: 'green',
      icon: <IconCheck />,
    })
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('tokenAdmin');
    localStorage.removeItem('token');
    localStorage.removeItem('selectedTab');
    notifications.show({
      title: 'Bye 😭',
      message: 'We look forward to seeing you soon',
      autoClose: 7000,
      color: 'green',
      icon: <IconCheck />,
    })
  };

  useEffect(() => {
    const savedAuthState = localStorage.getItem('isAuthenticated');
    if (savedAuthState) {
      setIsAuthenticated(JSON.parse(savedAuthState));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
