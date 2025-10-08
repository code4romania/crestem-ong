import { Button } from "@/components/ui/button";
import { getRouteApi } from "@tanstack/react-router";
import { Plus } from "lucide-react";
const route = getRouteApi("/(app)/mentors/");

export function MentorsPrimaryButtons() {
  const navigate = route.useNavigate();
  return (
    <div className="flex gap-2">
      <Button
        className="space-x-1"
        onClick={() => navigate({ to: "/create/mentor" })}
      >
        <span>Adaugă persoană resursă</span> <Plus size={18} />
      </Button>
    </div>
  );
}
