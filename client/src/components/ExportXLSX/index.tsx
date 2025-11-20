import { Button } from "@/components/ui/button";
import { downloadDataToXLSX, type Sheet } from "@/lib/excel";
import { DownloadIcon } from "lucide-react";

interface ExportProps {
  label?: string;
  className?: string;
  fileName: string;
  getSheets: () => Sheet[];
  buttonVariant?:
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "secondary";
  icon?: React.ReactNode;
}

const ExportXLSX = ({
  label = "Exportă",
  className,
  fileName,
  getSheets,
  buttonVariant = "default",
  icon = <DownloadIcon className="w-4 h-4" />,
}: ExportProps) => {
  return (
    <div className={className}>
      <Button
        onClick={() => downloadDataToXLSX(fileName, getSheets)}
        variant={buttonVariant}
      >
        {icon}
        {label}
      </Button>
    </div>
  );
};

export default ExportXLSX;
