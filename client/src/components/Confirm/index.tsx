import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useRef, type ReactNode } from "react";
import { Button } from "../ui/button";
export interface ConfirmProps {
  header: string | ReactNode;
  body: string | ReactNode;
  footer?: string | ReactNode | undefined;
  buttonText: string;
  open: boolean;
  destructive?: boolean | undefined;
  setOpen: (value: boolean) => void;
  handleComplete: () => void;
}
const Confirm = ({
  header,
  body,
  footer,
  buttonText,
  open,
  setOpen,
  handleComplete,
  destructive = false,
}: ConfirmProps) => {
  const cancelButtonRef = useRef(null);

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

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 sm:mt-5">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {header}
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{body}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  {footer ? (
                    footer
                  ) : (
                    <>
                      <Button
                        type="button"
                        variant={destructive ? "destructive" : "default"}
                        onClick={() => {
                          handleComplete();
                          setOpen(false);
                        }}
                      >
                        {buttonText}
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Renunță
                      </Button>
                    </>
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Confirm;
