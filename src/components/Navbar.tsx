import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Calendar, UserCircle, Home, Scissors, Users, Clock, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userType, setUserType] = useState<'cliente' | 'profissional'>('cliente');

  useEffect(() => {
    // Check user type when authenticated
    const checkUserType = async () => {
      if (isAuthenticated && user) {
        try {
          // This was incorrectly using fetch instead of supabase client
          const { data, error } = await supabase
            .from('profiles')
            .select('tipo_usuario')
            .eq('id', user.id)
            .single();
            
          if (!error && data?.tipo_usuario) {
            setUserType(data.tipo_usuario as 'cliente' | 'profissional');
          }
        } catch (error) {
          console.error('Error fetching user type:', error);
        }
      }
    };
    
    checkUserType();
  }, [isAuthenticated, user]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when changing routes
    setMenuOpen(false);
  }, [location.pathname]);

  const clientNavLinks = [
    { path: '/', label: 'Início', icon: <Home className="h-4 w-4 mr-2" /> },
    { path: '/services', label: 'Serviços', icon: <Scissors className="h-4 w-4 mr-2" /> },
    { path: '/professionals', label: 'Profissionais', icon: <Users className="h-4 w-4 mr-2" /> },
    { path: '/appointments', label: 'Meus Agendamentos', icon: <Calendar className="h-4 w-4 mr-2" /> },
  ];

  const professionalNavLinks = [
    { path: '/', label: 'Início', icon: <Home className="h-4 w-4 mr-2" /> },
    { path: '/professional-dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4 mr-2" /> },
  ];

  const navLinks = userType === 'profissional' ? professionalNavLinks : clientNavLinks;

  const activeLink = (path: string) => {
    return location.pathname === path ? 'text-primary' : 'text-muted-foreground hover:text-foreground';
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || menuOpen ? 'bg-background/80 backdrop-blur-md border-b' : 'bg-transparent'
      }`}
      style={{ transform: 'translateY(-1px)' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-lg md:text-xl">Belezza<span className="text-primary">App</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center text-sm font-medium transition-colors ${activeLink(
                  link.path
                )}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="text-sm text-muted-foreground mr-2">
                  Olá, {user?.name}
                </div>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" /> Sair
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">
                  <UserCircle className="h-4 w-4 mr-2" /> Entrar
                </Link>
              </Button>
            )}
            {userType === 'cliente' && (
              <Button size="sm" asChild>
                <Link to="/services">
                  <Calendar className="h-4 w-4 mr-2" /> Agendar
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b"
          >
            <div className="container mx-auto px-4 py-3">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center py-1.5 text-sm font-medium transition-colors ${activeLink(
                      link.path
                    )}`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3 flex flex-col space-y-3">
                  {isAuthenticated ? (
                    <>
                      <div className="text-sm text-muted-foreground">
                        Olá, {user?.name}
                      </div>
                      <Button variant="outline" size="sm" className="justify-start" onClick={logout}>
                        <LogOut className="h-4 w-4 mr-2" /> Sair
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm" className="justify-start" asChild>
                      <Link to="/login">
                        <UserCircle className="h-4 w-4 mr-2" /> Entrar
                      </Link>
                    </Button>
                  )}
                  {userType === 'cliente' && (
                    <Button size="sm" className="justify-start" asChild>
                      <Link to="/services">
                        <Calendar className="h-4 w-4 mr-2" /> Agendar
                      </Link>
                    </Button>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
