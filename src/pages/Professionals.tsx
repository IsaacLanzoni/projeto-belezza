
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Users, ArrowLeft, Calendar } from 'lucide-react';
import Layout from '@/components/Layout';
import ProfessionalCard from '@/components/ProfessionalCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const professionals = [
  {
    id: '1',
    name: 'Ana Silva',
    role: 'Hair Stylist Senior',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    rating: 4.9,
    experience: '8 anos',
    specialties: ['Cortes', 'Coloração', 'Penteados'],
    available: true,
  },
  {
    id: '2',
    name: 'Carlos Oliveira',
    role: 'Barbeiro',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    rating: 4.7,
    experience: '5 anos',
    specialties: ['Cortes Masculinos', 'Barba', 'Penteados'],
    available: true,
  },
  {
    id: '3',
    name: 'Júlia Santos',
    role: 'Esteticista',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80',
    rating: 4.8,
    experience: '7 anos',
    specialties: ['Limpeza de Pele', 'Tratamentos Faciais'],
    available: true,
  },
  {
    id: '4',
    name: 'Ricardo Almeida',
    role: 'Hair Stylist',
    image: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    rating: 4.6,
    experience: '4 anos',
    specialties: ['Cortes', 'Coloração', 'Tratamentos'],
    available: true,
  },
  {
    id: '5',
    name: 'Fernanda Lima',
    role: 'Manicure & Pedicure',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
    rating: 4.9,
    experience: '6 anos',
    specialties: ['Manicure', 'Pedicure', 'Unhas em Gel'],
    available: true,
  },
  {
    id: '6',
    name: 'Pedro Costa',
    role: 'Maquiador',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    rating: 4.7,
    experience: '5 anos',
    specialties: ['Maquiagem Social', 'Maquiagem para Noivas'],
    available: false,
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Professionals: React.FC = () => {
  const navigate = useNavigate();
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
  }, [navigate]);

  const filteredProfessionals = professionals.filter((professional) => {
    return professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           professional.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
           professional.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const handleProfessionalSelect = (id: string) => {
    // Store selected professional in session storage for the next step
    const selectedProfessional = professionals.find(professional => professional.id === id);
    if (selectedProfessional) {
      sessionStorage.setItem('selectedProfessional', JSON.stringify(selectedProfessional));
      toast.success(`${selectedProfessional.name} selecionado!`);
      navigate('/schedule');
    }
  };

  const goBackToServices = () => {
    navigate('/services');
  };

  return (
    <Layout>
      <div className="pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
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
            
            {/* Search */}
            <motion.div 
              className="max-w-2xl mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar profissionais..."
                  className="pl-10 pr-4 py-6"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </motion.div>
          </section>

          {/* Professionals Grid */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-display font-medium">Nossos Profissionais</h2>
                <p className="text-muted-foreground">
                  {filteredProfessionals.length} profissionais disponíveis
                </p>
              </div>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" /> Ver por Data
              </Button>
            </div>
            
            {filteredProfessionals.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {filteredProfessionals.map((professional) => (
                  <ProfessionalCard
                    key={professional.id}
                    id={professional.id}
                    name={professional.name}
                    role={professional.role}
                    image={professional.image}
                    rating={professional.rating}
                    experience={professional.experience}
                    specialties={professional.specialties}
                    available={professional.available}
                    onSelect={handleProfessionalSelect}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Nenhum profissional encontrado</h3>
                <p className="text-muted-foreground mb-6">
                  Tente ajustar seu termo de busca.
                </p>
                <Button 
                  onClick={() => setSearchTerm('')}
                >
                  Limpar busca
                </Button>
              </div>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Professionals;
