
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { TimeRange, WeekSchedule, weekdays, timeSlots } from '@/utils/schedule/types';
import { toast } from 'sonner';

interface WeeklyScheduleProps {
  weekSchedule: WeekSchedule;
  onWeekScheduleChange: (newSchedule: WeekSchedule) => void;
}

const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ weekSchedule, onWeekScheduleChange }) => {
  const [selectedDay, setSelectedDay] = React.useState<string>('1'); // Monday by default

  const updateDayEnabled = (dayKey: string, enabled: boolean) => {
    onWeekScheduleChange({
      ...weekSchedule,
      [dayKey]: {
        ...weekSchedule[dayKey],
        enabled
      }
    });
  };

  const updateTimeRange = (dayKey: string, index: number, field: 'start' | 'end', value: string) => {
    const newSchedule = { ...weekSchedule };
    newSchedule[dayKey].timeRanges[index][field] = value;
    onWeekScheduleChange(newSchedule);
  };

  const addTimeRange = (dayKey: string) => {
    const newSchedule = { ...weekSchedule };
    newSchedule[dayKey].timeRanges.push({ start: '09:00', end: '17:00' });
    onWeekScheduleChange(newSchedule);
  };

  const removeTimeRange = (dayKey: string, index: number) => {
    const newSchedule = { ...weekSchedule };
    if (newSchedule[dayKey].timeRanges.length > 1) {
      newSchedule[dayKey].timeRanges.splice(index, 1);
      onWeekScheduleChange(newSchedule);
    } else {
      toast.info('É necessário manter pelo menos um intervalo de tempo');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex space-x-4 items-center">
          <Select value={selectedDay} onValueChange={setSelectedDay}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Selecione o dia" />
            </SelectTrigger>
            <SelectContent>
              {weekdays.map(day => (
                <SelectItem key={day.value} value={day.value}>
                  {day.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id={`enable-${selectedDay}`} 
              checked={weekSchedule[selectedDay].enabled}
              onCheckedChange={(checked) => updateDayEnabled(selectedDay, checked)}
            />
            <Label htmlFor={`enable-${selectedDay}`}>
              {weekSchedule[selectedDay].enabled ? 'Dia disponível' : 'Dia indisponível'}
            </Label>
          </div>
        </div>
        
        {weekSchedule[selectedDay].enabled && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Horários de {weekdays.find(d => d.value === selectedDay)?.label}</CardTitle>
              <CardDescription>Defina os intervalos de horários em que você atende</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weekSchedule[selectedDay].timeRanges.map((range, index) => (
                  <TimeRangeSelector
                    key={index}
                    range={range}
                    index={index}
                    dayKey={selectedDay}
                    onUpdate={updateTimeRange}
                    onRemove={removeTimeRange}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => addTimeRange(selectedDay)}
              >
                <Plus className="h-4 w-4 mr-2" /> Adicionar horário
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

interface TimeRangeSelectorProps {
  range: TimeRange;
  index: number;
  dayKey: string;
  onUpdate: (dayKey: string, index: number, field: 'start' | 'end', value: string) => void;
  onRemove: (dayKey: string, index: number) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ 
  range, 
  index, 
  dayKey, 
  onUpdate, 
  onRemove 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Select 
        value={range.start}
        onValueChange={(value) => onUpdate(dayKey, index, 'start', value)}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Início" />
        </SelectTrigger>
        <SelectContent>
          {timeSlots.map(time => (
            <SelectItem key={`start-${time}`} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <span>até</span>
      
      <Select 
        value={range.end}
        onValueChange={(value) => onUpdate(dayKey, index, 'end', value)}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Fim" />
        </SelectTrigger>
        <SelectContent>
          {timeSlots.map(time => (
            <SelectItem key={`end-${time}`} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => onRemove(dayKey, index)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default WeeklySchedule;
