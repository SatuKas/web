'use client';

import Button from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { createContext, ReactNode, useState } from 'react';

export type DialogProps = {
  title: string;
  description?: string;
  children: string | ReactNode;
  action?: {
    confirm?: {
      label: string;
      onClick: () => void;
      props?: React.ComponentProps<typeof Button>;
    };
    cancel?: {
      label: string;
      onClick: () => void;
      props?: React.ComponentProps<typeof Button>;
    };
  };
};

interface DialogContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setDialogProps: (alertDialogProps: DialogProps) => void;
}

const DialogContext = createContext<DialogContextType>({
  isOpen: false,
  setIsOpen: () => {},
  setDialogProps: () => {},
});

interface DialogProviderProps {
  children: ReactNode;
}

export const DEFAULT_DIALOG_PROPS: DialogProps = {
  title: '',
  description: '',
  children: '',
  action: {
    confirm: {
      label: '',
      onClick: () => {},
    },
  },
};

export const DialogProvider = ({ children }: DialogProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogProps>(DEFAULT_DIALOG_PROPS);

  const value: DialogContextType = {
    isOpen,
    setIsOpen,
    setDialogProps,
  };

  return (
    <DialogContext.Provider value={value}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogProps.title}</DialogTitle>
            {dialogProps.description && <DialogDescription>{dialogProps.description}</DialogDescription>}
          </DialogHeader>
          {dialogProps.children}
          {dialogProps.action && (
            <DialogFooter>
              {dialogProps.action.cancel && (
                <Button variant="outline" onClick={() => setIsOpen(false)} {...dialogProps.action.cancel.props}>
                  {dialogProps.action.cancel.label}
                </Button>
              )}
              {dialogProps.action.confirm && (
                <Button type="button" {...dialogProps.action.confirm.props}>
                  {dialogProps.action.confirm.label}
                </Button>
              )}
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
      {children}
    </DialogContext.Provider>
  );
};

export default DialogContext;
