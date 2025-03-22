
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion } from 'framer-motion';

// Import new components
import DateSelector from '@/components/schedule/DateSelector';
import TimeSlotsGrid from '@/components/schedule/TimeSlotsGrid';
import AppointmentSummary from '@/components/schedule/AppointmentSummary';

// Import utilities
import { generateTimeSlots, saveAppointment } from '@/utils/scheduleUtils';

const SchedulePage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlots, setTimeSlots] = useState<{ time: string; available: boolean }[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [confirmStep, setConfirmStep] = useState(false);
  const [service, setService] = useState<any>(null);
  const [professional, setProfessional] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    const fetchTimeSlots = async () => {
      if (date && professional) {
        setIsLoading(true);
        try {
          const slots = await generateTimeSlots(date, professional.id);
          setTimeSlots(slots);
          setSelectedTimeSlot(null); // Reset selected time when date changes
        } catch (error) {
          console.error('Error fetching time slots:', error);
          toast({
            title: "Erro ao buscar horários",
            description: "Não foi possível obter os horários disponíveis.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchTimeSlots();
  }, [date, professional, toast]);

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTimeSlot(time);
  };

  const handleConfirm = () => {
    setConfirmStep(true);
  };

  const handleSchedule = async () => {
    if (!date || !selectedTimeSlot || !service || !professional) return;
    
    setIsLoading(true);
    try {
      // Save appointment and show success toast
      const appointment = await saveAppointment(date, selectedTimeSlot, service.id, professional.id);
      
      if (appointment) {
        toast({
          title: "Agendamento realizado!",
          description: "Seu horário foi agendado com sucesso.",
        });
        
        // Navigate to appointments history
        navigate('/appointments');
      } else {
        throw new Error("Falha ao criar agendamento");
      }
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      toast({
        title: "Erro ao agendar",
        description: "Não foi possível completar o agendamento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
                    <DateSelector date={date} setDate={setDate} />
                    <TimeSlotsGrid 
                      date={date}
                      timeSlots={timeSlots}
                      selectedTimeSlot={selectedTimeSlot}
                      onTimeSlotSelect={handleTimeSlotSelect}
                      isLoading={isLoading}
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {date && selectedTimeSlot && (
                      <AppointmentSummary
                        service={service}
                        professional={professional}
                        date={date}
                        selectedTimeSlot={selectedTimeSlot}
                      />
                    )}
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
                    disabled={!canProceed || isLoading}
                  >
                    Continuar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSchedule}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processando...' : 'Confirmar Agendamento'} 
                    {!isLoading && <CheckCircle className="ml-2 h-4 w-4" />}
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
