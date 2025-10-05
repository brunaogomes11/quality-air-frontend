import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "../dataTable/table";
import Skeleton from "../skeleton";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function TableSkeleton<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const numLinhas = 10;

  return (
    <TableBody className="h-auto">
      {[...Array(numLinhas)].map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {table.getHeaderGroups().map((headerGroup) =>
            headerGroup.headers.map((column) => (
              <TableCell key={`${column.id}-${rowIndex}`}>
                <Skeleton className="w-full h-1" />
              </TableCell>
            ))
          )}
        </TableRow>
      ))}
    </TableBody>
  );
}
