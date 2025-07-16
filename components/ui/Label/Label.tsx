'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';

import { cn } from '@/libs/cn/index';

/**
 * Label component for form elements.
 *
 * This component wraps Radix UI's LabelPrimitive.Root and applies custom styles.
 * It supports all props from LabelPrimitive.Root.
 *
 * @param {object} props - Props inherited from LabelPrimitive.Root.
 * @param {string} [props.className] - Additional class names to extend or override default styles.
 * @returns {JSX.Element} The styled label component.
 *
 * Note:
 * - The `cn` utility is used to merge default and custom class names.
 * - The className includes styles for disabled state, pointer events, and opacity.
 */
function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      // Merge default and custom class names for consistent styling and flexibility
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

export default Label;
