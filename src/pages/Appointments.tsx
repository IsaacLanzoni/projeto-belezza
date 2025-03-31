import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Scissors, 
  User, 
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getUserAppointments, Appointment } from '@/utils/scheduleUtils';

const getStatusProperties = (status: string) => {
  switch (status) {
    case 'confirmed':
      return {
        label: 'Confirmado',
        color: 'bg-green-100 text-green-800 hover:bg-green-100',
        icon: <CheckCircle className="h-4 w-4" />
      };
    case 'canceled':
      return {
        label: 'Cancelado',
        color: 'bg-red-100 text-red-800 hover:bg-red-100',
        icon: <XCircle className="h-4 w-4" />
      };
    case 'completed':
      return {
        label: 'Concluído',
        color: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
        icon: <CheckCircle className="h-4 w-4" />
      };
    default:
      return {
        label: 'Pendente',
        color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
        icon: <AlertCircle className="h-4 w-4" />
      };
  }
};

const AppointmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Load user's appointments and convert them to the expected format
    const userAppointments = getUserAppointments();
    setAppointments(userAppointments);
  }, []);

  const handleCancelAppointment = (appointmentId: string) => {
    const allAppointments = JSON.parse(sessionStorage.getItem('appointments') || '[]');
    
    const updatedAllAppointments = allAppointments.map((appointment: any) => 
      appointment.id === appointmentId
        ? { ...appointment, status: 'canceled' as const }
        : appointment
    );
    
    sessionStorage.setItem('appointments', JSON.stringify(updatedAllAppointments));
    
    // Refresh the appointments list after cancellation
    const userAppointments = getUserAppointments();
    setAppointments(userAppointments);
    
    setIsDialogOpen(false);
    toast({
      title: "Agendamento cancelado",
      description: "Seu agendamento foi cancelado com sucesso.",
    });
  };

  const handleNewAppointment = () => {
    navigate('/services');
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
            </Button>
            <Button onClick={handleNewAppointment}>
              Novo Agendamento
            </Button>
          </div>

          <Card className="border-border/50 shadow-sm mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="text-primary h-5 w-5" />
                Meus Agendamentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appointment, index) => {
                    const status = getStatusProperties(appointment.status);
                    const appointmentDate = parseISO(appointment.date);
                    
                    return (
                      <motion.div
                        key={appointment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden border-border/50">
                          <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <Badge className={status.color}>
                                  <span className="flex items-center gap-1">
                                    {status.icon} {status.label}
                                  </span>
                                </Badge>
                              </div>
                              
                              <h3 className="font-medium text-lg mb-2">{appointment.service.name}</h3>
                              
                              <div className="grid gap-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-3.5 w-3.5" />
                                  <span>
                                    {format(appointmentDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-3.5 w-3.5" />
                                  <span>{appointment.time} • {appointment.service.duration} minutos</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <User className="h-3.5 w-3.5" />
                                  <span>{appointment.professional.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Scissors className="h-3.5 w-3.5" />
                                  <span>R$ {appointment.service.price.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                            
                            {appointment.status === 'confirmed' && (
                              <div className="sm:self-end">
                                <AlertDialog open={isDialogOpen && selectedAppointment?.id === appointment.id} onOpenChange={setIsDialogOpen}>
                                  <AlertDialogTrigger asChild>
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="text-destructive hover:text-destructive"
                                      onClick={() => setSelectedAppointment(appointment)}
                                    >
                                      Cancelar
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Cancelar agendamento?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Você tem certeza que deseja cancelar este agendamento? Esta ação não pode ser desfeita.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Voltar</AlertDialogCancel>
                                      <AlertDialogAction 
                                        onClick={() => handleCancelAppointment(appointment.id)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      >
                                        Sim, cancelar
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            )}
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Você ainda não tem nenhum agendamento.</p>
                  <Button onClick={handleNewAppointment}>
                    Fazer um agendamento
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AppointmentsPage;
