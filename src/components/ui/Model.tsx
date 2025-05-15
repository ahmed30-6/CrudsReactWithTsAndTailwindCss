import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode } from "react";
import Button from "./Button";
import { X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import '../../styles/Button.css';

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
  const { isDarkMode } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative z-50"
          onClose={close}
          static
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 w-screen overflow-y-auto bg-black/40 backdrop-blur-sm"
          >
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                as={motion.div}
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className={`w-full max-w-lg rounded-2xl ${
                  isDarkMode 
                    ? 'bg-gray-800 text-white border border-gray-700' 
                    : 'bg-white text-gray-900 border border-gray-200'
                } p-6 md:p-8 shadow-xl transition-all duration-200`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="pr-8">
                    {title && (
                      <DialogTitle
                        as="h3"
                        className={`font-bold text-xl md:text-2xl ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {title}
                      </DialogTitle>
                    )}
                  </div>
                  <div>
                    <Button 
                      onClick={close}
                      className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors ${
                        isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div className="mt-4 space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                  {children}
                </div>
              </DialogPanel>
            </div>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
