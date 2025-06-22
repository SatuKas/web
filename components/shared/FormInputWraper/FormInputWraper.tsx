import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/Form/Form';
import { DefaultInputProps } from '@/types/client/ui';
import { PropsWithChildren } from 'react';

type FormInputWraperProps = PropsWithChildren<DefaultInputProps>;

const FormInputWraper = ({ label, children, name, description }: FormInputWraperProps) => {
  //   const direction = labelDirection === 'vertical' ? 'column' : 'row';

  return (
    <FormItem>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <FormControl>{children}</FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};

export default FormInputWraper;
