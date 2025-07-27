'use client';

import DialogContext, { DialogProps } from '@/contexts/DialogContext';
import { useContext } from 'react';

const useDialog = () => {
  const { setIsOpen, setDialogProps } = useContext(DialogContext);

  const openDialog = (dialogProps: DialogProps) => {
    setDialogProps(dialogProps);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return { openDialog, closeDialog };
};

export default useDialog;
