import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { FieldWrapper, type FieldWrapperProps } from "./fieldWrapper";
import { cn } from "../../utils/cn";

export type InputProps = Omit<FieldWrapperProps, "className" | "children"> &
  InputHTMLAttributes<HTMLInputElement> & {
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
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
        label={label}
        error={error}
        descriptionBottom={descriptionBottom}
        descriptonTop={descriptonTop}
        className={className}
      >
        <div className="relative">
          {iconLeft && (
            <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
              {iconLeft}
            </span>
          )}
          <input
            className={cn(
              "border-input ring-offset-background rounded-default flex h-10 w-full border bg-transparent px-3 py-2 text-sm transition-colors",
              "file:text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-muted-foreground",
              "focus-visible:ring-ring focus-visible:border-primary-darker focus-visible:ring-offset-2 focus-visible:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50",
              iconLeft && "pl-11",
              iconRight && "pr-11",
              error && "border-destructive"
            )}
            type={type}
            ref={ref}
            {...props}
          />
          {iconRight && (
            <span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2">
              {iconRight}
            </span>
          )}
        </div>
      </FieldWrapper>
    );
  }
);
