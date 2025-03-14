
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário já está logado (localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simular verificação de credenciais
      // Em uma aplicação real, isso seria uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificação simulada - em uma aplicação real você verificaria com backend
      if (email && password) {
        const user = {
          id: '1',
          name: email.split('@')[0],
          email
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Login realizado com sucesso!');
        navigate('/services');
      } else {
        toast.error('Credenciais inválidas');
      }
    } catch (error) {
      toast.error('Erro ao fazer login. Tente novamente.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simular registro de usuário
      // Em uma aplicação real, isso seria uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulação de registro - em uma aplicação real você enviaria para backend
      if (name && email && password) {
        toast.success('Cadastro realizado com sucesso!');
        
        // Automaticamente fazer login após o registro
        login(email, password);
      } else {
        toast.error('Preencha todos os campos');
      }
    } catch (error) {
      toast.error('Erro ao fazer cadastro. Tente novamente.');
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logout realizado com sucesso!');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
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
