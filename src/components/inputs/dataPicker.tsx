import { useState, useRef, forwardRef, useEffect } from "react";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Calendar } from "iconoir-react";
import { useClickOutside } from "../../hooks/useClickOutside";
import {
  maskAndValidateDate,
  validateAndCorrectDate,
} from "../../utils/validations";
import { Input, type InputProps } from "./input";
import { cn } from "../../utils/cn";

type DatePickerProps = Omit<InputProps, "onChange"> & {
  value?: string;
  onChange: (value: string) => void;
};

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ value, onChange, placeholder = "dd/mm/aaaa", ...props }, ref) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState(
      value ? format(parse(value, "yyyy-MM-dd", new Date()), "dd/MM/yyyy") : ""
    );
    const [navMonth, setNavMonth] = useState<Date | undefined>(undefined);

    const datePickerRef = useRef<HTMLDivElement>(null);

    useClickOutside(datePickerRef, () => setOpen(false));

    const parsedDate = value
      ? parse(value, "yyyy-MM-dd", new Date())
      : undefined;

    const defaultClassNames = getDefaultClassNames();

    const handleSelect = (date?: Date) => {
      if (!date) return;
      const formatted = format(date, "yyyy-MM-dd");
      onChange(formatted);
      setInputValue(format(date, "dd/MM/yyyy"));
      setOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const maskedValue = maskAndValidateDate(rawValue);
      const { masked, formatted, navDate } =
        validateAndCorrectDate(maskedValue);
      setInputValue(maskedValue);

      if (formatted) {
        onChange(formatted);
        setNavMonth(navDate);
      } else if (masked.trim() === "") {
        onChange("");
        setNavMonth(undefined);
      }
    };

    useEffect(() => {
      if (!value) return;
      setInputValue(
        format(parse(value, "yyyy-MM-dd", new Date()), "dd/MM/yyyy")
      );
      setNavMonth(parse(value, "yyyy-MM-dd", new Date()));
    }, [value]);

    return (
      <div ref={datePickerRef} className="relative">
        <Input
          ref={ref}
          value={inputValue}
          onChange={handleInputChange}
          onClick={() => setOpen(true)}
          placeholder={placeholder}
          iconRight={<Calendar />}
          {...props}
        />

        {open && (
          <div
            className={cn(
              "bg-background border-border rounded-default absolute mt-0.5 w-fit border shadow"
            )}
          >
            <DayPicker
              mode="single"
              selected={parsedDate}
              onSelect={handleSelect}
              locale={ptBR}
              weekStartsOn={0}
              captionLayout="dropdown"
              startMonth={new Date(2000, 0)}
              endMonth={new Date(2050, 11)}
              navLayout="around"
              showOutsideDays
              fixedWeeks
              defaultMonth={parsedDate}
              month={navMonth}
              onMonthChange={(month) => setNavMonth(month)}
              classNames={{
                ...defaultClassNames,
                root: `${defaultClassNames.root} bg-white p-4 rounded-xl shadow-md text-gray-800`,
                months: "flex flex-col sm:flex-row gap-2",
                month: "flex flex-col gap-4",
                caption: "flex justify-center relative items-center w-full",
                caption_label: "font-bold flex items-center gap-1",
                button_previous:
                  "size-7 text-muted-foreground hover:text-primary absolute left-2",
                button_next:
                  "size-7 text-muted-foreground hover:text-primary absolute right-2",
                month_grid: "w-full border-collapse space-x-1",
                chevron: "fill-current hover:cursor-pointer",
                weekdays: "text-xs text-gray-500 uppercase font-normal px-2",
                weekday: "w-10 text-center",
                day: "rounded-md w-9 h-9 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer",
                today: "bg-gray-100 text-foreground",
                selected:
                  "font-bold bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                outside:
                  "text-muted-foreground aria-selected:text-muted-foreground",
                disabled: "text-muted-foreground opacity-50",
                hidden: "invisible",
              }}
            />
          </div>
        )}
      </div>
    );
  }
);
