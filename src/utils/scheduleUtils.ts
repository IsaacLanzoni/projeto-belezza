
import { format } from 'date-fns';

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
}

/**
 * Creates and saves an appointment to session storage
 */
export const saveAppointment = (date: Date, selectedTimeSlot: string, service: any, professional: any): Appointment => {
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
  
  return appointment;
};
