import { Button } from "@/components/ui/button";
import { downloadJSONToXLSX } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";

export interface Sheet {
  name: string;
  rows: any[];
  cols?: any[];
}

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
        onClick={() => downloadJSONToXLSX(fileName, getSheets)}
        variant={buttonVariant}
      >
        {icon}
        {label}
      </Button>
    </div>
  );
};

export default ExportXLSX;
