'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';

import { cn } from '@/libs/cn/index';

/**
 * Separator component for visually dividing content.
 *
 * This component wraps Radix UI's SeparatorPrimitive.Root and applies custom styles.
 *
 * @param {object} props - All props inherited from SeparatorPrimitive.Root.
 * @param {string} [props.className] - Additional class names for custom styling.
 * @param {'horizontal' | 'vertical'} [props.orientation='horizontal'] - Direction of the separator. Default is 'horizontal'.
 * @param {boolean} [props.decorative=true] - If true, the separator is only decorative and not exposed to assistive technology. Default is true.
 *
 * Note:
 * - The `cn` utility is used to merge default and custom class names.
 * - The className sets the separator's thickness and length based on orientation.
 * - `decorative` prop is set to true by default for accessibility best practices.
 */
function Separator({
  className,
  orientation = 'horizontal', // orientation: determines if the separator is horizontal or vertical
  decorative = true, // decorative: hides separator from assistive tech if true
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        // Set border color and sizing based on orientation
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className
      )}
      {...props}
    />
  );
}

export default Separator;
