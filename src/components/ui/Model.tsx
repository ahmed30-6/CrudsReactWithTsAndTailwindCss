import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode } from "react";
import Button from "./Button";
import { X } from "lucide-react";
import '../../styles/Button.css' 
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
  children,
}: IProps) {
  return (
    

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none "
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/40 backdrop-blur-sm" >
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <div className="flex items-center justify-between ">
                
                <div>
                  {title && (
                    <DialogTitle
                      as="h3"
                      className="font-bold text-lg text-black"
                    >
                      {title}
                    </DialogTitle>
                  )}
                </div>
                <div>
                  <Button onClick={close}><X className="text-black"/></Button>
                </div>
              </div>

              <div>{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

  );
}
