import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export interface FormattedCell {
  value: string | number | boolean | null | undefined | Date;
  fontSize?: number;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}

export type CellData =
  | string
  | number
  | boolean
  | null
  | undefined
  | FormattedCell
  | Date;

export interface Sheet {
  name: string;
  data: CellData[][];
}

function makeSafeSheetName(name: string) {
  // Disallowed characters in Excel sheet names
  const forbidden = /[:\\\/?*\[\]]/g;

  // Replace forbidden characters with an underscore
  let safe = name.replace(forbidden, "_");

  // Trim whitespace
  safe = safe.trim();

  // Remove starting or ending apostrophes
  safe = safe.replace(/^'+|'+$/g, "");

  // Excel sheet names must not be empty
  if (safe.length === 0) {
    safe = "Sheet";
  }

  // Limit to 31 characters
  if (safe.length > 31) {
    safe = safe.slice(0, 31);
  }

  return safe;
}

function makeUniqueSheetName(baseName: string, existingNames: string[]) {
  let safe = makeSafeSheetName(baseName);
  let candidate = safe;
  let counter = 1;

  while (existingNames.includes(candidate)) {
    const suffix = ` (${counter})`;
    const maxBaseLength = 31 - suffix.length;
    candidate = safe.slice(0, maxBaseLength) + suffix;
    counter++;
  }

  return candidate;
}
export const downloadDataToXLSX = async (
  fileName: string,
  getSheets: () => Sheet[]
) => {
  const workbook = new ExcelJS.Workbook();
  const sheets = getSheets();
  const usedNames: string[] = [];

  sheets.forEach((sheet) => {
    const uniqueName = makeUniqueSheetName(sheet.name, usedNames);
    usedNames.push(uniqueName);
    const ws = workbook.addWorksheet(uniqueName);

    sheet.data.forEach((rowData) => {
      const row = ws.addRow([]);

      rowData.forEach((cellData, i) => {
        const cell = row.getCell(i + 1);

        if (
          typeof cellData === "object" &&
          cellData !== null &&
          "value" in cellData
        ) {
          const {
            value,
            fontSize,
            color,
            bold,
            italic,
            underline,
            strikethrough,
          } = cellData as FormattedCell;

          cell.value = value ?? "";

          cell.font = {
            name: "Calibri",
            size: fontSize ?? 12,
            color: color ? { argb: color.replace("#", "") } : undefined,
            bold: bold ?? false,
            italic: italic ?? false,
            underline: underline ?? false,
            strike: strikethrough ?? false,
          };
        } else {
          // Plain value
          cell.value = cellData ?? "";
        }
      });
    });
  });

  const buffer = await workbook.xlsx.writeBuffer(); // creates ArrayBuffer
  saveAs(
    new Blob([buffer]),
    fileName.toLowerCase().endsWith(".xlsx") ? fileName : `${fileName}.xlsx`
  );
};
