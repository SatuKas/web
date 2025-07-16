'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { cn } from '@/libs/cn/index';

/**
 * TooltipProvider is a wrapper for Radix Tooltip.Provider.
 * It provides context for all tooltip components inside it.
 *
 * @param delayDuration - (optional) delay in ms before showing the tooltip, default is 0
 * @param props - other props passed to Radix Tooltip.Provider
 */
export function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />;
}

/**
 * TooltipComponent wraps TooltipProvider and TooltipPrimitive.Root.
 * This ensures the tooltip context is always available for the root.
 *
 * @param props - props for TooltipPrimitive.Root
 */
export function TooltipComponent({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

/**
 * TooltipTrigger is a wrapper for the element that triggers the tooltip.
 *
 * @param props - props for TooltipPrimitive.Trigger
 */
export function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

/**
 * TooltipContent renders the content of the tooltip inside a portal.
 * It also includes the tooltip arrow.
 *
 * @param className - (optional) additional class names for styling
 * @param sideOffset - (optional) offset for tooltip position, default is 0
 * @param children - tooltip content
 * @param props - other props for TooltipPrimitive.Content
 */
export function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          // Styling for animation, color, and positioning
          'bg-secondary text-secondary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
          className
        )}
        {...props}
      >
        {children}
        {/* Tooltip arrow for visual cue */}
        <TooltipPrimitive.Arrow className="bg-secondary fill-secondary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

/**
 * TooltipProps type for Tooltip component.
 *
 * - children: ReactNode - the element that will trigger the tooltip
 * - content: ReactNode - the content to show inside the tooltip
 * - sideOffset: number (optional) - offset for tooltip position
 * - ...props: other props for TooltipPrimitive.Root
 */
type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root> &
  Pick<React.ComponentProps<typeof TooltipPrimitive.Content>, 'sideOffset'> & {
    content: React.ReactNode; // content to display inside the tooltip
  };

/**
 * Tooltip is a high-level component that combines trigger and content.
 *
 * Usage:
 * <Tooltip content="Tooltip text">
 *   <button>Hover me</button>
 * </Tooltip>
 *
 * @param children - the element that triggers the tooltip
 * @param content - the tooltip content
 * @param sideOffset - (optional) offset for tooltip position, default is 0
 * @param props - other props for TooltipPrimitive.Root
 */
const Tooltip = ({ children, content, sideOffset = 0, ...props }: TooltipProps) => {
  return (
    <TooltipComponent {...props}>
      {/* asChild allows the trigger to be any element */}
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent sideOffset={sideOffset}>{content}</TooltipContent>
    </TooltipComponent>
  );
};

export default Tooltip;
