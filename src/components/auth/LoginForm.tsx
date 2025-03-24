import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, EyeIcon, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};
    let isValid = true;

    if (!email) {
      newErrors.email = 'O email é obrigatório';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Por favor, insira um email válido';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'A senha é obrigatória';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }
    
    try {
      await login(email, password);
    } catch (error) {
      console.error('Erro no login:', error);
      toast.error('Credenciais inválidas. Por favor, verifique seu email e senha.');
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Senha</Label>
          <Link to="#" className="text-sm text-primary hover:underline">
            Esqueceu a senha?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="button"
            onClick={togglePasswordVisibility} 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={16} /> : <EyeIcon size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password}</p>
        )}
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Entrando...' : 'Entrar'}
        {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </form>
  );
};

export default LoginForm;
