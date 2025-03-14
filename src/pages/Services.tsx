
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ServicesHero from '@/components/services/ServicesHero';
import FeaturedServices from '@/components/services/FeaturedServices';
import ServicesList from '@/components/services/ServicesList';
import { services } from '@/data/services';
import { toast } from 'sonner';

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

  const handleClearFilters = () => {
    setSearchTerm('');
    setActiveCategory('all');
  };

  return (
    <Layout>
      <div className="pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <ServicesHero 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* Featured Services */}
          {activeCategory === 'all' && searchTerm === '' && (
            <FeaturedServices 
              featuredServices={featuredServices}
              onServiceSelect={handleServiceSelect}
            />
          )}

          {/* All Services */}
          <ServicesList 
            filteredServices={filteredServices}
            activeCategory={activeCategory}
            onServiceSelect={handleServiceSelect}
            onClearFilters={handleClearFilters}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Services;
