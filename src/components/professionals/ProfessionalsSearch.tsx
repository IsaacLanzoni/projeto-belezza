
import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ProfessionalsSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const ProfessionalsSearch: React.FC<ProfessionalsSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
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
  );
};

export default ProfessionalsSearch;
