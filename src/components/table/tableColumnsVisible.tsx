import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../dropDown";
import { Button } from "../button";
import { cn } from "../../utils/cn";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  onColumnToggle: (columnId: string) => void;
  columnsVisible: Record<string, boolean>;
  className?: string;
}

export function ColumnsVisible<TData, TValue>({
  columns,
  onColumnToggle,
  columnsVisible,
  className,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={cn("w-full sm:w-auto", className)} variant="outline">
          Columns <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full sm:w-auto" align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={columnsVisible[column.id]}
                onCheckedChange={() => onColumnToggle(column.id)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
