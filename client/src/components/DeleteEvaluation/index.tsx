import { useCallback, useState, useEffect } from "react";
import { useDeleteEvaluationMutation } from "@/redux/api/userApi";
import { toast } from "react-toastify";
import { TrashIcon } from "@heroicons/react/20/solid";
import Confirm from "@/components/Confirm";

const DeleteEvaluation = ({ id }: { id: number }) => {
  const [deleteEvaluation, {isSuccess, isError, error}] = useDeleteEvaluationMutation();
  const [open, setOpen] = useState(false);

  const handleComplete = useCallback(() => {
    deleteEvaluation({ id: id });
  }, [id]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Invitația a fost ștearsă.");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!isError) {
      return;
    }

    if (error?.data?.error?.details?.id !== id) {
      return;
    }

    toast.error(error.data.error.message);
  }, [isError]);

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
      <button
          onClick={() => setOpen(true)}
          className="text-red-600 hover:text-red-900"
          title="Șterge invitația"
        >
          <TrashIcon
            className="h-5 w-5"
            aria-hidden="true"
          />
        </button>
    </>
  );
};

export default DeleteEvaluation;
