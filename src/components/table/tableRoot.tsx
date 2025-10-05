import { cn } from "../../utils/cn";

export interface IDivProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const TableRoot = ({ children, className, ...props }: IDivProps) => {
  return (
    <div
      className={cn("w-full h-auto  flex flex-col overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
};
