import * as React from 'react';

import FormInputWraper from '@/components/shared/FormInputWraper';
import { cn } from '@/libs/cn/index';
import { DefaultInputProps } from '@/types/client/ui';

type InputProps = React.ComponentProps<'input'> & DefaultInputProps;

const InputComponent = ({ className, type, ...props }: React.ComponentProps<'input'>) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  );
};

const Input = ({ label, labelDirection, name, ...props }: InputProps) => {
  return (
    <FormInputWraper label={label} labelDirection={labelDirection} name={name}>
      <InputComponent {...props} />
    </FormInputWraper>
  );
};

export default Input;
