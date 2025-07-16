import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/Form/Form';
import { DefaultInputProps } from '@/types/client/ui';
import { PropsWithChildren } from 'react';

/**
 * Props for FormInputWraper component.
 *
 * @property label - (optional) The label text for the input field.
 * @property children - The input element or any React node to be wrapped.
 * @property name - (optional) The name/id for the input, used for htmlFor and accessibility.
 * @property description - (optional) Additional description text below the input.
 * @property required - (optional) If true, shows a red asterisk to indicate the field is required.
 */
type FormInputWraperProps = PropsWithChildren<DefaultInputProps>;

/**
 * FormInputWraper is a reusable component to wrap form input elements with consistent label, description, and error message.
 *
 * It uses FormItem, FormLabel, FormControl, FormDescription, and FormMessage from the UI library to provide a standard structure for form fields.
 *
 * @param {FormInputWraperProps} props - The props for the component.
 * @returns {JSX.Element} The wrapped form input with label, description, and error message.
 */
const FormInputWraper = ({ label, children, name, description, required }: FormInputWraperProps) => {
  // Render the label if provided, and show a red asterisk if the field is required
  // The htmlFor attribute on FormLabel helps with accessibility by linking the label to the input

  return (
    <FormItem>
      {label && (
        <FormLabel className="gap-1" htmlFor={name}>
          {label}
          {required && <span className="text-red-500">*</span>}
        </FormLabel>
      )}
      {/* Render the input or child component */}
      <FormControl>{children}</FormControl>
      {/* Show description if provided */}
      {description && <FormDescription>{description}</FormDescription>}
      {/* Always render the form message for validation feedback */}
      <FormMessage />
    </FormItem>
  );
};

export default FormInputWraper;
