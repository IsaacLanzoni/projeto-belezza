
import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ServiceCard';
import { Service, serviceCategories } from '@/data/services';

interface ServicesListProps {
  filteredServices: Service[];
  activeCategory: string;
  onServiceSelect: (id: string) => void;
  onClearFilters: () => void;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ServicesList: React.FC<ServicesListProps> = ({ 
  filteredServices, 
  activeCategory, 
  onServiceSelect,
  onClearFilters
}) => {
  return (
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
              onSelect={onServiceSelect}
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
          <Button onClick={onClearFilters}>
            Limpar filtros
          </Button>
        </div>
      )}
    </section>
  );
};

export default ServicesList;
