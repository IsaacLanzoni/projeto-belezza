
import React, { useState } from 'react';
import { User, Mail, Lock, ArrowRight, EyeIcon, EyeOff, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const RegisterForm = () => {
  const { register, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'cliente' | 'profissional'>('cliente');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
    } = {};
    let isValid = true;

    if (!name) {
      newErrors.name = 'O nome é obrigatório';
      isValid = false;
    } else if (name.length < 3) {
      newErrors.name = 'O nome deve ter pelo menos 3 caracteres';
      isValid = false;
    }

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
      await register(name, email, password, userType);
    } catch (error) {
      console.error('Erro no cadastro:', error);
      toast.error('Ocorreu um erro no cadastro. Tente novamente.');
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="name"
            type="text"
            placeholder="Seu nome completo"
            className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name}</p>
        )}
      </div>
      
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
        <Label htmlFor="password">Senha</Label>
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
      
      <div className="space-y-2">
        <Label>Tipo de conta</Label>
        <RadioGroup 
          value={userType} 
          onValueChange={(value) => setUserType(value as 'cliente' | 'profissional')}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cliente" id="cliente" />
            <Label htmlFor="cliente" className="cursor-pointer">Cliente</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="profissional" id="profissional" />
            <Label htmlFor="profissional" className="cursor-pointer">Profissional</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p className="flex items-start">
          <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-primary" />
          Ao criar sua conta, você concorda com nossos termos de uso e política de privacidade.
        </p>
      </div>
      
      <Button type="submit" className="w-full" variant="auth" disabled={isLoading}>
        {isLoading ? 'Criando conta...' : 'Criar conta'}
        {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </form>
  );
};

export default RegisterForm;
