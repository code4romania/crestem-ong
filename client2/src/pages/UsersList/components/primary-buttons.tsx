import { Button } from "@/components/ui/button";
import { getRouteApi } from "@tanstack/react-router";
import { Plus, Download } from "lucide-react";
const route = getRouteApi("/(app)/users/");

export function NgosPrimaryButtons() {
  const navigate = route.useNavigate();
  return (
    <div className="flex gap-2">
      <Button
        className="space-x-1"
        variant="secondary"
        onClick={() => navigate({ to: "/create/program" })}
      >
        <span>Descarca tabel </span> <Download size={18} />
      </Button>
      <Button
        className="space-x-1"
        onClick={() => navigate({ to: "/create/user" })}
      >
        <span>Adaugă organizatie </span> <Plus size={18} />
      </Button>
    </div>
  );
}
