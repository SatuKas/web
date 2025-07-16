import Spinner from '@/components/ui/Spinner';
import clsx from 'clsx';
import { CircleCheck, CircleX, Info, TriangleAlert } from 'lucide-react';
import { useMemo } from 'react';
import { ToastType } from '..';

/**
 * Props for CustomToastBar component.
 */
interface CustomToastBarProps {
  type: ToastType; // Toast type, determines color and icon (e.g. 'success', 'error', etc)
  message: string; // Main message to display in the toast
  errorId?: string; // Optional error ID, shown for error toasts
}

/**
 * CustomToastBar is a UI component for displaying a styled toast notification.
 * It adapts its color scheme and icon based on the toast type.
 *
 * @param {CustomToastBarProps} props - Props for the toast bar
 * @returns {JSX.Element}
 */
const CustomToastBar = ({ type, message, errorId }: CustomToastBarProps) => {
  /**
   * Memoized color scheme based on toast type.
   * This ensures the color classes only recalculate when 'type' changes.
   */
  const { light, main, textColor, background } = useMemo(() => {
    switch (type) {
      case 'success':
        return {
          main: 'bg-green-500 dark:bg-green-900',
          light: 'bg-green-100 dark:bg-green-950/90',
          textColor: 'text-green-500',
          background: 'dark:bg-green-900/50',
        };
      case 'error':
        return {
          main: 'bg-red-500 dark:bg-red-900',
          light: 'bg-red-100 dark:bg-red-950/90',
          textColor: 'text-red-500',
          background: 'dark:bg-red-900/50',
        };
      case 'warning':
        return {
          main: 'bg-orange-500 dark:bg-orange-900',
          light: 'bg-orange-100 dark:bg-orange-950/90',
          textColor: 'text-orange-500',
          background: 'dark:bg-orange-900/50',
        };
      case 'loading':
        return {
          main: 'bg-neutral-500 dark:bg-neutral-900',
          light: 'bg-neutral-100 dark:bg-neutral-950/90',
          textColor: 'text-neutral-500',
          background: 'dark:bg-neutral-900/50',
        };
      default:
        return {
          main: 'bg-blue-500 dark:bg-blue-900',
          light: 'bg-blue-100 dark:bg-blue-950/90',
          textColor: 'text-blue-500',
          background: 'dark:bg-blue-900/50',
        };
    }
  }, [type]);

  /**
   * Memoized icon selection based on toast type.
   * This ensures the icon only recalculates when 'type' changes.
   */
  const icon = useMemo(() => {
    switch (type) {
      case 'success':
        return <CircleCheck fontSize={20} />;
      case 'error':
        return <CircleX fontSize={20} />;
      case 'warning':
        return <TriangleAlert fontSize={20} />;
      case 'loading':
        return <Spinner />;
      default:
        return <Info fontSize={20} />;
    }
  }, [type]);

  return (
    <>
      {/* Left colored bar for visual indicator */}
      <div className={clsx('w-[8px] rounded-s-lg', main)} />
      {/* Main toast container */}
      <div className={clsx('flex gap-3 p-2 pr-3 items-center rounded-e-lg', background)}>
        {/* Icon container */}
        <div
          className={clsx('flex flex-[1_0_32px] items-center justify-center w-8 h-8 rounded-full', light, textColor)}
        >
          {icon}
        </div>
        {/* Message and optional error ID */}
        <div className="flex flex-col items-start justify-center text-sm">
          <p className="font-semibold text-foreground">{message}</p>
          {errorId && <p className="text-xs">ID: {errorId}</p>}
        </div>
      </div>
    </>
  );
};

export default CustomToastBar;
