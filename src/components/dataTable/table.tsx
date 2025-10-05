import * as React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { cn } from "../../utils/cn";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn(
      "bg-background relative w-full caption-bottom text-sm",
      className
    )}
    {...props}
  />
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("bg-background [&_tr]:border-b", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("bg-background border-t", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "even:bg-muted/40 hover:bg-muted data-[state=selected]:bg-muted h-10 border-b transition-colors",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "text-muted-foreground h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 px-4 align-middle [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn("mt-4 text-sm", className)} {...props} />
));
TableCaption.displayName = "TableCaption";

/** (Opcional) Header antigo para compat, pode remover se não usa mais */
interface LegacySortableColumnHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  sortField: string;
  sortQuery: string;
  onSort: () => void;
}
const SortableColumnHeader = ({
  label,
  sortField,
  sortQuery,
  onSort,
  className,
  ...props
}: LegacySortableColumnHeaderProps) => {
  return (
    <div
      className={cn(
        "hover:text-foreground flex h-5/6 w-auto items-center justify-between gap-2 rounded hover:cursor-pointer",
        sortQuery.includes(sortField) && "text-foreground",
        className
      )}
      onClick={onSort}
      {...props}
    >
      {label}
      <CaretSortIcon fill="currentColor" />
    </div>
  );
};

export {
  SortableColumnHeader, // remova se já migrou tudo para SortableHeader
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
