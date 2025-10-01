import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type UserRole = 'student' | 'faculty' | 'industry' | 'admin';

interface User {
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy credentials
const dummyCredentials = {
  'student@test.com': { password: '1234', role: 'student' as UserRole, name: 'Ayush Sharma' },
  'faculty@test.com': { password: '1234', role: 'faculty' as UserRole, name: 'Dr. Ramesh Kumar' },
  'industry@test.com': { password: '1234', role: 'industry' as UserRole, name: 'Sarah Johnson' },
  'admin@test.com': { password: '1234', role: 'admin' as UserRole, name: 'Admin User' },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const credential = dummyCredentials[email as keyof typeof dummyCredentials];
    
    if (credential && credential.password === password) {
      const newUser = { email, role: credential.role, name: credential.name };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate(`/${credential.role}`);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
