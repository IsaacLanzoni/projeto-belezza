
import React from 'react';
import { motion } from 'framer-motion';

const AuthSideBanner = () => {
  return (
    <motion.div 
      className="hidden md:block relative overflow-hidden"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-primary/40 mix-blend-multiply" />
      <img 
        src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
        alt="Salão de beleza"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white text-center">
        <h3 className="text-3xl font-display font-medium mb-4">Beleza que transforma</h3>
        <p className="text-white/90 mb-6">
          Agende seus serviços de beleza com facilidade e desfrute de uma experiência premium com os melhores profissionais.
        </p>
      </div>
    </motion.div>
  );
};

export default AuthSideBanner;
