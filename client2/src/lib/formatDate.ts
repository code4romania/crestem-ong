import { format } from "date-fns";
import { ro } from "date-fns/locale";

export default function (date: string | Date | undefined): string {
  if (!date) {
    return "-";
  }

  return format(date, "PPP", { locale: ro });
}
