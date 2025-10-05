import type { ReactNode } from "react";
import { Typography } from "../typography";

interface IHeaderProps {
  title?: string;
  subtitle?: string;
  totalElements?: number;
  titleButtonHeader?: string;
  children?: ReactNode;
}

export const TableHeader = ({
  title,
  subtitle,
  totalElements,
  children,
}: IHeaderProps) => {
  return (
    <div className="w-full flex flex-wrap gap-4 justify-between p-6 border-b ">
      <div className="flex flex-col gap-1 ">
        <div className="flex gap-4 items-center">
          <Typography display="h4" weight="medium">
            {title}
          </Typography>

          <Typography
            className="w-auto bg-green-100 py-1 px-2 text-green-600 text-sm font-bold rounded-3xl"
            display="prSmall"
          >
            {totalElements ? totalElements : 0}
          </Typography>
        </div>
        <Typography display="prSmall">{subtitle}</Typography>
      </div>
      {children}
    </div>
  );
};
