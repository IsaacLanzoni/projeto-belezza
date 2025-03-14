
import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { serviceCategories } from '@/data/services';

interface ServicesHeroProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  activeCategory: string;
  setActiveCategory: (value: string) => void;
}

const ServicesHero: React.FC<ServicesHeroProps> = ({
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
}) => {
  return (
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
      
      {/* Search */}
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
  );
};

export default ServicesHero;
