import type { ColumnDefBase } from "@tanstack/react-table";
import { useState } from "react";

type ColumnDefWithAccessor<T> = ColumnDefBase<T, unknown> & { id: string };

export function useColumnsVisible<T>(
  columns: ColumnDefBase<T, unknown>[]
): [Record<string, boolean>, (columnId: string) => void] {
  const initialColumnsVisibleState: Record<string, boolean> = {};
  columns.forEach((column) => {
    const accessorKey = (column as ColumnDefWithAccessor<T>).id;
    if (accessorKey) {
      initialColumnsVisibleState[accessorKey] = true;
    }
  });

  const [columnsVisible, setColumnsVisible] = useState<Record<string, boolean>>(
    initialColumnsVisibleState
  );

  const onColumnToggle = (columnId: string) => {
    setColumnsVisible((prevColumnsVisible) => ({
      ...prevColumnsVisible,
      [columnId]: !prevColumnsVisible[columnId],
    }));
  };

  return [columnsVisible, onColumnToggle];
}
