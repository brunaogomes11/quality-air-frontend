import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Button } from "../button";
import type { Column } from "@tanstack/react-table";

interface ColumnViewOptionsProps<TData> {
  columns: Column<TData, unknown>[];
}

const ColumnViewOptions = <TData,>({
  columns,
}: ColumnViewOptionsProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          Colunas
          <CaretDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {columns
          .filter((column) => column.getCanHide())
          .map((column) => {
            const headerDef = column.columnDef.header;
            const label =
              typeof headerDef === "string" ? headerDef : column.id;

            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {label}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnViewOptions;
