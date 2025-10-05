import { FileIcon } from "@radix-ui/react-icons";
import { Card } from "./card";

interface FileCardProps {
  fileName: string;
  fileSize: number;
  button?: React.ReactNode;
  fileIcon?: React.ReactNode;
}

const FileCard = ({ fileName, fileSize, button, fileIcon }: FileCardProps) => {
  return (
    <Card className="flex h-12 items-center justify-start rounded-md border shadow-none">
      <div className="flex h-full w-[15%] items-center justify-center rounded-l-md border-r bg-accent py-2">
        {fileIcon ?? <FileIcon className="h-6 w-6 text-foreground" />}
      </div>
      <div className="flex grow items-center justify-between">
        <div className="flex w-[80%] flex-col gap-1 px-2">
          <p className="truncate text-muted-foreground text-sm">{fileName}</p>
          <p className="truncate text-muted-foreground text-sm">
            {(fileSize / 1024).toFixed(2)} KB
          </p>
        </div>
        {button && button}
      </div>
    </Card>
  );
};

export default FileCard;
