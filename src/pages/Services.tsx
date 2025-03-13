
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Scissors, Calendar, Star } from 'lucide-react';
import Layout from '@/components/Layout';
import ServiceCard from '@/components/ServiceCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const serviceCategories = [
  { id: 'all', name: 'Todos' },
  { id: 'hair', name: 'Cabelo' },
  { id: 'nails', name: 'Unhas' },
  { id: 'makeup', name: 'Maquiagem' },
  { id: 'treatments', name: 'Tratamentos' },
];

const services = [
  {
    id: '1',
    category: 'hair',
    name: 'Corte Feminino',
    description: 'Corte profissional feminino, inclui lavagem e finalização.',
    price: 120,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    featured: true,
  },
  {
    id: '2',
    category: 'hair',
    name: 'Corte Masculino',
    description: 'Corte profissional masculino com acabamento perfeito.',
    price: 80,
    duration: 45,
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    featured: false,
  },
  {
    id: '3',
    category: 'hair',
    name: 'Coloração Completa',
    description: 'Coloração profissional com produtos de alta qualidade.',
    price: 200,
    duration: 120,
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    featured: true,
  },
  {
    id: '4',
    category: 'nails',
    name: 'Manicure Completa',
    description: 'Tratamento completo para unhas, incluindo cutículas e esmaltação.',
    price: 70,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1607779097040-26e60c0448f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    featured: false,
  },
  {
    id: '5',
    category: 'nails',
    name: 'Pedicure Completa',
    description: 'Tratamento completo para os pés, incluindo esfoliação e esmaltação.',
    price: 85,
    duration: 75,
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    featured: false,
  },
  {
    id: '6',
    category: 'makeup',
    name: 'Maquiagem Social',
    description: 'Maquiagem profissional para eventos e ocasiões especiais.',
    price: 150,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    featured: true,
  },
  {
    id: '7',
    category: 'makeup',
    name: 'Maquiagem para Noivas',
    description: 'Maquiagem especial para noivas com teste incluído.',
    price: 300,
    duration: 90,
    image: 'https://images.unsplash.com/photo-1457972851104-4fd469440bf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    featured: false,
  },
  {
    id: '8',
    category: 'treatments',
    name: 'Hidratação Profunda',
    description: 'Tratamento intensivo para hidratação dos fios com produtos especiais.',
    price: 130,
    duration: 90,
    image: 'https://images.unsplash.com/photo-1526045566106-788ca4fa9335?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    featured: false,
  },
  {
    id: '9',
    category: 'treatments',
    name: 'Tratamento Facial',
    description: 'Limpeza de pele profunda com produtos anti-idade.',
    price: 180,
    duration: 90,
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    featured: true,
  },
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

const Services: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredServices = services.filter(service => service.featured);

  const handleServiceSelect = (id: string) => {
    // Store selected service in session storage for the next step
    const selectedService = services.find(service => service.id === id);
    if (selectedService) {
      sessionStorage.setItem('selectedService', JSON.stringify(selectedService));
      toast.success(`${selectedService.name} selecionado!`);
      navigate('/professionals');
    }
  };

  return (
    <Layout>
      <div className="pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="mb-16 text-center">
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Nossos Serviços
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Escolha entre nossa ampla gama de serviços premium para realçar sua beleza natural.
            </motion.p>
            
            {/* Search and Filter */}
            <motion.div 
              className="max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar serviços..."
                  className="pl-10 pr-4 py-6"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </motion.div>
            
            {/* Categories */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {serviceCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className="rounded-full px-4"
                >
                  {category.name}
                </Button>
              ))}
            </motion.div>
          </section>

          {/* Featured Services */}
          {activeCategory === 'all' && searchTerm === '' && (
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-display font-medium">Destaques</h2>
                  <p className="text-muted-foreground">Nossos serviços mais populares</p>
                </div>
                <Badge variant="outline" className="px-3 py-1">
                  <Star className="h-3 w-3 fill-primary text-primary mr-1" /> Populares
                </Badge>
              </div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {featuredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    id={service.id}
                    name={service.name}
                    description={service.description}
                    price={service.price}
                    duration={service.duration}
                    image={service.image}
                    onSelect={handleServiceSelect}
                  />
                ))}
              </motion.div>
            </section>
          )}

          {/* All Services */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-display font-medium">
                  {activeCategory === 'all' ? 'Todos os Serviços' : serviceCategories.find(c => c.id === activeCategory)?.name}
                </h2>
                <p className="text-muted-foreground">
                  {filteredServices.length} serviços disponíveis
                </p>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                <Filter className="h-4 w-4" /> Filtrar
              </Button>
            </div>
            
            {filteredServices.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    id={service.id}
                    name={service.name}
                    description={service.description}
                    price={service.price}
                    duration={service.duration}
                    image={service.image}
                    onSelect={handleServiceSelect}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <Scissors className="h-12 w-12 text-muted mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Nenhum serviço encontrado</h3>
                <p className="text-muted-foreground mb-6">
                  Tente ajustar seus filtros ou termo de busca.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                  }}
                >
                  Limpar filtros
                </Button>
              </div>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
