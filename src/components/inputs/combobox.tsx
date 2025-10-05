import { forwardRef, useMemo, useState, type ReactNode, type Ref } from "react";

import { ChevronDown, ChevronUp, X } from "lucide-react";
import { FieldWrapper, type FieldWrapperProps } from "./fieldWrapper";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Button } from "../button";
import { cn } from "../../utils/cn";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../command";
import { ScrollArea } from "../scrollArea";

type ComboboxProps<T> = Omit<FieldWrapperProps, "className" | "children"> & {
  options: T[];
  value?: T;
  onChange?: (value: T) => void;
  onClear?: () => void;
  onInputChange?: (input: string) => void;
  getOptionKey: (option: T) => string;
  getOptionLabel?: (option: T) => string;
  renderOption?: (option: T) => ReactNode;
  renderValue?: (value: T) => ReactNode;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

const InnerCombobox = <T,>(
  {
    label,

    error,
    options,
    value,
    onChange,
    onClear,
    onInputChange,
    getOptionKey,
    getOptionLabel,
    renderOption,
    renderValue,
    placeholder = "Selecione uma opção",
    disabled,
    loading,
    className,
  }: ComboboxProps<T>,
  ref: Ref<HTMLButtonElement>
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputFilter, setInputFilter] = useState("");

  const filteredOptions = useMemo(() => {
    if (!inputFilter) return options;
    if (!getOptionLabel) return options;
    return options.filter((option) =>
      getOptionLabel(option).toLowerCase().includes(inputFilter.toLowerCase())
    );
  }, [inputFilter, options, getOptionLabel]);

  const selectedDisplay = useMemo(() => {
    if (!value) return placeholder;
    if (renderValue) return renderValue(value);
    if (getOptionLabel) return getOptionLabel(value);
  }, [value, renderValue, getOptionLabel, placeholder]);

  const handleSelect = (option: T) => {
    onChange?.(option);
    setIsOpen(false);
  };

  // to-do: ajustar tipagem
  const handleClear = (e: any) => {
    e.stopPropagation();
    onClear?.();
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen && !disabled} onOpenChange={setIsOpen} modal>
      <FieldWrapper className={className} label={label} error={error}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            role="combobox"
            aria-expanded={isOpen}
            type="button"
            className={cn(
              "bg-background hover:bg-muted flex w-full items-center border px-3 hover:cursor-default",
              error ? "border-destructive" : "border-input"
            )}
            disabled={disabled}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <div
              className={cn(
                "w-full truncate text-left text-sm",
                value ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {selectedDisplay}
            </div>

            {onClear && value && (
              <div
                className="hover:bg-foreground/10 ml-1 flex h-6 w-6 items-center justify-center rounded-full p-2 hover:cursor-pointer"
                onClick={handleClear}
              >
                <X strokeWidth="1.5" className="h-4 w-4 shrink-0 opacity-50" />
              </div>
            )}

            <div className="hover:bg-foreground/10 ml-2 flex h-6 w-6 items-center justify-center rounded-full p-2 hover:cursor-pointer">
              {isOpen ? (
                <ChevronUp
                  strokeWidth="1.5"
                  className="h-4 w-4 shrink-0 opacity-50"
                />
              ) : (
                <ChevronDown
                  strokeWidth="1.5"
                  className="h-4 w-4 shrink-0 opacity-50"
                />
              )}
            </div>
          </Button>
        </PopoverTrigger>
      </FieldWrapper>

      <PopoverContent align="start" className="w-fit p-0">
        <Command>
          <CommandInput
            placeholder="Procurar..."
            className="h-9"
            onInput={(e) => {
              const input = (e.target as HTMLInputElement).value;
              setInputFilter(input);
              onInputChange?.(input);
            }}
          />

          {loading ? (
            <CommandEmpty>Carregando...</CommandEmpty>
          ) : (
            <ScrollArea className="max-h-64 overflow-y-auto">
              <CommandGroup>
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <CommandItem
                      key={getOptionKey(option)}
                      value={getOptionKey(option)}
                      onSelect={() => handleSelect(option)}
                    >
                      {renderOption
                        ? renderOption(option)
                        : getOptionLabel
                        ? getOptionLabel(option)
                        : ""}
                    </CommandItem>
                  ))
                ) : (
                  <div className="py-6 text-center text-sm">
                    Nenhuma opção encontrada.
                  </div>
                )}
              </CommandGroup>
            </ScrollArea>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export const Combobox = forwardRef(InnerCombobox) as <T>(
  props: ComboboxProps<T> & { ref?: Ref<HTMLButtonElement> }
) => ReactNode;
