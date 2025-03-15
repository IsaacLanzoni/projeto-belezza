
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

  // Função para simular verificação de email existente
  const checkEmailExists = async (email: string): Promise<boolean> => {
    // Simulação de consulta ao banco de dados
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Buscar todos os usuários registrados no localStorage
    const registeredUsers = localStorage.getItem('registeredUsers');
    if (registeredUsers) {
      const users = JSON.parse(registeredUsers) as { email: string }[];
      return users.some(user => user.email.toLowerCase() === email.toLowerCase());
    }
    
    return false;
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simular verificação de credenciais
      // Em uma aplicação real, isso seria uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificação simulada - em uma aplicação real você verificaria com backend
      if (email && password) {
        // Verificar se o usuário está registrado
        const registeredUsers = localStorage.getItem('registeredUsers');
        let userExists = false;
        
        if (registeredUsers) {
          const users = JSON.parse(registeredUsers) as Array<{email: string, name: string}>;
          const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
          userExists = !!foundUser;
          
          if (foundUser) {
            const user = {
              id: Math.random().toString(36).substring(2),
              name: foundUser.name,
              email: foundUser.email
            };
            
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            toast.success('Login realizado com sucesso!');
            navigate('/services');
            return;
          }
        }
        
        if (!userExists) {
          toast.error('Usuário não encontrado ou senha incorreta');
        }
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
      // Verificar se o email já existe
      const emailExists = await checkEmailExists(email);
      
      if (emailExists) {
        toast.error('Este email já está cadastrado. Por favor, use outro email ou faça login.');
        setIsLoading(false);
        return;
      }
      
      // Simular registro de usuário
      // Em uma aplicação real, isso seria uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulação de registro - em uma aplicação real você enviaria para backend
      if (name && email && password) {
        // Guardar usuário registrado para simulação
        const registeredUsers = localStorage.getItem('registeredUsers');
        const users = registeredUsers ? JSON.parse(registeredUsers) : [];
        users.push({ name, email });
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        
        toast.success('Cadastro realizado com sucesso!');
        
        // Automaticamente fazer login após o registro
        const user = {
          id: Math.random().toString(36).substring(2),
          name,
          email
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/services');
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
