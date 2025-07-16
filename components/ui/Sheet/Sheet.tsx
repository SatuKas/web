'use client';

import * as SheetPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/libs/cn/index';

/**
 * Sheet component acts as the root container for the sheet dialog.
 * It wraps Radix's Dialog Root and passes all props.
 * @param props - All props from Radix Dialog Root
 */
export function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

/**
 * SheetTrigger component is used to open the sheet dialog.
 * It wraps Radix's Dialog Trigger and passes all props.
 * @param props - All props from Radix Dialog Trigger
 */
export function SheetTrigger({ ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

/**
 * SheetClose component is used to close the sheet dialog.
 * It wraps Radix's Dialog Close and passes all props.
 * @param props - All props from Radix Dialog Close
 */
export function SheetClose({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

/**
 * SheetPortal component renders the sheet in a React portal.
 * It wraps Radix's Dialog Portal and passes all props.
 * @param props - All props from Radix Dialog Portal
 */
function SheetPortal({ ...props }: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

/**
 * SheetOverlay component renders the overlay behind the sheet.
 * Adds animation and background styles.
 * @param className - Custom class for overlay
 * @param props - All other props from Radix Dialog Overlay
 */
function SheetOverlay({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        // Animation and overlay styling
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className
      )}
      {...props}
    />
  );
}

/**
 * Props for SheetContent component.
 * @property side - Position of the sheet ('top' | 'right' | 'bottom' | 'left'), default is 'right'
 */
type SheetContentProps = React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left'; // side: determines from which side the sheet appears
};

/**
 * SheetContent component renders the main content area of the sheet.
 * Handles animation and positioning based on the 'side' prop.
 * Also renders a close button at the top right.
 * @param className - Custom class for content
 * @param children - Content inside the sheet
 * @param side - Side from which the sheet appears
 * @param props - All other props from Radix Dialog Content
 */
export function SheetContent({ className, children, side = 'right', ...props }: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          // Base styling and animation
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
          // Conditional styling based on 'side' prop
          side === 'right' &&
            'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
          side === 'left' &&
            'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
          side === 'top' &&
            'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
          side === 'bottom' &&
            'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
          className
        )}
        {...props}
      >
        {children}
        {/* Close button at the top right of the sheet */}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

/**
 * SheetHeader component for the header section of the sheet.
 * Usually contains the title or actions.
 * @param className - Custom class for header
 * @param props - All other props for div
 */
export function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sheet-header" className={cn('flex flex-col gap-1.5 p-4', className)} {...props} />;
}

/**
 * SheetFooter component for the footer section of the sheet.
 * Usually contains action buttons.
 * @param className - Custom class for footer
 * @param props - All other props for div
 */
export function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sheet-footer" className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />;
}

/**
 * SheetTitle component for displaying the sheet's title.
 * @param className - Custom class for title
 * @param props - All other props from Radix Dialog Title
 */
export function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn('text-foreground font-semibold', className)}
      {...props}
    />
  );
}

/**
 * SheetDescription component for displaying the sheet's description.
 * @param className - Custom class for description
 * @param props - All other props from Radix Dialog Description
 */
export function SheetDescription({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}
