import Select from "@/components/Select";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useCallback, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";

const userIdSchema = z.object({
  user: z.string(),
});

export type UserIdSchema = z.infer<typeof userIdSchema>;

interface AddUserInProgramProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: (data: UserIdSchema, setOpen: (open: boolean) => void) => void;
  users: {
    id: string;
    ongName: string;
  }[];
}

const AddUserInProgram = ({
  open,
  setOpen,
  onSave,
  users,
}: AddUserInProgramProps) => {
  const cancelButtonRef = useRef(null);
  const methods = useForm<UserIdSchema>({
    resolver: zodResolver(userIdSchema),
  });
  const onSubmitHandler = useCallback((data: UserIdSchema) => {
    onSave(data, setOpen);
  }, []);

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg sm:p-6">
                    <div>
                      <div className="mt-3 text-center sm:mt-5">
                        <DialogTitle
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Adaugă ONG în program
                        </DialogTitle>
                      </div>
                      <div className="mt-10">
                        <Select
                          name="user"
                          label={"Organizație"}
                          register={methods.register}
                          options={
                            users?.map((user) => ({
                              name: user.id,
                              label: user.ongName,
                            })) || []
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                      <Button
                        variant="secondary"
                        onClick={() => setOpen(false)}
                      >
                        Renunță
                      </Button>
                      <Button type="submit">Salvează</Button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </form>
        </FormProvider>
      </Dialog>
    </Transition>
  );
};

export default AddUserInProgram;
