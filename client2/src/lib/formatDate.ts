export default function (date: string | Date | undefined): string {
  if (!date) {
    return "-";
  }
  if (date instanceof Date) {
    return date.toLocaleDateString("ro-RO", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return new Date(date).toLocaleDateString("ro-RO", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
