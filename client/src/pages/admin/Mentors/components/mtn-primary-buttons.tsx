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
import { useSuspenseListNgosWithDetails } from "@/services/ngos.queries";

import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export default function MtnPrimaryButtons() {
  const [open, setOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState("");
  const [selectedOng, setSelectedOng] = useState("");

  // ------ FETCH DATA ------
  const { data: mentors } = useSuspenseListMentors();
  const { data: ongs } = useSuspenseListNgosWithDetails();

  const { data: mentorToMentees } = useListMentorshipRelations(
    (relations) =>
      relations?.reduce((acc, curr) => {
        const mentorId = curr.mentor.id.toString();
        acc[mentorId] = [...(acc[mentorId] || []), curr.user?.id];
        return acc;
      }, {} as Record<string, number[]>) || {}
  );

  const filteredOngs = useMemo(() => {
    if (!selectedMentor) return ongs;

    const mentor = mentors.find((m) => m.id.toString() === selectedMentor);

    if (!mentor) return [];

    const mentorProgramIds = mentor.mentorPrograms?.map((p) => p.id) ?? [];

    return ongs.filter((ong) => {
      const ongProgramIds = ong.ngoPrograms?.map((p) => p.id) ?? [];

      return mentorProgramIds.some((id) => ongProgramIds.includes(id));
    });
  }, [selectedMentor, mentors, ongs]);

  const { mutate: createMentorshipRelation } =
    useCreateMentorshipRequestMutation();

  const handleAssociate = () => {
    if (!selectedMentor || !selectedOng) return;

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
              Selectează un mentor și un ONG pentru a crea o asociere. Doar
              mentorii și ONG-urile care fac parte din aceleași programe pot fi
              asociați între ei
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Mentor dropdown */}
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

            {/* ONG dropdown */}
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
                  {filteredOngs.map((ong) => (
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
