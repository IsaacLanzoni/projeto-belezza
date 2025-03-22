
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';

/**
 * Generates time slots for a selected date
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
