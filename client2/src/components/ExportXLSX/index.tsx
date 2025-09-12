import Button from "@/components/Button";
import { utils, writeFile } from "xlsx";

export interface Sheet {
  name: string;
  rows: any[];
  cols?: any[];
}

interface ExportProps {
  label?: string;
  className?: string;
  fileName: string;
  sheets: Sheet[];
}

const downloadExport = (fileName: string, sheets: Sheet[]) => {
  const workbook = utils.book_new();


  sheets.forEach((sheet) => {
    const ws = utils.json_to_sheet(sheet.rows);

    if (sheet.cols) {
      ws['!cols'] = sheet.cols;
    }

    utils.book_append_sheet(workbook, ws, sheet.name);
  });

  writeFile(workbook, fileName, { compression: true });
}

const ExportXLSX = ({ label = 'Exportă', className, fileName, sheets }: ExportProps) => {
  return (
    <div className={className}>
      <Button onClick={() => downloadExport(fileName, sheets)}>{label}</Button>
    </div>
  );
}

export default ExportXLSX;
