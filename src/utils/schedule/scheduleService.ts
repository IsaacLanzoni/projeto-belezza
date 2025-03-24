
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';
import { WeekSchedule, ScheduleTableRow } from './types';
import { toast } from 'sonner';

export const loadProfessionalSchedule = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error('Usuário não autenticado');
      return null;
    }
    
    // Load weekly schedule
    const { data: weeklyData, error: weeklyError } = await supabase
      .from('professional_schedule')
      .select('*')
      .eq('professional_id', user.id)
      .eq('schedule_type', 'weekly');
    
    if (weeklyError) throw weeklyError;
    
    let weekSchedule = null;
    if (weeklyData && weeklyData.length > 0) {
      const scheduleData = weeklyData[0].schedule_data;
      weekSchedule = scheduleData as unknown as WeekSchedule;
    }
    
    // Load special dates
    const { data: specialData, error: specialError } = await supabase
      .from('professional_schedule')
      .select('*')
      .eq('professional_id', user.id)
      .eq('schedule_type', 'special');
    
    if (specialError) throw specialError;
    
    const specialDatesMap: Record<string, { enabled: boolean, timeRanges: { start: string, end: string }[] }> = {};
    
    if (specialData && specialData.length > 0) {
      specialData.forEach((item: ScheduleTableRow) => {
        if (item.date) {
          specialDatesMap[item.date] = item.schedule_data as unknown as { 
            enabled: boolean, 
            timeRanges: { start: string, end: string }[] 
          };
        }
      });
    }
    
    return {
      weekSchedule,
      specialDates: specialDatesMap
    };
  } catch (error) {
    console.error('Error loading schedule:', error);
    toast.error('Erro ao carregar agenda');
    return null;
  }
};

export const saveSchedule = async (
  weekSchedule: WeekSchedule, 
  specialDates: Record<string, { enabled: boolean, timeRanges: { start: string, end: string }[] }>
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error('Usuário não autenticado');
      return false;
    }
    
    // Save weekly schedule - type casting JSON data
    const { error: weeklyError } = await supabase
      .from('professional_schedule')
      .upsert({
        professional_id: user.id,
        schedule_type: 'weekly',
        schedule_data: weekSchedule as unknown as Json,
      }, { onConflict: 'professional_id,schedule_type' });
    
    if (weeklyError) throw weeklyError;
    
    // Save special dates - type casting JSON data
    for (const [date, schedule] of Object.entries(specialDates)) {
      const { error: specialError } = await supabase
        .from('professional_schedule')
        .upsert({
          professional_id: user.id,
          schedule_type: 'special',
          date,
          schedule_data: schedule as unknown as Json,
        }, { onConflict: 'professional_id,schedule_type,date' });
      
      if (specialError) throw specialError;
    }
    
    toast.success('Agenda salva com sucesso');
    return true;
  } catch (error) {
    console.error('Error saving schedule:', error);
    toast.error('Erro ao salvar agenda');
    return false;
  }
};
