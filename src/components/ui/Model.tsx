import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode } from "react";
import Button from "./Button";
import { FormList } from "../../data";
import FormModel from "../FormModel";
import { IForm } from "../../interface";
interface IProps {
  title?: string;
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
  open: () => void;
}

export default function Model({
  title,
  isOpen,
  close,
  open,
  children,
}: IProps) {

  const renderFormList = FormList.map((form: IForm) => (
    <FormModel key={form.id} form={form} />
  ));

  return (
    <>
      <div className="flex items-center justify-center ">
        <Button className="bg-black p-2 mt-5" onClick={open}>
          Open Model
        </Button>
      </div>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              {title && (
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-black"
                >
                  {title}
                </DialogTitle>
              )}

              <div className="m-5">{renderFormList}</div>
              <div className="mt-4">{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
