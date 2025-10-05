import * as React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { cn } from "../../utils/cn";

type SortDir = "asc" | "desc" | null;

interface SortableHeaderProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode;
  field: string;
  activeField?: string | null;
  direction?: SortDir;
  onSortChange: (field: string, next: Exclude<SortDir, null>) => void;
  allowCycleClear?: boolean;
  align?: "start" | "center" | "end";
}

export function SortableHeader({
  label,
  field,
  activeField,
  direction,
  onSortChange,
  allowCycleClear = false,
  align,
  className,
  ...props
}: SortableHeaderProps) {
  const isActive = activeField === field;

  const nextDir = (): SortDir => {
    if (!isActive) return "asc";
    if (direction === "asc") return "desc";
    if (direction === "desc") return allowCycleClear ? null : "asc";
    return "asc";
  };

  const handleClick = () => {
    const nd = nextDir();
    if (nd) onSortChange(field, nd);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "hover:text-foreground flex h-5/6 items-center gap-2 rounded px-2",
        "hover:cursor-pointer hover:bg-muted-foreground/10",
        isActive && "bg-muted-foreground/10 text-foreground",
        align === "start" ? "ml-3" : align === "end" ? "mr-3" : "",
        className
      )}
      aria-sort={
        isActive ? (direction === "asc" ? "ascending" : "descending") : "none"
      }
      {...props}
    >
      {label}
      <CaretSortIcon
        className={cn(
          "transition-transform",
          isActive && direction === "desc" && "rotate-180"
        )}
      />
    </button>
  );
}
