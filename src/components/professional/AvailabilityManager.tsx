
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Clock, Save, Calendar as CalendarIcon } from 'lucide-react';
import { initialWeekSchedule, WeekSchedule } from '@/utils/schedule/types';
import { loadProfessionalSchedule, saveSchedule } from '@/utils/schedule/scheduleService';
import WeeklySchedule from './WeeklySchedule';
import SpecialDates from './SpecialDates';

const AvailabilityManager: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [weekSchedule, setWeekSchedule] = useState<WeekSchedule>(initialWeekSchedule);
  const [specialDates, setSpecialDates] = useState<Record<string, { enabled: boolean, timeRanges: { start: string, end: string }[] }>>({});
  const [activeTab, setActiveTab] = useState<string>('weekly');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadScheduleData();
  }, []);

  const loadScheduleData = async () => {
    setIsLoading(true);
    try {
      const data = await loadProfessionalSchedule();
      if (data) {
        if (data.weekSchedule) {
          setWeekSchedule(data.weekSchedule);
        }
        setSpecialDates(data.specialDates);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSchedule = async () => {
    setIsLoading(true);
    try {
      await saveSchedule(weekSchedule, specialDates);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="weekly" className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> Horários Semanais
          </TabsTrigger>
          <TabsTrigger value="special" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" /> Datas Especiais
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="weekly" className="space-y-4">
          <WeeklySchedule 
            weekSchedule={weekSchedule}
            onWeekScheduleChange={setWeekSchedule}
          />
        </TabsContent>
        
        <TabsContent value="special" className="space-y-4">
          <SpecialDates 
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            specialDates={specialDates}
            onSpecialDatesChange={setSpecialDates}
          />
        </TabsContent>
      </Tabs>
      
      <Button 
        onClick={handleSaveSchedule}
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
