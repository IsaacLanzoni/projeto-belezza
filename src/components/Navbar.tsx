
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, CalendarClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Serviços', path: '/services' },
    { title: 'Profissionais', path: '/professionals' },
    { title: 'Agendamentos', path: '/appointments' },
  ];

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" }
  };

  const linkVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
    closed: { opacity: 0, y: 20 }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-display font-bold text-salon-800">
            Belezza
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative font-medium transition-colors ${
                isActive(link.path) 
                ? 'text-primary font-semibold' 
                : 'text-foreground/80 hover:text-primary'
              } link-underline`}
              onClick={closeMenu}
            >
              {link.title}
              {isActive(link.path) && (
                <motion.span
                  layoutId="navIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="font-medium gap-1 hover-lift">
              <User size={16} /> Entrar
            </Button>
          </Link>
          <Link to="/services">
            <Button size="sm" className="font-medium gap-1 hover-lift">
              <CalendarClock size={16} /> Agendar
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-primary rounded-full p-2 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden fixed inset-0 top-16 bg-white/95 backdrop-blur-md z-40 flex flex-col p-6"
      >
        <motion.nav
          variants={linkVariants}
          className="flex flex-col space-y-6 pt-6"
        >
          {navLinks.map((link) => (
            <motion.div key={link.path} variants={linkVariants}>
              <Link
                to={link.path}
                className={`text-xl font-medium block ${
                  isActive(link.path) 
                  ? 'text-primary font-semibold' 
                  : 'text-foreground/80'
                }`}
                onClick={closeMenu}
              >
                {link.title}
              </Link>
            </motion.div>
          ))}
          <motion.div variants={linkVariants} className="pt-6 flex flex-col space-y-4">
            <Link to="/login" onClick={closeMenu}>
              <Button variant="outline" className="w-full justify-start text-left font-medium">
                <User size={18} className="mr-2" /> Entrar
              </Button>
            </Link>
            <Link to="/services" onClick={closeMenu}>
              <Button className="w-full justify-start text-left font-medium">
                <CalendarClock size={18} className="mr-2" /> Agendar Agora
              </Button>
            </Link>
          </motion.div>
        </motion.nav>
      </motion.div>
    </header>
  );
};

export default Navbar;
