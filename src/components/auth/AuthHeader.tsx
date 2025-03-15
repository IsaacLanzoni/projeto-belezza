
import React from 'react';
import { Link } from 'react-router-dom';

interface AuthHeaderProps {
  isLoginTab: boolean;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ isLoginTab }) => {
  return (
    <div className="mb-8">
      <Link to="/" className="inline-block mb-6">
        <h1 className="text-2xl font-display font-bold text-salon-800">
          Belezza
        </h1>
      </Link>
      <h2 className="text-2xl md:text-3xl font-display font-medium mb-2">
        {isLoginTab ? 'Bem-vindo de volta' : 'Crie sua conta'}
      </h2>
      <p className="text-muted-foreground">
        {isLoginTab 
          ? 'Acesse sua conta para gerenciar seus agendamentos' 
          : 'Preencha as informações abaixo para se cadastrar'}
      </p>
    </div>
  );
};

export default AuthHeader;
