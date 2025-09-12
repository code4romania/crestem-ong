export default function (date: string): string {
  return new Date(date).toLocaleDateString("ro-RO", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
