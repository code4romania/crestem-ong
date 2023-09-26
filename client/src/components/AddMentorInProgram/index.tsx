import { Fragment, useCallback, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Select from "@/components/Select";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Button";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod";

const userIdSchema = object({
  mentor: string(),
});

export type UserIdSchema = TypeOf<typeof userIdSchema>;

const AddMentorInProgram = ({ open, setOpen, onSave, mentors }) => {
  const cancelButtonRef = useRef(null);
  const methods = useForm<UserIdSchema>({
    resolver: zodResolver(userIdSchema),
  });
  const onSubmitHandler = useCallback((data: UserIdSchema) => {
    onSave(data, setOpen);
  }, []);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg sm:p-6">
                    <div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Adaugă persoană resursă în program
                        </Dialog.Title>
                      </div>
                      <div className="mt-10">
                        <Select
                          name="mentor"
                          label={"Persoană resursă"}
                          register={methods.register}
                          options={
                            mentors?.map((user) => ({
                              name: user.id,
                              label: `${user.firstName} ${user.lastName}`,
                            })) || []
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                      <Button color={"white"} onClick={() => setOpen(false)}>
                        Renunță
                      </Button>
                      <Button type="submit">Salvează</Button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </form>
        </FormProvider>
      </Dialog>
    </Transition.Root>
  );
};

export default AddMentorInProgram;
