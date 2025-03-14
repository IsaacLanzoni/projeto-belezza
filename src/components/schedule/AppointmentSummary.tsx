
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AppointmentSummaryProps {
  service: any;
  professional: any;
  date: Date;
  selectedTimeSlot: string;
}

const AppointmentSummary: React.FC<AppointmentSummaryProps> = ({
  service,
  professional,
  date,
  selectedTimeSlot
}) => {
  return (
    <div className="border rounded-lg p-4 bg-muted/30">
      <h3 className="font-medium mb-3">Resumo do Agendamento</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Serviço:</span>
          <span className="font-medium">{service.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Profissional:</span>
          <span className="font-medium">{professional.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Data:</span>
          <span className="font-medium">
            {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Horário:</span>
          <span className="font-medium">{selectedTimeSlot}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Duração:</span>
          <span className="font-medium">{service.duration} minutos</span>
        </div>
        <div className="flex justify-between border-t pt-2 mt-2">
          <span className="font-medium">Valor Total:</span>
          <span className="font-medium text-primary">R$ {service.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSummary;
