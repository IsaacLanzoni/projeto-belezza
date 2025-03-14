
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ProfessionalsHeaderProps {
  selectedService: any;
}

const ProfessionalsHeader: React.FC<ProfessionalsHeaderProps> = ({ selectedService }) => {
  const navigate = useNavigate();

  const goBackToServices = () => {
    navigate('/services');
  };

  return (
    <section className="mb-12">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={goBackToServices} 
        className="mb-6 -ml-2"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para Serviços
      </Button>
      
      <motion.h1 
        className="text-3xl md:text-4xl font-display font-medium mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Escolha um Profissional
      </motion.h1>
      
      {selectedService && (
        <motion.div 
          className="bg-secondary/50 rounded-lg p-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm text-muted-foreground mb-1">Serviço selecionado:</p>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{selectedService.name}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedService.duration} minutos
              </p>
            </div>
            <p className="font-medium text-primary">
              R$ {selectedService.price.toFixed(2)}
            </p>
          </div>
        </motion.div>
      )}
      
      <motion.p 
        className="text-muted-foreground max-w-2xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        Selecione o profissional de sua preferência para realizar o serviço.
      </motion.p>
    </section>
  );
};

export default ProfessionalsHeader;
