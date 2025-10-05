import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export type FieldWrapperProps = {
  label?: string;
  htmlFor?: string;
  descriptionBottom?: string;
  descriptonTop?: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

export const FieldWrapper = ({
  label,
  htmlFor,
  descriptionBottom,
  descriptonTop,
  error,
  className,
  children,
}: FieldWrapperProps) => {
  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <div className="flex w-full items-center justify-between">
          <label
            htmlFor={htmlFor}
            className="text-foreground text-sm font-medium"
          >
            {label}
          </label>
          {descriptonTop && (
            <p className="text-muted-foreground text-xs">{descriptonTop}</p>
          )}
        </div>
      )}
      {children}
      {descriptionBottom && !error && (
        <p className="text-muted-foreground text-sm">{descriptionBottom}</p>
      )}
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
};
