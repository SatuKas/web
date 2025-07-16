import { REGISTER_FORM_DEFAULT_VALUES } from '@/constants/auth';
import { RegisterData } from '@/types/client/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import useRegisterSchema from './useRegisterSchema';

/**
 * Custom hook for handling register form logic.
 *
 * This hook sets up react-hook-form with zod validation schema for the register form.
 * It returns the form instance and a submit handler.
 *
 * @returns {object} - Contains:
 *   form: react-hook-form methods and state for the register form
 *   onSubmit: function to handle form submission
 */
const useRegisterForm = () => {
  // Get the zod schema for register form validation
  const { registerSchema } = useRegisterSchema();

  // Initialize react-hook-form with zod resolver and default values
  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema), // use zod schema for validation
    defaultValues: REGISTER_FORM_DEFAULT_VALUES, // initial form values
  });

  /**
   * Handle form submission.
   *
   * @param {RegisterData} data - The form data after validation
   *   email: string // user's email address
   *   password: string // user's password
   *   confirmPassword: string // confirmation of user's password
   */
  const onSubmit: SubmitHandler<RegisterData> = (data) => {
    // For now, just log the data. Replace with actual register logic if needed.
    console.log({ data });
  };

  return { form, onSubmit };
};

export default useRegisterForm;
