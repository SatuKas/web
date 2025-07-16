'use client';
import CustomToastBar from '@/components/hoc/ToastProvider/CustomToastBar';
import { parseErrorString } from '@/utils/string';
import { Renderable, Toast, ToastBar, Toaster, ValueOrFunction, toast as reactToast } from 'react-hot-toast';

/**
 * ToastType defines the available types of toast notifications.
 * - 'error': for error messages
 * - 'success': for success messages
 * - 'info': for informational messages
 * - 'warning': for warning messages
 * - 'promise': for promise-based toasts
 * - 'loading': for loading state toasts
 */
export type ToastType = 'error' | 'success' | 'info' | 'warning' | 'promise' | 'loading';

/**
 * Props for ToastProvider component.
 * @property children - React children nodes to be rendered inside the provider
 */
interface ToastProviderProps {
  children: React.ReactNode; // children elements to be wrapped by the provider
}

/**
 * ToastPromiseMessage defines the structure for messages used in promise-based toasts.
 * @property loading - message to show while promise is loading
 * @property success - message to show when promise resolves successfully
 * @property error - message to show when promise is rejected
 */
type ToastPromiseMessage = {
  loading: string; // message for loading state
  success: string; // message for success state
  error: string; // message for error state
};

/**
 * ToastOption defines the optional configuration for a toast.
 * Only a subset of Toast properties are allowed.
 * - id: custom id for the toast
 * - icon: custom icon for the toast
 * - duration: how long the toast should be visible
 * - ariaProps: accessibility props
 * - className: custom class for styling
 * - style: custom inline style
 * - position: position of the toast on screen
 * - iconTheme: theme for the icon
 */
type ToastOption = Partial<
  Pick<Toast, 'id' | 'icon' | 'duration' | 'ariaProps' | 'className' | 'style' | 'position' | 'iconTheme'>
>;

/**
 * showToast is a helper function to display different types of toasts.
 * Handles both regular and promise-based toasts.
 *
 * @param message - string message or object for promise-based messages
 * @param type - type of toast to display
 * @param opts - optional toast configuration
 * @param promise - (optional) promise to track for promise-based toasts
 */
const showToast = (
  message: string | ToastPromiseMessage,
  type: ToastType,
  opts?: ToastOption,
  promise?: Promise<any>
) => {
  // Handle regular toast (not promise)
  if (typeof message === 'string' && type !== 'promise') {
    // parseErrorString will extract errorId if present in the message
    const { message: toastMessage, errorId } = parseErrorString(message);

    reactToast(<CustomToastBar message={toastMessage} type={type} errorId={errorId} />, {
      ...opts,
      className: '!bg-background !rounded-lg [&>div]:!m-0 [&>div]:!justify-start ',
    });
  }
  // Handle promise-based toast
  if (typeof message === 'object' && type === 'promise' && promise) {
    reactToast.promise(
      promise,
      {
        loading: <CustomToastBar message={message.loading} type="loading" />,
        success: <CustomToastBar message={message.success} type="success" />,
        error: <CustomToastBar message={message.error} type="error" />,
      },
      {
        ...opts,
        className: '!bg-background !rounded-lg [&>div]:!m-0 [&>div]:!justify-start ',
      }
    );
  }
};

/**
 * toast is a utility object to easily trigger different types of toasts.
 * - info, success, warning, error: show a toast with the given type
 * - promise: show a toast that tracks a promise's state
 * - loading: show a loading toast
 * - custom: show a custom toast
 * - dismiss: dismiss a toast by id (or all if no id)
 * - remove: remove a toast by id (or all if no id)
 */
export const toast = {
  info: (message: string, opts?: ToastOption) => showToast(message, 'info', opts),
  success: (message: string, opts?: ToastOption) => showToast(message, 'success', opts),
  warning: (message: string, opts?: ToastOption) => showToast(message, 'warning', opts),
  error: (message: string, opts?: ToastOption) => showToast(message, 'error', opts),
  promise: async (
    promise: Promise<any>,
    messages: {
      loading: string; // message for loading state
      success: string; // message for success state
      error: string; // message for error state
    },
    opts?: ToastOption
  ) => showToast(messages, 'promise', opts, promise),
  loading: (message: string, opts?: ToastOption) => showToast(message, 'loading', opts),
  custom: (message: ValueOrFunction<Renderable, Toast>, opts?: ToastOption) => reactToast.custom(message, opts),
  dismiss: (toastId?: string) => reactToast.dismiss(toastId),
  remove: (toastId?: string) => reactToast.remove(toastId),
};

/**
 * ToastProvider wraps the app and provides the Toaster context.
 * Renders the Toaster at the top-center of the screen.
 * Customizes the ToastBar for non-custom toasts.
 *
 * @param children - React children nodes to be rendered inside the provider
 */
const ToastProvider = ({ children }: ToastProviderProps) => (
  <>
    <Toaster position="top-center">
      {(t) =>
        t.type !== 'custom' ? (
          // For standard toasts, use ToastBar with custom style
          <ToastBar toast={t} style={{ padding: 0, minWidth: '200px' }}>
            {({ message }) => message}
          </ToastBar>
        ) : (
          // For custom toasts, render the message directly
          <>{t.message}</>
        )
      }
    </Toaster>
    {children}
  </>
);

export default ToastProvider;
