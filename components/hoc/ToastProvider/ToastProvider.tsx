'use client';
import CustomToastBar from '@/components/hoc/ToastProvider/CustomToastBar';
import { parseErrorString } from '@/utils/string';
import { Renderable, Toast, ToastBar, Toaster, ValueOrFunction, toast as reactToast } from 'react-hot-toast';

export type ToastType = 'error' | 'success' | 'info' | 'warning' | 'promise' | 'loading';

interface ToastProviderProps {
  children: React.ReactNode;
}

type ToastPromiseMessage = {
  loading: string;
  success: string;
  error: string;
};

type ToastOption = Partial<
  Pick<Toast, 'id' | 'icon' | 'duration' | 'ariaProps' | 'className' | 'style' | 'position' | 'iconTheme'>
>;
const showToast = (
  message: string | ToastPromiseMessage,
  type: ToastType,
  opts?: ToastOption,
  promise?: Promise<any>
) => {
  if (typeof message === 'string' && type !== 'promise') {
    const { message: toastMessage, errorId } = parseErrorString(message);

    reactToast(<CustomToastBar message={toastMessage} type={type} errorId={errorId} />, {
      ...opts,
      className: '!bg-background !rounded-lg [&>div]:!m-0 [&>div]:!justify-start ',
    });
  }
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

export const toast = {
  info: (message: string, opts?: ToastOption) => showToast(message, 'info', opts),
  success: (message: string, opts?: ToastOption) => showToast(message, 'success', opts),
  warning: (message: string, opts?: ToastOption) => showToast(message, 'warning', opts),
  error: (message: string, opts?: ToastOption) => showToast(message, 'error', opts),
  promise: async (
    promise: Promise<any>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
    opts?: ToastOption
  ) => showToast(messages, 'promise', opts, promise),
  loading: (message: string, opts?: ToastOption) => showToast(message, 'loading', opts),
  custom: (message: ValueOrFunction<Renderable, Toast>, opts?: ToastOption) => reactToast.custom(message, opts),
  dismiss: (toastId?: string) => reactToast.dismiss(toastId),
  remove: (toastId?: string) => reactToast.remove(toastId),
};

const ToastProvider = ({ children }: ToastProviderProps) => (
  <>
    <Toaster position="top-center">
      {(t) =>
        t.type !== 'custom' ? (
          <ToastBar toast={t} style={{ padding: 0, minWidth: '200px' }}>
            {({ message }) => message}
          </ToastBar>
        ) : (
          <>{t.message}</>
        )
      }
    </Toaster>
    {children}
  </>
);

export default ToastProvider;
