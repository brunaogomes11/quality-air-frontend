import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { FieldWrapper, type FieldWrapperProps } from "./fieldWrapper";
import { cn } from "../../utils/cn";

export type CheckboxProps = Omit<FieldWrapperProps, "className" | "children"> &
  InputHTMLAttributes<HTMLInputElement> & {
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
  };

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      error,
      descriptionBottom,
      descriptonTop,
      iconLeft,
      iconRight,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <FieldWrapper
        htmlFor={id}
        error={error}
        descriptionBottom={descriptionBottom}
        descriptonTop={descriptonTop}
        className={className}
      >
        <div className="flex items-center gap-2">
          <input
            id={id}
            type="checkbox"
            ref={ref}
            className={cn(
              "h-4 w-4 rounded border border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive"
            )}
            {...props}
          />
          {label && (
            <label htmlFor={id} className="cursor-pointer select-none">
              {label}
            </label>
          )}
        </div>
      </FieldWrapper>
    );
  }
);
