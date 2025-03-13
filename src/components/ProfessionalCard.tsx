
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar } from 'lucide-react';

export interface ProfessionalProps {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  experience: string;
  specialties: string[];
  available: boolean;
  onSelect: (id: string) => void;
}

const ProfessionalCard: React.FC<ProfessionalProps> = ({
  id,
  name,
  role,
  image,
  rating,
  experience,
  specialties,
  available,
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
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-display text-xl font-medium">{name}</h3>
            <p className="text-muted-foreground text-sm">{role}</p>
            <div className="flex items-center mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm ml-1">({rating.toFixed(1)})</span>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm mb-2">
            <span className="font-medium">Experiência:</span> {experience}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="font-normal">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          {available ? (
            <Button 
              onClick={() => onSelect(id)} 
              variant="default" 
              className="w-full gap-2"
            >
              <Calendar size={16} /> Ver Horários
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="w-full" 
              disabled
            >
              Indisponível
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfessionalCard;
