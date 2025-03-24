
import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { ptBR } from 'date-fns/locale';
import { format, addDays } from 'date-fns';
import { Clock, Save, Plus, Trash2 } from 'lucide-react';

const timeSlots = Array.from({ length: 24 }, (_, hour) => 
  [`${hour.toString().padStart(2, '0')}:00`, `${hour.toString().padStart(2, '0')}:30`]
).flat();

const weekdays = [
  { value: '0', label: 'Domingo' },
  { value: '1', label: 'Segunda-feira' },
  { value: '2', label: 'Terça-feira' },
  { value: '3', label: 'Quarta-feira' },
  { value: '4', label: 'Quinta-feira' },
  { value: '5', label: 'Sexta-feira' },
  { value: '6', label: 'Sábado' },
];

interface TimeRange {
  start: string;
  end: string;
}

interface DaySchedule {
  enabled: boolean;
  timeRanges: TimeRange[];
}

type WeekSchedule = Record<string, DaySchedule>;

// Define the database table structure from Supabase
interface ScheduleTableRow {
  id: string;
  professional_id: string;
  schedule_type: string;
  date: string | null;
  schedule_data: any;
  created_at: string;
}

const initialWeekSchedule: WeekSchedule = {
  '0': { enabled: false, timeRanges: [{ start: '09:00', end: '17:00' }] },
  '1': { enabled: true, timeRanges: [{ start: '09:00', end: '17:00' }] },
  '2': { enabled: true, timeRanges: [{ start: '09:00', end: '17:00' }] },
  '3': { enabled: true, timeRanges: [{ start: '09:00', end: '17:00' }] },
  '4': { enabled: true, timeRanges: [{ start: '09:00', end: '17:00' }] },
  '5': { enabled: true, timeRanges: [{ start: '09:00', end: '17:00' }] },
  '6': { enabled: false, timeRanges: [{ start: '09:00', end: '17:00' }] },
};

