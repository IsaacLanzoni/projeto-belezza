
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import TimeSlot from '@/components/TimeSlot';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, ArrowLeft, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion } from 'framer-motion';

// Mock data for available time slots
const generateTimeSlots = (selectedDate: Date) => {
  // Create availability based on day of week (weekend has fewer slots)
  const isWeekend = [0, 6].includes(selectedDate.getDay());
  const startHour = 9;
  const endHour = isWeekend ? 16 : 19;
  const interval = 30; // minutes
  
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    for (let min = 0; min < 60; min += interval) {
      // Randomly make some slots unavailable (for demo purposes)
      const available = Math.random() > 0.3;
      
      slots.push({
        time: `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`,
        available
      });
    }
  }
  
  return slots;
};

const SchedulePage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlots, setTimeSlots] = useState<{ time: string; available: boolean }[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [confirmStep, setConfirmStep] = useState(false);
  const [service, setService] = useState<any>(null);
  const [professional, setProfessional] = useState<any>(null);

  useEffect(() => {
    // Get selected service and professional from session storage
    const savedService = sessionStorage.getItem('selectedService');
    const savedProfessional = sessionStorage.getItem('selectedProfessional');
    
    if (savedService && savedProfessional) {
      setService(JSON.parse(savedService));
      setProfessional(JSON.parse(savedProfessional));
    } else {
      // Redirect to services if no selections were made
      toast({
        title: "Informações incompletas",
        description: "Por favor, selecione o serviço e o profissional primeiro.",
        variant: "destructive",
      });
      navigate('/services');
    }
  }, [navigate, toast]);

  useEffect(() => {
    if (date) {
      setTimeSlots(generateTimeSlots(date));
      setSelectedTimeSlot(null); // Reset selected time when date changes
    }
  }, [date]);

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTimeSlot(time);
  };

  const handleConfirm = () => {
    setConfirmStep(true);
  };

  const handleSchedule = () => {
    if (!date || !selectedTimeSlot || !service || !professional) return;
    
    // Create appointment object
    const appointment = {
      id: `appt-${Date.now()}`,
      service,
      professional,
      date: format(date, 'yyyy-MM-dd'),
      time: selectedTimeSlot,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    
    // Save to session storage (in a real app, this would go to a database)
    const existingAppointments = JSON.parse(sessionStorage.getItem('appointments') || '[]');
    const updatedAppointments = [...existingAppointments, appointment];
    sessionStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    // Show success toast
    toast({
      title: "Agendamento realizado!",
      description: "Seu horário foi agendado com sucesso.",
    });
    
    // Navigate to appointments history
    navigate('/appointments');
  };

  const canProceed = date && selectedTimeSlot;
  
  if (!service || !professional) {
    return (
      <Layout>
        <div className="container py-12">
          <Alert className="max-w-md mx-auto">
            <AlertDescription>
              Carregando informações do agendamento...
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {confirmStep ? (
                    <>
                      <CheckCircle className="text-primary h-5 w-5" />
                      Confirmar Agendamento
                    </>
                  ) : (
                    <>
                      <CalendarIcon className="text-primary h-5 w-5" />
                      Escolha a Data e Horário
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                {!confirmStep ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-medium mb-3 flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" /> 
                        Selecione uma data
                      </h3>
                      
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        locale={ptBR}
                        disabled={(date) => {
                          // Can't select days in the past or more than 30 days in the future
                          const now = new Date();
                          now.setHours(0, 0, 0, 0);
                          const thirtyDaysFromNow = new Date();
                          thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
                          return date < now || date > thirtyDaysFromNow;
                        }}
                        className="rounded-md border pointer-events-auto"
                      />
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3 flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        {date ? (
                          <>Horários disponíveis em {format(date, "dd 'de' MMMM", { locale: ptBR })}</>
                        ) : (
                          <>Selecione uma data para ver horários</>
                        )}
                      </h3>
                      
                      {date ? (
                        <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto p-1">
                          {timeSlots.map((slot, index) => (
                            <TimeSlot
                              key={index}
                              time={slot.time}
                              available={slot.available}
                              selected={selectedTimeSlot === slot.time}
                              onClick={() => slot.available && handleTimeSlotSelect(slot.time)}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="h-32 flex items-center justify-center text-muted-foreground">
                          Selecione uma data para ver os horários disponíveis
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 bg-muted/30">
                      <h3 className="font-medium mb-3">Resumo do Agendamento</h3>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Serviço:</span>
                          <span className="font-medium">{service.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Profissional:</span>
                          <span className="font-medium">{professional.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Data:</span>
                          <span className="font-medium">
                            {format(date!, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Horário:</span>
                          <span className="font-medium">{selectedTimeSlot}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duração:</span>
                          <span className="font-medium">{service.duration} minutos</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 mt-2">
                          <span className="font-medium">Valor Total:</span>
                          <span className="font-medium text-primary">R$ {service.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => confirmStep ? setConfirmStep(false) : navigate(-1)}>
                  {confirmStep ? 'Voltar' : 'Cancelar'}
                </Button>
                
                {!confirmStep ? (
                  <Button 
                    onClick={handleConfirm} 
                    disabled={!canProceed}
                  >
                    Continuar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSchedule}
                  >
                    Confirmar Agendamento <CheckCircle className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default SchedulePage;
