
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Scissors, 
  Clock, 
  Calendar, 
  Award, 
  Users, 
  ChevronRight,
  Star
} from 'lucide-react';
import Layout from '@/components/Layout';

const services = [
  {
    icon: <Scissors className="h-6 w-6" />,
    name: 'Cortes & Estilos',
    description: 'Cortes modernos e tradicionais para todos os tipos de cabelo',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    name: 'Coloração & Tratamentos',
    description: 'Transforme seu visual com nossas técnicas de coloração exclusivas',
  },
  {
    icon: <Users className="h-6 w-6" />,
    name: 'Manicure & Pedicure',
    description: 'Cuidados completos para suas mãos e pés com produtos premium',
  },
];

const testimonials = [
  {
    name: 'Ana Silva',
    role: 'Cliente fiel',
    content: 'O serviço é impecável! Desde o atendimento até o resultado final, tudo é perfeito. Recomendo a todos.',
    rating: 5,
  },
  {
    name: 'Carlos Oliveira',
    role: 'Cliente novo',
    content: 'Primeira vez no salão e já virei cliente fiel. Profissionais super capacitados e ambiente agradável.',
    rating: 5,
  },
  {
    name: 'Marina Costa',
    role: 'Cliente há 2 anos',
    content: 'Adoro a facilidade de agendar pelo aplicativo e a qualidade consistente dos serviços!',
    rating: 4,
  },
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

const Index: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 lg:pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient -z-10" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span 
                className="inline-block px-3 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Bem-vindo ao Salão Belezza
              </motion.span>
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                Cuide da sua beleza com quem entende
              </motion.h1>
              <motion.p 
                className="text-lg text-muted-foreground mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                Agenda seu horário em um dos melhores salões de beleza, com profissionais experientes e atendimento personalizado para realçar sua beleza natural.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to="/services">
                  <Button size="lg" className="gap-2 hover-lift">
                    Agendar Agora <ChevronRight size={16} />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg" className="hover-lift">
                    Ver Serviços
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-xl -z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" 
                  alt="Salão de beleza" 
                  className="rounded-3xl shadow-lg object-cover aspect-[4/3] w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Por que escolher o Belezza?
            </motion.h2>
            <motion.div 
              className="h-1 w-24 bg-primary mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.name}
                custom={i}
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card p-8 rounded-2xl hover-lift"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-medium mb-3 font-display">{service.name}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <Link to="/services" className="text-primary font-medium inline-flex items-center gap-1 link-underline">
                  Ver mais <ChevronRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-primary/5 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Marque seu horário com facilidade
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Escolha o serviço, o profissional e o horário ideal para você.
              Nosso processo de agendamento é simples e rápido!
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/services">
                <Button size="lg" className="gap-2 hover-lift min-w-[200px]">
                  <Calendar className="h-4 w-4" /> Agendar Agora
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              O que nossos clientes dizem
            </motion.h2>
            <motion.div 
              className="h-1 w-24 bg-primary mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                custom={i}
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card p-8 rounded-2xl hover-lift"
              >
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={18}
                      className={`${
                        index < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
