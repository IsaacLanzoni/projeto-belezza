
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Scissors, User } from 'lucide-react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ClientDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if the user is a client, if not redirect
    if (isAuthenticated && user?.userType !== 'cliente') {
      toast.error('Área restrita para clientes');
      navigate('/professional-dashboard');
    }
  }, [isAuthenticated, user, navigate]);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <Layout>
      <div className="container py-8 page-fade-in">
        <h1 className="text-3xl font-bold mb-6">Meu Painel</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Agendamentos</CardTitle>
              <CardDescription>Futuros</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                0
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Perfil</CardTitle>
              <CardDescription>Seus dados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-md flex items-center">
                <User className="h-5 w-5 mr-2 text-primary" />
                {user?.name}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="appointments">
          <TabsList className="mb-6">
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Meus Agendamentos
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Scissors className="h-4 w-4" /> Serviços Disponíveis
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Seus Agendamentos</CardTitle>
                <CardDescription>
                  Visualize e gerencie seus agendamentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  Você não possui agendamentos no momento
                  
                  <div className="mt-6">
                    <Button asChild>
                      <Link to="/services">
                        <Calendar className="h-4 w-4 mr-2" /> Agendar um serviço
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Serviços Disponíveis</CardTitle>
                <CardDescription>
                  Explore os serviços e agende seu horário
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Button asChild>
                    <Link to="/services">
                      <Scissors className="h-4 w-4 mr-2" /> Ver todos os serviços
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ClientDashboard;
