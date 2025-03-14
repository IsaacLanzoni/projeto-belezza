
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface DateSelectorProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ date, setDate }) => {
  return (
    <div>
      <h3 className="font-medium mb-3 flex items-center">
        <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" /> 
        Selecione uma data
      </h3>
      
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        locale={ptBR}
        disabled={(date) => {
          // Can't select days in the past or more than 30 days in the future
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          const thirtyDaysFromNow = new Date();
          thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
          return date < now || date > thirtyDaysFromNow;
        }}
        className="rounded-md border pointer-events-auto"
      />
    </div>
  );
};

export default DateSelector;
