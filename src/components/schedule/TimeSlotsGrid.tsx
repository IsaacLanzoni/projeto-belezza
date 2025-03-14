
import React from 'react';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import TimeSlot from '@/components/TimeSlot';
import { motion } from 'framer-motion';

interface TimeSlotsGridProps {
  date: Date | undefined;
  timeSlots: { time: string; available: boolean }[];
  selectedTimeSlot: string | null;
  onTimeSlotSelect: (time: string) => void;
}

const TimeSlotsGrid: React.FC<TimeSlotsGridProps> = ({ 
  date, 
  timeSlots, 
  selectedTimeSlot, 
  onTimeSlotSelect 
}) => {
  return (
    <div>
      <h3 className="font-medium mb-3 flex items-center">
        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
        {date ? (
          <>Horários disponíveis em {format(date, "dd 'de' MMMM", { locale: ptBR })}</>
        ) : (
          <>Selecione uma data para ver horários</>
        )}
      </h3>
      
      {date ? (
        <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto p-1">
          {timeSlots.map((slot, index) => (
            <TimeSlot
              key={index}
              time={slot.time}
              available={slot.available}
              selected={selectedTimeSlot === slot.time}
              onClick={() => slot.available && onTimeSlotSelect(slot.time)}
            />
          ))}
        </div>
      ) : (
        <div className="h-32 flex items-center justify-center text-muted-foreground">
          Selecione uma data para ver os horários disponíveis
        </div>
      )}
    </div>
  );
};

export default TimeSlotsGrid;
