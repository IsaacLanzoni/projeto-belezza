
import * as React from 'react';
import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  name: string;
  email: string;
  userType: 'cliente' | 'profissional';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, userType?: 'cliente' | 'profissional') => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's an active session
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking session:', error);
          return;
        }
        
        if (session?.user) {
          await fetchUserProfile(session.user);
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Setup auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await fetchUserProfile(session.user);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (authUser: SupabaseUser) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('nome, tipo_usuario')
        .eq('id', authUser.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      if (profile) {
        setUser({
          id: authUser.id,
          name: profile.nome,
          email: authUser.email || '',
          userType: profile.tipo_usuario as 'cliente' | 'profissional'
        });
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      if (data.user) {
        toast.success('Login realizado com sucesso!');
        
        // Fetch user profile to get user type
        const { data: profile } = await supabase
          .from('profiles')
          .select('tipo_usuario')
          .eq('id', data.user.id)
          .single();
        
        // Redirect based on user type
        if (profile?.tipo_usuario === 'profissional') {
          navigate('/professional-dashboard');
        } else {
          navigate('/services');
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer login. Tente novamente.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, userType: 'cliente' | 'profissional' = 'cliente') => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            userType,
          },
        },
      });
      
      if (error) {
        throw error;
      }
      
      if (data.user) {
        // Update the tipo_usuario in profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ tipo_usuario: userType })
          .eq('id', data.user.id);
          
        if (profileError) {
          console.error('Error updating user type:', profileError);
        }
        
        toast.success('Cadastro realizado com sucesso!');
        
        // Redirect based on user type
        if (userType === 'profissional') {
          navigate('/professional-dashboard');
        } else {
          navigate('/services');
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer cadastro. Tente novamente.');
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      setUser(null);
      toast.success('Logout realizado com sucesso!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer logout. Tente novamente.');
      console.error('Logout error:', error);
    }
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
