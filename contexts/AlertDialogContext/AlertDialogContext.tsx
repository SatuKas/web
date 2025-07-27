'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/AlertDialog';
import Button from '@/components/ui/Button';
import { createContext, ReactNode, useState } from 'react';

export type AlertDialogProps = {
  title: string;
  description: string;
  action: {
    confirm: {
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

interface AlertDialogContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setAlertDialogProps: (alertDialogProps: AlertDialogProps) => void;
}

const AlertDialogContext = createContext<AlertDialogContextType>({
  isOpen: false,
  setIsOpen: () => {},
  setAlertDialogProps: () => {},
});

interface AlertDialogProviderProps {
  children: ReactNode;
}

export const DEFAULT_ALERT_DIALOG_PROPS: AlertDialogProps = {
  title: '',
  description: '',
  action: {
    confirm: {
      label: '',
      onClick: () => {},
    },
  },
};

export const AlertDialogProvider = ({ children }: AlertDialogProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertDialogProps, setAlertDialogProps] = useState<AlertDialogProps>(DEFAULT_ALERT_DIALOG_PROPS);

  const value: AlertDialogContextType = {
    isOpen,
    setIsOpen,
    setAlertDialogProps,
  };

  return (
    <AlertDialogContext.Provider value={value}>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertDialogProps.title}</AlertDialogTitle>
            <AlertDialogDescription>{alertDialogProps.description}</AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-4">
            {alertDialogProps.action.cancel && (
              <AlertDialogCancel asChild>
                <Button
                  variant="outline"
                  {...alertDialogProps.action.cancel.props}
                  onClick={alertDialogProps.action.cancel.onClick}
                >
                  {alertDialogProps.action.cancel.label}
                </Button>
              </AlertDialogCancel>
            )}

            <AlertDialogAction asChild>
              <Button
                variant="default"
                {...alertDialogProps.action.confirm.props}
                onClick={alertDialogProps.action.confirm.onClick}
              >
                {alertDialogProps.action.confirm.label}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {children}
    </AlertDialogContext.Provider>
  );
};

export default AlertDialogContext;
