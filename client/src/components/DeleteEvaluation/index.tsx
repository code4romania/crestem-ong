import Confirm from "@/components/Confirm";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useDeleteEvaluationMutation } from "@/services/evaluation.mutations";

const DeleteEvaluation = ({ id }: { id: number }) => {
  const { mutate: deleteEvaluation } = useDeleteEvaluationMutation();
  const [open, setOpen] = useState(false);

  const handleComplete = useCallback(() => {
    deleteEvaluation(id, {
      onSuccess: () => toast.success("Invitația a fost ștearsă."),
      onError: (error) => {
        const errorResponse = (error as any)?.response?.data?.error;
        const message = errorResponse?.message;
        toast.error(message);
      },
    });
  }, [id]);

  return (
    <>
      <Confirm
        header="Șterge adresa de email"
        body="Ești sigur că vrei să ștergi adresa de email introdusă? Utilizatorul nu va mai avea acces la evaluare și va
trebui să trimiți invitația din nou pentru ca progresul să fie salvat."
        buttonText="Șterge"
        open={open}
        setOpen={setOpen}
        handleComplete={handleComplete}
        destructive={true}
      />
      <Button
        onClick={() => setOpen(true)}
        variant="ghost"
        className="text-red-600 hover:text-red-900"
      >
        <TrashIcon className="h-5 w-5" aria-hidden="true" />
      </Button>
    </>
  );
};

export default DeleteEvaluation;
