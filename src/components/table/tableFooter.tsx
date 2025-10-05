import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginacaoApi } from "../../types/system/pagination";
import { Button } from "../button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Typography } from "../typography";

export type TablePaginationProps = {
  pagination: PaginacaoApi;
  onPageChange: (page: number) => void;
  onSizeChange: (size: number) => void;
};

const getPageNumbers = (totalPage: number, page: number): number[] => {
  const pageNumbers: number[] = [];
  const MAX_PAGES = 5; // Maximum number of pages to be displayed

  if (totalPage <= MAX_PAGES) {
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  const middle = Math.floor(MAX_PAGES / 2);
  // const startPage = Math.max(1, page - middle);
  // const endPage = Math.min(totalPage, startPage + MAX_PAGES - 1);

  if (page <= middle) {
    for (let i = 1; i <= MAX_PAGES; i++) {
      pageNumbers.push(i);
    }
  } else if (page > totalPage - middle) {
    for (let i = totalPage - MAX_PAGES + 1; i <= totalPage; i++) {
      pageNumbers.push(i);
    }
  } else {
    for (let i = page - middle; i <= page + middle; i++) {
      pageNumbers.push(i);
    }
  }

  return pageNumbers;
};

const TableFooter = ({
  pagination,
  onPageChange,
  onSizeChange,
}: TablePaginationProps) => {
  // const { page = ...props, size, totalPages, onPageChange, onSizeChange } = props;

  return (
    <div className="w-full mt-auto bg-background flex items-center justify-center sm:justify-between  gap-5 p-3 flex-wrap border-t ">
      {/* <Typography display="prSmall" className="hidden sm:block">
				Página {pagination.page ? pagination.page + 1 : 1} de {pagination.totalPages}
			</Typography> */}

      <div className="flex items-center gap-1 lg:ml-auto">
        <Button
          className="h-8"
          variant="outline"
          onClick={() =>
            onPageChange(pagination.page > 0 ? pagination.page - 1 : 0)
          }
          disabled={(pagination.page ?? 0) <= 0}
        >
          <ChevronLeft className="h-4 w-4 md:hidden" />
          <span></span>
          <Typography
            display="prSmall"
            className="text-text font-medium hidden md:block"
          >
            Previous
          </Typography>
        </Button>
        <ul className="w-auto h-auto flex gap-[1px]">
          {pagination.page >= 5 && pagination.totalPages > 10 && (
            <Button
              onClick={() => onPageChange(0)}
              variant="ghost"
              className="w-8 h-8 sm:w-8 sm:h-8"
            >
              ...
            </Button>
          )}
          {getPageNumbers(pagination.totalPages, pagination.page).map(
            (pageIndex, index) => (
              <Button
                key={index}
                onClick={() => onPageChange(pageIndex - 1)}
                variant={pagination.page == pageIndex - 1 ? "outline" : "ghost"}
                className="w-8 h-8 sm:w-8 sm:h-8"
              >
                {pageIndex}
              </Button>
            )
          )}
          {pagination.page + 5 <= pagination.totalPages &&
            pagination.totalPages > 10 && (
              <Button
                onClick={() => onPageChange(pagination.totalPages - 1)}
                className="w-8 h-8 sm:w-8 sm:h-8"
                variant="ghost"
              >
                ...
              </Button>
            )}
        </ul>
        <Button
          variant="outline"
          className="h-8"
          onClick={() =>
            onPageChange(
              pagination.page < pagination.totalPages - 1
                ? pagination.page + 1
                : pagination.totalPages - 1
            )
          }
          disabled={pagination.page >= pagination.totalPages - 1}
        >
          <ChevronRight className="h-4 w-4 md:hidden " />
          <Typography
            display="prSmall"
            className="text-text font-medium hidden md:block"
          >
            Next
          </Typography>
        </Button>
        <Select
          value={`${pagination.size}`}
          onValueChange={(value: any) => onSizeChange(Number(value))}
        >
          <SelectTrigger className=" w-[80px] h-8">
            <SelectValue placeholder={`${pagination.size}`} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 25, 50, 100, 1000].map((pageSize) => (
              <SelectItem
                key={pageSize}
                value={`${pageSize}`}
                className="hover:cursor-pointer"
              >
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TableFooter;
