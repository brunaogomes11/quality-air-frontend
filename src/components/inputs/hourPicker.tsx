import React, { useState, useEffect, useCallback } from "react";
import { Root, Trigger, Content } from "@radix-ui/react-popover";
import { Clock } from "lucide-react";

interface HourPickerProps {
  id?: string;
  nome_tipo?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (time: string) => void;
  disabled?: boolean;
  className?: string;
  invalido?: boolean;
  closeOnSelect?: boolean;
}

/**
 * HourPicker - Input de seleção de horário (horas e minutos) com seletores separados.
 *
 * Props:
 * - id: string (opcional)
 * - nome_tipo: string (label do input)
 * - value: string (formato HH:MM, controlado externamente)
 * - defaultValue: string (valor inicial não controlado)
 * - onChange: (time) => void (retorna o horário selecionado no formato HH:MM)
 * - disabled: boolean
 * - className: string
 * - invalido: boolean
 * - closeOnSelect: boolean (fecha o seletor ao selecionar o horário / default false)
 */
export default function HourPicker({
  id,
  nome_tipo = "Escolha o horário",
  value,
  defaultValue,
  onChange,
  disabled = false,
  className,
  invalido = false,
  closeOnSelect = false,
}: HourPickerProps): React.JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>(
    () => value || defaultValue || ""
  );

  // Extrair hora e minuto do valor atual
  const [selectedHour, setSelectedHour] = useState<number>(() => {
    const time = value || defaultValue || "";
    return time ? parseInt(time.split(':')[0]) || 0 : 0;
  });

  const [selectedMinute, setSelectedMinute] = useState<number>(() => {
    const time = value || defaultValue || "";
    return time ? parseInt(time.split(':')[1]) || 0 : 0;
  });

  // Sincroniza quando valor controlado externo muda
  useEffect(() => {
    if (value !== undefined) {
      setSelectedTime(value);
      if (value) {
        const [hour, minute] = value.split(':').map((n: string) => parseInt(n) || 0);
        setSelectedHour(hour);
        setSelectedMinute(minute);
      }
    }
  }, [value]);

  const handleHourChange = useCallback((hour: number): void => {
    if (disabled) return;
    setSelectedHour(hour);
    updateTime(hour, selectedMinute);
  }, [disabled, selectedMinute]);

  const handleMinuteChange = useCallback((minute: number): void => {
    if (disabled) return;
    setSelectedMinute(minute);
    updateTime(selectedHour, minute);
  }, [disabled, selectedHour]);

  const updateTime = useCallback((hour: number, minute: number): void => {
    const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    setSelectedTime(timeStr);
    if (onChange) onChange(timeStr);
    if (closeOnSelect) {
      setTimeout(() => setOpen(false), 80);
    }
  }, [onChange, closeOnSelect]);

  const displayValue = selectedTime || "";
  const inputId = id || "hour-input";

  // Gerar opções de hora (0-23)
  const hourOptions: number[] = Array.from({ length: 24 }, (_, i) => i);

  // Gerar opções de minuto (0-59)
  const minuteOptions: number[] = Array.from({ length: 60 }, (_, i) => i);

  // Scroll automático para o item selecionado quando abre o popover
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        // Scroll para a hora selecionada
        const hourElement = document.querySelector(`[data-hour="${selectedHour}"]`);
        if (hourElement) {
          hourElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }

        // Scroll para o minuto selecionado
        const minuteElement = document.querySelector(`[data-minute="${selectedMinute}"]`);
        if (minuteElement) {
          minuteElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      }, 100);
    }
  }, [open, selectedHour, selectedMinute]);

  return (
    <div className={"relative w-full" + (className ? className : "")}>
      <Root open={open} onOpenChange={(o) => !disabled && setOpen(o)}>
        <Trigger asChild>
          <button
            type="button"
            id={inputId}
            disabled={disabled}
            className={`flex flex-row justify-between w-full p-2 text-left text-base border rounded outline-none transition-all relative ${
              invalido
                ? "border-red-600 focus:border-red-600"
                : open
                ? "border-border-activated"
                : "border-gray-300"
            } ${
              disabled
                ? "border-gray-300 cursor-not-allowed bg-gray-50 text-gray-500"
                : "cursor-pointer"
            }`}
          >
            <span
              className={`${
                displayValue ? "text-[#2B2B2B]" : "text-[#A3A3C2]"
              } truncate`}
            >
              {displayValue || nome_tipo}
            </span>
            <span className="pointer-events-none">
              <Clock size={20} />
            </span>
          </button>
        </Trigger>
        <Content
          side="bottom"
          align="start"
          className="z-50 bg-[#FBFBFB] border border-gray-200 rounded-[10px] shadow-md animate-in fade-in duration-100"
        >
          <div className="rounded-[10px] inline-flex flex-col justify-start items-center">
            {/* Seletores de Hora e Minuto */}
            <div className="self-stretch p-4">
              <div className="flex gap-4 items-center justify-center">
                {/* Seletor de Hora */}
                <div className="flex flex-col items-center">
                  <label className="text-xs font-medium text-gray-600 mb-2">Hora</label>
                  <div className="h-[120px] w-[60px] overflow-y-auto border border-gray-200 rounded-md">
                    <div className="flex flex-col">
                      {hourOptions.map((hour) => (
                        <button
                          key={hour}
                          type="button"
                          data-hour={hour}
                          onClick={() => handleHourChange(hour)}
                          className={`px-2 py-1.5 text-sm font-medium transition-colors hover:bg-gray-100 ${
                            selectedHour === hour
                              ? "bg-[#6658D6] text-white"
                              : "text-gray-700"
                          }`}
                        >
                          {hour.toString().padStart(2, '0')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Separador */}
                <div className="text-2xl font-bold text-gray-400 mt-6">:</div>

                {/* Seletor de Minuto */}
                <div className="flex flex-col items-center">
                  <label className="text-xs font-medium text-gray-600 mb-2">Minuto</label>
                  <div className="h-[120px] w-[60px] overflow-y-auto border border-gray-200 rounded-md">
                    <div className="flex flex-col">
                      {minuteOptions.map((minute) => (
                        <button
                          key={minute}
                          type="button"
                          data-minute={minute}
                          onClick={() => handleMinuteChange(minute)}
                          className={`px-2 py-1.5 text-sm font-medium transition-colors hover:bg-gray-100 ${
                            selectedMinute === minute
                              ? "bg-[#6658D6] text-white"
                              : "text-gray-700"
                          }`}
                        >
                          {minute.toString().padStart(2, '0')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Display do horário selecionado */}
              <div className="mt-4 text-center">
                <div className="text-lg font-bold text-[#221F4D]">
                  {selectedHour.toString().padStart(2, '0')}:{selectedMinute.toString().padStart(2, '0')}
                </div>
              </div>
            </div>
            {/* Botão para fechar */}
            <div className="self-stretch px-4 pb-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full px-3 py-2 bg-[#6658D6] hover:bg-[#5a4bc4] text-white rounded text-sm font-medium transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </Content>
      </Root>
    </div>
  );
}