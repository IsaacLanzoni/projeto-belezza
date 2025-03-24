
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2 } from 'lucide-react';
import { TimeRange, timeSlots } from '@/utils/schedule/types';

interface TimeRangeSelectorProps {
  range: TimeRange;
  index: number;
  onUpdate: (index: number, field: 'start' | 'end', value: string) => void;
  onRemove: (index: number) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ 
  range, 
  index, 
  onUpdate, 
  onRemove 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Select 
        value={range.start}
        onValueChange={(value) => onUpdate(index, 'start', value)}
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
        onValueChange={(value) => onUpdate(index, 'end', value)}
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
        onClick={() => onRemove(index)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TimeRangeSelector;
