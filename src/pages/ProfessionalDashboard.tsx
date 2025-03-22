
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, Scissors } from 'lucide-react';
import Layout from '@/components/Layout';
import AvailabilityManager from '@/components/professional/AvailabilityManager';
import { useAuth } from '@/contexts/AuthContext';

const ProfessionalDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <Layout>
      <div className="container py-8 page-fade-in">
        <h1 className="text-3xl font-bold mb-6">Painel do Profissional</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Agendamentos</CardTitle>
              <CardDescription>Hoje</CardDescription>
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
              <CardTitle className="text-lg font-medium">Clientes</CardTitle>
              <CardDescription>Total</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                0
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Serviços</CardTitle>
              <CardDescription>Oferecidos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <Scissors className="h-5 w-5 mr-2 text-primary" />
                0
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="availability">
          <TabsList className="mb-6">
            <TabsTrigger value="availability" className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> Gerenciar Disponibilidade
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Agendamentos
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="availability">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Disponibilidade</CardTitle>
                <CardDescription>
                  Configure seus horários de atendimento e disponibilidade para novos agendamentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AvailabilityManager />
              </CardContent>
            </Card>
          </TabsContent>
          
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProfessionalDashboard;
