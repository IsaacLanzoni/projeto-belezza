
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand section */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-display font-bold text-salon-800">Belezza</h2>
            </Link>
            <p className="text-muted-foreground">
              Transforme seu visual, realce sua beleza e cuide de si mesmo(a) com nossos serviços de salão premium.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links section */}
          <div>
            <h3 className="font-display font-medium text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Serviços</Link></li>
              <li><Link to="/professionals" className="text-muted-foreground hover:text-primary transition-colors">Profissionais</Link></li>
              <li><Link to="/appointments" className="text-muted-foreground hover:text-primary transition-colors">Meus Agendamentos</Link></li>
              <li><Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">Login / Cadastro</Link></li>
            </ul>
          </div>

          {/* Services section */}
          <div>
            <h3 className="font-display font-medium text-lg mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Cortes de Cabelo</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Coloração</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Tratamentos</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Manicure & Pedicure</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Maquiagem</Link></li>
            </ul>
          </div>

          {/* Contact section */}
          <div>
            <h3 className="font-display font-medium text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Av. Paulista, 1000 - São Paulo, SP, 01310-000</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-primary" />
                <span className="text-muted-foreground">(11) 99999-9999</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-primary" />
                <span className="text-muted-foreground">contato@belezza.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Belezza Salão. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