const AvailabilityManager: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedDay, setSelectedDay] = useState<string>('1'); // Monday by default
  const [weekSchedule, setWeekSchedule] = useState<WeekSchedule>(initialWeekSchedule);
  const [specialDates, setSpecialDates] = useState<Record<string, { enabled: boolean, timeRanges: TimeRange[] }>>({});
  const [activeTab, setActiveTab] = useState<string>('weekly');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadProfessionalSchedule();
  }, []);

  const loadProfessionalSchedule = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Usuário não autenticado');
        return;
      }
      
      // Load weekly schedule
      const { data: weeklyData, error: weeklyError } = await supabase
        .from('professional_schedule')
        .select('*')
        .eq('professional_id', user.id)
        .eq('schedule_type', 'weekly');
      
      if (weeklyError) throw weeklyError;
      
      if (weeklyData && weeklyData.length > 0) {
        // Type assertion and parsing of the JSON data
        const scheduleData = weeklyData[0].schedule_data;
        setWeekSchedule(scheduleData as WeekSchedule);
      }
      
      // Load special dates
      const { data: specialData, error: specialError } = await supabase
        .from('professional_schedule')
        .select('*')
        .eq('professional_id', user.id)
        .eq('schedule_type', 'special');
      
      if (specialError) throw specialError;
      
      if (specialData && specialData.length > 0) {
        const specialDatesMap: Record<string, { enabled: boolean, timeRanges: TimeRange[] }> = {};
        
        specialData.forEach((item: ScheduleTableRow) => {
          if (item.date) {
            specialDatesMap[item.date] = item.schedule_data;
          }
        });
        
        setSpecialDates(specialDatesMap);
      }
    } catch (error) {
      console.error('Error loading schedule:', error);
      toast.error('Erro ao carregar agenda');
    } finally {
      setIsLoading(false);
    }
  };

  const saveSchedule = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Usuário não autenticado');
        return;
      }
      
      // Save weekly schedule
      const { error: weeklyError } = await supabase
        .from('professional_schedule')
        .upsert({
          professional_id: user.id,
          schedule_type: 'weekly',
          schedule_data: weekSchedule,
        }, { onConflict: 'professional_id,schedule_type' });
      
      if (weeklyError) throw weeklyError;
      
      // Save special dates
      for (const [date, schedule] of Object.entries(specialDates)) {
        const { error: specialError } = await supabase
          .from('professional_schedule')
          .upsert({
            professional_id: user.id,
            schedule_type: 'special',
            date,
            schedule_data: schedule,
          }, { onConflict: 'professional_id,schedule_type,date' });
        
        if (specialError) throw specialError;
      }
      
      toast.success('Agenda salva com sucesso');
    } catch (error) {
      console.error('Error saving schedule:', error);
      toast.error('Erro ao salvar agenda');
    } finally {
      setIsLoading(false);
    }
  };

  const updateDayEnabled = (dayKey: string, enabled: boolean) => {
    setWeekSchedule(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        enabled
      }
    }));
  };

  const updateTimeRange = (dayKey: string, index: number, field: 'start' | 'end', value: string) => {
    setWeekSchedule(prev => {
      const newSchedule = { ...prev };
      newSchedule[dayKey].timeRanges[index][field] = value;
      return newSchedule;
    });
  };

  const addTimeRange = (dayKey: string) => {
    setWeekSchedule(prev => {
      const newSchedule = { ...prev };
      newSchedule[dayKey].timeRanges.push({ start: '09:00', end: '17:00' });
      return newSchedule;
    });
  };

  const removeTimeRange = (dayKey: string, index: number) => {
    setWeekSchedule(prev => {
      const newSchedule = { ...prev };
      if (newSchedule[dayKey].timeRanges.length > 1) {
        newSchedule[dayKey].timeRanges.splice(index, 1);
      } else {
        toast.info('É necessário manter pelo menos um intervalo de tempo');
      }
      return newSchedule;
    });
  };

  const updateSpecialDate = (date: Date, enabled: boolean) => {
    if (!date) return;
    
    const dateStr = format(date, 'yyyy-MM-dd');
    setSpecialDates(prev => {
      const newSpecialDates = { ...prev };
      
      if (!newSpecialDates[dateStr]) {
        newSpecialDates[dateStr] = {
          enabled,
          timeRanges: [{ start: '09:00', end: '17:00' }]
        };
      } else {
        newSpecialDates[dateStr].enabled = enabled;
      }
      
      return newSpecialDates;
    });
  };

  const renderWeeklySchedule = () => (
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
                  <div key={index} className="flex items-center space-x-2">
                    <Select 
                      value={range.start}
                      onValueChange={(value) => updateTimeRange(selectedDay, index, 'start', value)}
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
                      onValueChange={(value) => updateTimeRange(selectedDay, index, 'end', value)}
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
                      onClick={() => removeTimeRange(selectedDay, index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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

  const renderSpecialDates = () => {
    const currentDateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
    const currentDateSchedule = currentDateStr ? specialDates[currentDateStr] : undefined;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-3">Selecione uma data específica:</h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
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
                  <div key={index} className="flex items-center space-x-2">
                    <Select 
                      value={range.start}
                      onValueChange={(value) => {
                        setSpecialDates(prev => {
                          const newSpecialDates = { ...prev };
                          const dateStr = format(selectedDate, 'yyyy-MM-dd');
                          newSpecialDates[dateStr].timeRanges[index].start = value;
                          return newSpecialDates;
                        });
                      }}
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
                      onValueChange={(value) => {
                        setSpecialDates(prev => {
                          const newSpecialDates = { ...prev };
                          const dateStr = format(selectedDate, 'yyyy-MM-dd');
                          newSpecialDates[dateStr].timeRanges[index].end = value;
                          return newSpecialDates;
                        });
                      }}
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
                      onClick={() => {
                        setSpecialDates(prev => {
                          const newSpecialDates = { ...prev };
                          const dateStr = format(selectedDate, 'yyyy-MM-dd');
                          if (newSpecialDates[dateStr].timeRanges.length > 1) {
                            newSpecialDates[dateStr].timeRanges.splice(index, 1);
                          }
                          return newSpecialDates;
                        });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSpecialDates(prev => {
                    const newSpecialDates = { ...prev };
                    const dateStr = format(selectedDate, 'yyyy-MM-dd');
                    newSpecialDates[dateStr].timeRanges.push({ start: '09:00', end: '17:00' });
                    return newSpecialDates;
                  });
                }}
              >
                <Plus className="h-4 w-4 mr-2" /> Adicionar horário
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="weekly" className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> Horários Semanais
          </TabsTrigger>
          <TabsTrigger value="special" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Datas Especiais
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="weekly" className="space-y-4">
          {renderWeeklySchedule()}
        </TabsContent>
        
        <TabsContent value="special" className="space-y-4">
          {renderSpecialDates()}
        </TabsContent>
      </Tabs>
      
      <Button 
        onClick={saveSchedule}
        disabled={isLoading}
        className="w-full md:w-auto"
      >
        <Save className="h-4 w-4 mr-2" />
        {isLoading ? 'Salvando...' : 'Salvar Disponibilidade'}
      </Button>
    </div>
  );
};

export default AvailabilityManager;
