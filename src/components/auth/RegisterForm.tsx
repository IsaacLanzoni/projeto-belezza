
import React, { useState } from 'react';
import { User, Mail, Lock, ArrowRight, EyeIcon, EyeOff, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const RegisterForm = () => {
  const { register, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(name, email, password);
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
            className="pl-10"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="register-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="register-email"
            type="email"
            placeholder="seu@email.com"
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="register-password">Senha</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="register-password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="pl-10"
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
      </div>
      
      <div className="text-sm text-muted-foreground flex items-start gap-2">
        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
        <p>
          Ao criar uma conta, você concorda com nossos <Link to="#" className="text-primary hover:underline">Termos de Serviço</Link> e <Link to="#" className="text-primary hover:underline">Política de Privacidade</Link>.
        </p>
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Criando conta...' : 'Criar conta'}
        {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </form>
  );
};

export default RegisterForm;
