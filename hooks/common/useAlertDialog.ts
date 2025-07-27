'use client';

import AlertDialogContext, { AlertDialogProps } from '@/contexts/AlertDialogContext';
import { useContext } from 'react';

const useAlertDialog = () => {
  const { setIsOpen, setAlertDialogProps } = useContext(AlertDialogContext);

  const openAlertDialog = (alertDialogProps: AlertDialogProps) => {
    setAlertDialogProps(alertDialogProps);
    setIsOpen(true);
  };

  const closeAlertDialog = () => {
    setIsOpen(false);
  };

  return { openAlertDialog, closeAlertDialog };
};

export default useAlertDialog;
