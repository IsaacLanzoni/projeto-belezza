
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import ProfessionalsHeader from '@/components/professionals/ProfessionalsHeader';
import ProfessionalsSearch from '@/components/professionals/ProfessionalsSearch';
import ProfessionalsList from '@/components/professionals/ProfessionalsList';
import { professionals } from '@/data/professionals';
import { useAuth } from '@/contexts/AuthContext';

const Professionals: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<any>(null);

  useEffect(() => {
    // Get selected service from session storage
    const serviceData = sessionStorage.getItem('selectedService');
    if (serviceData) {
      try {
        setSelectedService(JSON.parse(serviceData));
      } catch (error) {
        console.error('Error parsing service data:', error);
      }
    } else {
      // If no service was selected, redirect back to services page
      toast.error('Por favor, selecione um serviço primeiro');
      navigate('/services');
    }

    // Event listener for clearing search
    const handleClearSearch = () => setSearchTerm('');
    document.addEventListener('clearProfessionalSearch', handleClearSearch);
    
    return () => {
      document.removeEventListener('clearProfessionalSearch', handleClearSearch);
    };
  }, [navigate]);

  const handleProfessionalSelect = (id: string) => {
    // Verificar se o usuário está autenticado
    if (!isAuthenticated) {
      toast.error('Você precisa estar logado para agendar um atendimento');
      navigate('/login');
      return;
    }
    
    // Store selected professional in session storage for the next step
    const selectedProfessional = professionals.find(professional => professional.id === id);
    if (selectedProfessional) {
      sessionStorage.setItem('selectedProfessional', JSON.stringify(selectedProfessional));
      toast.success(`${selectedProfessional.name} selecionado!`);
      navigate('/schedule');
    }
  };

  return (
    <Layout>
      <div className="pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4">
          <ProfessionalsHeader selectedService={selectedService} />
          <ProfessionalsSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ProfessionalsList 
            professionals={professionals} 
            searchTerm={searchTerm} 
            onSelect={handleProfessionalSelect} 
          />
        </div>
      </div>
    </Layout>
  );
};

export default Professionals;
