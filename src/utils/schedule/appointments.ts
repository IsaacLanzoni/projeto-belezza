
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';

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
export const mapAppointmentStatus = (dbStatus: string): 'confirmed' | 'canceled' | 'completed' => {
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

/**
 * Reschedules an existing appointment to a new date and time
 */
export const rescheduleAppointment = async (
  appointmentId: string,
  newDate: Date,
  newTimeSlot: string
): Promise<Appointment | null> => {
  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.error('User not authenticated');
      return null;
    }

    // Format the new date and time for the database
    const newAppointmentDateTime = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate(),
      parseInt(newTimeSlot.split(':')[0]),
      parseInt(newTimeSlot.split(':')[1])
    );

    // First, get the appointment to verify permissions and get all related data
    // Use specific hints para evitar ambiguidade nos relacionamentos com a tabela profiles
    const { data: appointmentData, error: fetchError } = await supabase
      .from('appointments')
      .select(`
        id,
        cliente_id,
        profissional_id,
        servico_id,
        status,
        services:servico_id (
          id,
          nome,
          descricao,
          preco,
          duracao_minutos
        ),
        professional:profiles!profissional_id (
          id,
          nome,
          telefone
        )
      `)
      .eq('id', appointmentId)
      .single();

    if (fetchError || !appointmentData) {
      console.error('Error fetching appointment to reschedule:', fetchError);
      return null;
    }

    // Verify the user is the owner of the appointment
    if (appointmentData.cliente_id !== user.id) {
      console.error('User does not have permission to reschedule this appointment');
      return null;
    }

    // Update the appointment with the new date and time
    const { data: updatedAppointment, error: updateError } = await supabase
      .from('appointments')
      .update({
        data_hora: newAppointmentDateTime.toISOString(),
        // Optionally reset status to 'pendente' if needed
        status: 'pendente'
      })
      .eq('id', appointmentId)
      .select()
      .single();

    if (updateError || !updatedAppointment) {
      console.error('Error updating appointment:', updateError);
      return null;
    }

    // Map the updated appointment to our app's format
    return {
      id: updatedAppointment.id,
      service: {
        id: appointmentData.services.id,
        name: appointmentData.services.nome,
        description: appointmentData.services.descricao,
        price: appointmentData.services.preco,
        duration: appointmentData.services.duracao_minutos
      },
      professional: {
        id: appointmentData.professional.id,
        name: appointmentData.professional.nome,
        phone: appointmentData.professional.telefone
      },
      date: format(newDate, 'yyyy-MM-dd'),
      time: newTimeSlot,
      status: mapAppointmentStatus(updatedAppointment.status),
      createdAt: updatedAppointment.created_at,
      userId: user.id
    };
  } catch (error) {
    console.error('Error rescheduling appointment:', error);
    return null;
  }
};
