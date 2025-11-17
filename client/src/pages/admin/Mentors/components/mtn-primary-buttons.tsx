import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateMentorshipRequestMutation } from "@/services/mentors.mutations";
import {
  useListMentorshipRelations,
  useSuspenseListMentors,
} from "@/services/mentors.queries";
import { useSuspenseListNgos } from "@/services/ngos.queries";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function MtnPrimaryButtons() {
  const [open, setOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState("");
  const [selectedOng, setSelectedOng] = useState("");

  const { data: mentors } = useSuspenseListMentors();
  const { data: ongs } = useSuspenseListNgos();
  const { data: mentorToMentees } = useListMentorshipRelations(
    (mentorshipRelationsiphs) =>
      mentorshipRelationsiphs?.reduce((acc, curr) => {
        acc[curr.mentor.id.toString()] = [
          ...(acc[curr.mentor.id.toString()] || []),
          curr.user?.id,
        ];
        return acc;
      }, {} as Record<string, number[]>) || {}
  );

  const { mutate: createMentorshipRelation } =
    useCreateMentorshipRequestMutation();

  const handleAssociate = () => {
    if (selectedMentor && selectedOng) {
      createMentorshipRelation(
        {
          user: Number(selectedOng),
          mentor: Number(selectedMentor),
        },
        {
          onSuccess: () => {
            toast.success("Relația de mentorat a fost creată.");
          },
          onError: () => {
            toast.error("Relația de mentorat nu a fost creată.");
          },
        }
      );
      setOpen(false);
      setSelectedMentor("");
      setSelectedOng("");
    }
  };
  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setSelectedMentor("");
      setSelectedOng("");
    }
  };

  return (
    <div className="flex gap-2">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button className="space-x-1">
            <span>Asociază mentor și ONG</span> <Plus size={18} />
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Asociază mentor și ONG</DialogTitle>
            <DialogDescription>
              Selectează un mentor și un ONG pentru a crea o asociere.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="mentor">Mentor</Label>
              <Select
                value={selectedMentor}
                onValueChange={(value) => {
                  setSelectedMentor(value);
                  setSelectedOng(""); // Reset ONG when mentor changes
                }}
              >
                <SelectTrigger id="mentor" className="w-full">
                  <SelectValue placeholder="Selectează mentor" />
                </SelectTrigger>
                <SelectContent>
                  {mentors.map((mentor) => (
                    <SelectItem key={mentor.id} value={mentor.id.toString()}>
                      {mentor.firstName} {mentor.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ong">ONG</Label>
              <Select
                value={selectedOng}
                onValueChange={setSelectedOng}
                disabled={!selectedMentor}
              >
                <SelectTrigger id="ong" className="w-full">
                  <SelectValue placeholder="Selectează ONG" />
                </SelectTrigger>
                <SelectContent>
                  {ongs.map((ong) => (
                    <SelectItem
                      key={ong.id}
                      value={ong.id.toString()}
                      disabled={mentorToMentees?.[selectedMentor]?.includes(
                        ong.id
                      )}
                    >
                      {ong.ongName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Anulează
            </Button>
            <Button
              type="submit"
              onClick={handleAssociate}
              disabled={!selectedMentor || !selectedOng}
            >
              Asociază
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
