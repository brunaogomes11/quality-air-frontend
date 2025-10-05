import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropDown";
import { cn } from "../../utils/cn";
import type { Row } from "@tanstack/react-table";

export interface ColumnAction {
  label: string;
  onClick: (...args: any) => void;
  icon?: React.ReactNode;
  conditionalRenderingFunctions?: ((...args: any) => boolean)[];
}

interface ColumnActionDropdownProps {
  columnActions?: ColumnAction[];
  row: Row<any>;
  subtle?: boolean;
}

const TableActionsDropdown = ({
  columnActions,
  row,
  subtle,
}: ColumnActionDropdownProps) => {
  const filteredActions = columnActions?.filter((action) => {
    if (!action.conditionalRenderingFunctions) return true;
    return action.conditionalRenderingFunctions.every((fn) => fn(row.original));
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-muted-foreground/10 flex h-7 w-7 items-center justify-center rounded-full">
        <DotsVerticalIcon
          className={cn(
            "inline-block h-4 w-4",
            subtle && "text-muted-foreground/50 hover:text-foreground"
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {filteredActions?.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onSelect={(e) => {
              e.preventDefault();
              action.onClick(row);
            }}
          >
            <div className="flex w-full items-center gap-2 hover:cursor-pointer">
              {action.icon}
              {action.label}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableActionsDropdown;
