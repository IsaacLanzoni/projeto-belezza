
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Generates mock time slots for a selected date
 */
export const generateTimeSlots = async (
  selectedDate: Date,
  professionalId: string
) => {
  try {
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    
    const { data, error } = await supabase
      .rpc('get_professional_available_slots', {
        professional_id: professionalId,
        date_to_check: formattedDate
      });
    
    if (error) {
      console.error('Error fetching available slots:', error);
      return [];
    }
    
    // Transform the data into the expected format
    return data.map((slot: any) => ({
      time: format(new Date(slot.slot_start), 'HH:mm'),
      available: slot.is_available
    }));
  } catch (error) {
    console.error('Error generating time slots:', error);
    
    // Fallback to the mock generation if there's an error
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
  }
};

export interface Appointment {
  id: string;
  service: any;
  professional: any;
  date: string;
  time: string;
  status: 'confirmed' | 'canceled' | 'completed'; // Updated to match the expected status types
  createdAt: string;
  userId: string | null;
}

/**
 * Creates and saves an appointment to the database
 */
export const saveAppointment = async (
  date: Date, 
  selectedTimeSlot: string, 
  serviceId: string, 
  professionalId: string
): Promise<Appointment | null> => {
  const { data: serviceData } = await supabase
    .from('services')
    .select('*')
    .eq('id', serviceId)
    .single();

  const { data: professionalData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', professionalId)
    .single();

  if (!serviceData || !professionalData) {
    console.error('Service or professional not found');
    return null;
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('User not authenticated');
    return null;
  }

  // Format the date and time for the database
  const appointmentDateTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    parseInt(selectedTimeSlot.split(':')[0]),
    parseInt(selectedTimeSlot.split(':')[1])
  );

  // Insert the appointment into the database
  const { data: appointmentData, error } = await supabase
    .from('appointments')
    .insert({
      cliente_id: user.id,
      profissional_id: professionalId,
      servico_id: serviceId,
      data_hora: appointmentDateTime.toISOString(),
      status: 'pendente'
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving appointment:', error);
    return null;
  }

  // Map the database appointment to our app's format
  return {
    id: appointmentData.id,
    service: serviceData,
    professional: professionalData,
    date: format(date, 'yyyy-MM-dd'),
    time: selectedTimeSlot,
    status: mapAppointmentStatus(appointmentData.status),
    createdAt: appointmentData.created_at,
    userId: user.id
  };
};

/**
 * Maps the database appointment status to the client app status
 */
const mapAppointmentStatus = (dbStatus: string): 'confirmed' | 'canceled' | 'completed' => {
  switch (dbStatus) {
    case 'confirmado':
      return 'confirmed';
    case 'cancelado':
      return 'canceled';
    case 'concluído':
      return 'completed';
    default:
      return 'confirmed'; // Default to confirmed for pending status
  }
};

/**
 * Gets appointments for the current user
 */
export const getUserAppointments = async (): Promise<Appointment[]> => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    
    // Get all appointments for the user
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select(`
        id,
        data_hora,
        status,
        created_at,
        services:servico_id (
          id,
          nome,
          descricao,
          preco,
          duracao_minutos
        ),
        professionals:profissional_id (
          id,
          nome,
          telefone
        )
      `)
      .eq('cliente_id', user.id)
      .order('data_hora', { ascending: true });
    
    if (error) {
      console.error('Error fetching appointments:', error);
      return [];
    }
    
    return appointments.map((appointment: any) => ({
      id: appointment.id,
      service: {
        id: appointment.services.id,
        name: appointment.services.nome,
        description: appointment.services.descricao,
        price: appointment.services.preco,
        duration: appointment.services.duracao_minutos
      },
      professional: {
        id: appointment.professionals.id,
        name: appointment.professionals.nome,
        phone: appointment.professionals.telefone
      },
      date: format(new Date(appointment.data_hora), 'yyyy-MM-dd'),
      time: format(new Date(appointment.data_hora), 'HH:mm'),
      status: mapAppointmentStatus(appointment.status),
      createdAt: appointment.created_at,
      userId: user.id
    }));
  } catch (error) {
    console.error('Error getting user appointments:', error);
    return [];
  }
};
