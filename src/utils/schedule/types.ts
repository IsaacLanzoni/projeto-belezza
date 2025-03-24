
import { Json } from '@/integrations/supabase/types';

export interface TimeRange {
  start: string;
  end: string;
}

export interface DaySchedule {
  enabled: boolean;
  timeRanges: TimeRange[];
}

export type WeekSchedule = Record<string, DaySchedule>;

export interface ScheduleTableRow {
  id: string;
  professional_id: string;
  schedule_type: string;
  date: string | null;
  schedule_data: Json;
  created_at: string;
}

export const initialWeekSchedule: WeekSchedule = {
  '0': { enabled: false, timeRanges: [{ start: '09:00', end: '17:00' }] },
  '1': { enabled: true, timeRanges: [{ start: '09:00', end: '17:00' }] },
  '2': { enabled: true, timeRanges: [{ start: '09:00', end: '17:00' }] },
  '3': { enabled: true, timeRanges: [{ start: '09:00', end: '17:00' }] },
  '4': { enabled: true, timeRanges: [{ start: '09:00', end: '17:00' }] },
  '5': { enabled: true, timeRanges: [{ start: '09:00', end: '17:00' }] },
  '6': { enabled: false, timeRanges: [{ start: '09:00', end: '17:00' }] },
};

export const weekdays = [
  { value: '0', label: 'Domingo' },
  { value: '1', label: 'Segunda-feira' },
  { value: '2', label: 'Terça-feira' },
  { value: '3', label: 'Quarta-feira' },
  { value: '4', label: 'Quinta-feira' },
  { value: '5', label: 'Sexta-feira' },
  { value: '6', label: 'Sábado' },
];

export const timeSlots = Array.from({ length: 24 }, (_, hour) => 
  [`${hour.toString().padStart(2, '0')}:00`, `${hour.toString().padStart(2, '0')}:30`]
).flat();
