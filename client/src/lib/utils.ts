import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { utils, writeFile, type Sheet } from "xlsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates page numbers for pagination with ellipsis
 * @param currentPage - Current page number (1-based)
 * @param totalPages - Total number of pages
 * @returns Array of page numbers and ellipsis strings
 *
 * Examples:
 * - Small dataset (≤5 pages): [1, 2, 3, 4, 5]
 * - Near beginning: [1, 2, 3, 4, '...', 10]
 * - In middle: [1, '...', 4, 5, 6, '...', 10]
 * - Near end: [1, '...', 7, 8, 9, 10]
 */
export function getPageNumbers(currentPage: number, totalPages: number) {
  const maxVisiblePages = 5; // Maximum number of page buttons to show
  const rangeWithDots = [];

  if (totalPages <= maxVisiblePages) {
    // If total pages is 5 or less, show all pages
    for (let i = 1; i <= totalPages; i++) {
      rangeWithDots.push(i);
    }
  } else {
    // Always show first page
    rangeWithDots.push(1);

    if (currentPage <= 3) {
      // Near the beginning: [1] [2] [3] [4] ... [10]
      for (let i = 2; i <= 4; i++) {
        rangeWithDots.push(i);
      }
      rangeWithDots.push("...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      // Near the end: [1] ... [7] [8] [9] [10]
      rangeWithDots.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) {
        rangeWithDots.push(i);
      }
    } else {
      // In the middle: [1] ... [4] [5] [6] ... [10]
      rangeWithDots.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        rangeWithDots.push(i);
      }
      rangeWithDots.push("...", totalPages);
    }
  }

  return rangeWithDots;
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

export const downloadJSONToXLSX = (
  fileName: string,
  getSheets: () => Sheet[]
) => {
  const workbook = utils.book_new();
  const sheets = getSheets();

  const usedNames: string[] = [];

  sheets.forEach((sheet) => {
    const ws = utils.json_to_sheet(sheet.rows);

    if (sheet.cols) {
      ws["!cols"] = sheet.cols;
    }

    const uniqueName = makeUniqueSheetName(sheet.name, usedNames);
    usedNames.push(uniqueName);

    utils.book_append_sheet(workbook, ws, uniqueName);
  });

  writeFile(workbook, fileName, { compression: true });
};

export const downloadDataToXLSX = (
  fileName: string,
  getSheets: () => Sheet[]
) => {
  const workbook = utils.book_new();
  const sheets = getSheets();

  sheets.forEach((sheet) => {
    const ws = utils.aoa_to_sheet(sheet.rows);

    if (sheet.cols) {
      ws["!cols"] = sheet.cols;
    }

    utils.book_append_sheet(workbook, ws, sheet.name);
  });

  writeFile(workbook, fileName, { compression: true });
};
