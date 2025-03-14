
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarCheck, Star, Clock, Scissors } from 'lucide-react';
import Layout from '@/components/Layout';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const handleBookAppointment = () => {
    // Clear any previous selections from session storage
    sessionStorage.removeItem('selectedService');
    sessionStorage.removeItem('selectedProfessional');
    // Navigate to services selection page
    navigate('/services');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-24">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-display font-medium leading-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Beleza e bem-estar ao seu alcance
              </motion.h1>
              <motion.p 
                className="text-xl text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Agende serviços de beleza com os melhores profissionais da cidade diretamente pelo seu celular.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Button
                  size="lg"
                  className="mr-4 gap-2"
                  onClick={handleBookAppointment}
                >
                  Agendar Agora <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/appointments')}
                >
                  Meus Agendamentos
                </Button>
              </motion.div>
            </div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80"
                alt="Salon services"
                className="w-full h-[500px] object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-background border shadow-lg p-4 rounded-xl">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> 4.9 Avaliação média
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">Como funciona</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Nosso sistema de agendamento é simples e intuitivo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border rounded-xl p-6 text-center shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Scissors className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">1. Escolha o serviço</h3>
              <p className="text-muted-foreground">
                Selecione entre diversos serviços de beleza disponíveis.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 text-center shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">2. Selecione a data e hora</h3>
              <p className="text-muted-foreground">
                Encontre o dia e horário que melhor se adapta à sua agenda.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 text-center shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <CalendarCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">3. Confirme seu agendamento</h3>
              <p className="text-muted-foreground">
                Receba a confirmação e lembretes do seu agendamento.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              size="lg"
              onClick={handleBookAppointment}
              className="gap-2"
            >
              Agendar Agora <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
