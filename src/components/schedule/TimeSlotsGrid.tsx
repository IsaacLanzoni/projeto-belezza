
import React from 'react';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import TimeSlot from '@/components/TimeSlot';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

interface TimeSlotsGridProps {
  date: Date | undefined;
  timeSlots: { time: string; available: boolean }[];
  selectedTimeSlot: string | null;
  onTimeSlotSelect: (time: string) => void;
  isLoading?: boolean;
}

const TimeSlotsGrid: React.FC<TimeSlotsGridProps> = ({ 
  date, 
  timeSlots, 
  selectedTimeSlot, 
  onTimeSlotSelect,
  isLoading = false
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
        isLoading ? (
          // Loading state
          <div className="grid grid-cols-2 gap-2 max-h-[300px] p-1">
            {[...Array(8)].map((_, index) => (
              <Skeleton key={index} className="h-10 w-full rounded-md" />
            ))}
          </div>
        ) : timeSlots.length > 0 ? (
          // Time slots grid
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
          // No slots available
          <div className="h-32 flex items-center justify-center text-muted-foreground">
            Não há horários disponíveis para esta data
          </div>
        )
      ) : (
        // No date selected
        <div className="h-32 flex items-center justify-center text-muted-foreground">
          Selecione uma data para ver os horários disponíveis
        </div>
      )}
    </div>
  );
};

export default TimeSlotsGrid;
