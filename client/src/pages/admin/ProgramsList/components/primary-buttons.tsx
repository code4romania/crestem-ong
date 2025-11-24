import { Button } from "@/components/ui/button";
import { getRouteApi } from "@tanstack/react-router";
import { Plus } from "lucide-react";
const route = getRouteApi("/(app)/programs/");

export function ProgramsPrimaryButtons() {
  const navigate = route.useNavigate();
  return (
    <div className="flex gap-2">
      <Button
        className="space-x-1"
        onClick={() => navigate({ to: "/create/program" })}
      >
        <span>Adaugă program </span> <Plus size={18} />
      </Button>
    </div>
  );
}
