
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import TimeRangeSelector from './TimeRangeSelector';

interface SpecialDatesProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  specialDates: Record<string, { enabled: boolean, timeRanges: { start: string, end: string }[] }>;
  onSpecialDatesChange: (newSpecialDates: Record<string, { enabled: boolean, timeRanges: { start: string, end: string }[] }>) => void;
}

const SpecialDates: React.FC<SpecialDatesProps> = ({
  selectedDate,
  onDateChange,
  specialDates,
  onSpecialDatesChange
}) => {
  const currentDateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const currentDateSchedule = currentDateStr ? specialDates[currentDateStr] : undefined;

  const updateSpecialDate = (date: Date, enabled: boolean) => {
    if (!date) return;
    
    const dateStr = format(date, 'yyyy-MM-dd');
    const newSpecialDates = { ...specialDates };
    
    if (!newSpecialDates[dateStr]) {
      newSpecialDates[dateStr] = {
        enabled,
        timeRanges: [{ start: '09:00', end: '17:00' }]
      };
    } else {
      newSpecialDates[dateStr].enabled = enabled;
    }
    
    onSpecialDatesChange(newSpecialDates);
  };

  const addTimeRange = () => {
    if (!selectedDate) return;
    
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const newSpecialDates = { ...specialDates };
    newSpecialDates[dateStr].timeRanges.push({ start: '09:00', end: '17:00' });
    onSpecialDatesChange(newSpecialDates);
  };

  const updateTimeRange = (index: number, field: 'start' | 'end', value: string) => {
    if (!selectedDate) return;
    
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const newSpecialDates = { ...specialDates };
    newSpecialDates[dateStr].timeRanges[index][field] = value;
    onSpecialDatesChange(newSpecialDates);
  };

  const removeTimeRange = (index: number) => {
    if (!selectedDate) return;
    
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const newSpecialDates = { ...specialDates };
    if (newSpecialDates[dateStr].timeRanges.length > 1) {
      newSpecialDates[dateStr].timeRanges.splice(index, 1);
      onSpecialDatesChange(newSpecialDates);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-medium mb-3">Selecione uma data específica:</h3>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateChange}
          locale={ptBR}
          disabled={(date) => {
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            return date < now;
          }}
          modifiers={{
            booked: Object.keys(specialDates).map(dateStr => new Date(dateStr)),
          }}
          modifiersClassNames={{
            booked: 'border border-primary',
          }}
          className="rounded-md border"
        />
        
        {selectedDate && (
          <div className="mt-4 flex items-center space-x-2">
            <Switch 
              id="enable-special-date"
              checked={!!currentDateSchedule?.enabled}
              onCheckedChange={(checked) => updateSpecialDate(selectedDate, checked)}
            />
            <Label htmlFor="enable-special-date">
              {currentDateSchedule?.enabled ? 'Data disponível' : 'Data indisponível'}
            </Label>
          </div>
        )}
      </div>
      
      {selectedDate && currentDateSchedule?.enabled && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Horários para {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </CardTitle>
            <CardDescription>Defina horários especiais para esta data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentDateSchedule?.timeRanges.map((range, index) => (
                <TimeRangeSelector
                  key={index}
                  range={range}
                  index={index}
                  onUpdate={updateTimeRange}
                  onRemove={removeTimeRange}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              className="mt-4"
              onClick={addTimeRange}
            >
              <Plus className="h-4 w-4 mr-2" /> Adicionar horário
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SpecialDates;
