import { forwardRef, type TextareaHTMLAttributes, type ReactNode } from "react";
import { FieldWrapper, type FieldWrapperProps } from "./fieldWrapper";
import { cn } from "../../utils/cn";

export type TextAreaProps = Omit<FieldWrapperProps, "className" | "children"> &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
  };

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
        label={label}
        error={error}
        descriptionBottom={descriptionBottom}
        descriptonTop={descriptonTop}
        className={className}
      >
        <div className="relative">
          {iconLeft && (
            <span className="text-muted-foreground absolute top-2 left-3">
              {iconLeft}
            </span>
          )}
          <textarea
            className={cn(
              "border-input ring-offset-background rounded-default flex w-full border bg-transparent px-3 py-2 text-sm transition-colors",
              "placeholder:text-muted-foreground",
              "focus-visible:ring-ring focus-visible:border-primary-darker focus-visible:ring-offset-2 focus-visible:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50",
              iconLeft && "pl-11",
              iconRight && "pr-11",
              error && "border-destructive"
            )}
            ref={ref}
            id={id}
            {...props}
          />
          {iconRight && (
            <span className="text-muted-foreground absolute top-2 right-3">
              {iconRight}
            </span>
          )}
        </div>
      </FieldWrapper>
    );
  }
);
