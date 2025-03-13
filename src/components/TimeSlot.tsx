
import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TimeSlotProps {
  time: string;
  available: boolean;
  selected: boolean;
  onClick: () => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({
  time,
  available,
  selected,
  onClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={available ? onClick : undefined}
      className={cn(
        'flex items-center gap-2 p-3 rounded-md border transition-all',
        available ? 'cursor-pointer hover:border-primary/50 hover:bg-primary/5' : 'opacity-50 cursor-not-allowed',
        selected ? 'border-primary bg-primary/10' : 'border-border',
      )}
    >
      <Clock size={16} className={selected ? 'text-primary' : 'text-muted-foreground'} />
      <span className={selected ? 'font-medium text-foreground' : 'text-muted-foreground'}>
        {time}
      </span>
    </motion.div>
  );
};

export default TimeSlot;
