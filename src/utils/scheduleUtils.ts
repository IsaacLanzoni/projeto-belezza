
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Generates mock time slots for a selected date
 */
export const generateTimeSlots = (selectedDate: Date) => {
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

export interface Appointment {
  id: string;
  service: any;
  professional: any;
  date: string;
  time: string;
  status: string;
  createdAt: string;
  userId: string | null; // Add userId to associate appointments with specific users
}

/**
 * Creates and saves an appointment to session storage
 */
export const saveAppointment = (date: Date, selectedTimeSlot: string, service: any, professional: any): Appointment => {
  // Get current user ID from localStorage
  const currentUser = localStorage.getItem('user');
  const userId = currentUser ? JSON.parse(currentUser).id : null;
  
  const appointment = {
    id: `appt-${Date.now()}`,
    service,
    professional,
    date: format(date, 'yyyy-MM-dd'),
    time: selectedTimeSlot,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    userId // Associate the appointment with the current user
  };
  
  // Save to session storage (in a real app, this would go to a database)
  const existingAppointments = JSON.parse(sessionStorage.getItem('appointments') || '[]');
  const updatedAppointments = [...existingAppointments, appointment];
  sessionStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  
  return appointment;
};

/**
 * Gets appointments for the current user
 */
export const getUserAppointments = (): Appointment[] => {
  // Get current user ID from localStorage
  const currentUser = localStorage.getItem('user');
  const userId = currentUser ? JSON.parse(currentUser).id : null;
  
  if (!userId) return [];
  
  // Get all appointments and filter by userId
  const allAppointments = JSON.parse(sessionStorage.getItem('appointments') || '[]');
  return allAppointments.filter((appointment: Appointment) => appointment.userId === userId);
};
