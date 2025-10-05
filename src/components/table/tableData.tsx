import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  type ColumnDef,
  type ExpandedState,
  type Row,
} from "@tanstack/react-table";
import { TableSkeleton } from "./tableSkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../dataTable/table";
import { cn } from "../../utils/cn";

interface DataTableProps<TData, TValue> {
  className?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  url?: string;
  onRowClick?: (row: TData) => void;
  isPending: boolean;
  columnsVisible: any;
  state?: {
    expanded?: ExpandedState;
  };
  onRowBlur?: (row: TData) => void;
  onExpandedChange?: (expanded: ExpandedState) => void;
  getSubRows?: (row: TData) => TData[] | undefined | string | any;
  getRowCanExpand?: (row: Row<TData>) => boolean;
  getRowProps?: (
    row: TData
  ) => React.HTMLAttributes<HTMLTableRowElement> & Record<string, any>;
  addRow?: (parentId: number, depth: number, newItem: any) => void;
  removeRow?: (index: number, depth: number, id: number) => void;
  updateRow?: (updateFunction: any, dados: any) => void;
  updateData?: React.Dispatch<React.SetStateAction<any[]>>;
}

export function TableData<TData, TValue>({
  columns,
  data,
  onRowClick,
  onRowBlur,
  isPending,
  columnsVisible,
  state,
  onExpandedChange,
  getSubRows,
  getRowCanExpand,
  getRowProps,
  addRow,

  updateRow,
  className,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility: columnsVisible,
      expanded: state?.expanded,
    },
    //@ts-expect-error
    onExpandedChange: onExpandedChange,
    getSubRows: getSubRows,
    getRowCanExpand: getRowCanExpand,
    getExpandedRowModel: getExpandedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    meta: {
      addRow, // Para adicionar subitens
      updateRow, // Para editar linhas
    },
  });

  return (
    <div className={cn("w-full maxHTable overflow-auto", className)}>
      <Table className="w-full ">
        <TableHeader className="outline outline-border bg-card">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="truncate"
                  style={{
                    width:
                      header.getSize() !== 150 ? header.getSize() : undefined,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        {isPending ? (
          <TableSkeleton columns={columns} data={[]} />
        ) : (
          <TableBody className="h-full overflow-y-auto">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick && onRowClick(row.original)}
                  onBlur={() => onRowBlur && onRowBlur(row.original)}
                  {...getRowProps?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="truncate">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado obtido.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
    </div>
  );
}
