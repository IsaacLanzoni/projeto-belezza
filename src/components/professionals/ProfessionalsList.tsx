
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProfessionalCard from '@/components/ProfessionalCard';

interface Professional {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  experience: string;
  specialties: string[];
  available: boolean;
}

interface ProfessionalsListProps {
  professionals: Professional[];
  searchTerm: string;
  onSelect: (id: string) => void;
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

const ProfessionalsList: React.FC<ProfessionalsListProps> = ({ 
  professionals, 
  searchTerm, 
  onSelect 
}) => {
  const filteredProfessionals = professionals.filter((professional) => {
    return professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           professional.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
           professional.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
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
              onSelect={onSelect}
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
            onClick={() => {
              // This will be handled in the parent component
              document.dispatchEvent(new CustomEvent('clearProfessionalSearch'));
            }}
          >
            Limpar busca
          </Button>
        </div>
      )}
    </section>
  );
};

export default ProfessionalsList;
