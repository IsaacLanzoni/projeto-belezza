
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export interface ServiceProps {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  onSelect: (id: string) => void;
}

const ServiceCard: React.FC<ServiceProps> = ({
  id,
  name,
  description,
  price,
  duration,
  image,
  onSelect
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-border/50 hover-lift"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-display text-xl font-medium">{name}</h3>
          <div className="flex flex-col items-end">
            <span className="text-lg font-medium text-primary">
              R$ {price.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground">
              {duration} min
            </span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
          {description}
        </p>
        <Button 
          onClick={() => onSelect(id)} 
          variant="default" 
          className="w-full gap-2"
        >
          Selecionar <ArrowRight size={16} />
        </Button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
