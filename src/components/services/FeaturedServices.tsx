
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ServiceCard from '@/components/ServiceCard';
import { Service } from '@/data/services';

interface FeaturedServicesProps {
  featuredServices: Service[];
  onServiceSelect: (id: string) => void;
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

const FeaturedServices: React.FC<FeaturedServicesProps> = ({ featuredServices, onServiceSelect }) => {
  return (
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
            onSelect={onServiceSelect}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedServices;
