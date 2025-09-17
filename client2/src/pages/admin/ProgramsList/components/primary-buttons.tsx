import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function ProgramsPrimaryButtons() {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        className="space-x-1"
        onClick={() => console.log("export")}
      >
        <span>Export</span> <Download size={18} />
      </Button>
    </div>
  );
}
