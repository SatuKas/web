import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/libs/cn/index';
import { Loader2Icon } from 'lucide-react';

/**
 * buttonVariants
 * Utility to generate button class names based on variant, size, and loading state.
 * Uses class-variance-authority (cva) for easy variant management.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      /**
       * variant: determines the color and style of the button
       * - default: primary button style
       * - destructive: for actions that are dangerous or irreversible
       * - outline: bordered button, usually for secondary actions
       * - secondary: less prominent than primary
       * - ghost: minimal button, no background
       * - link: styled as a text link
       */
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-2 hover:underline',
      },
      /**
       * size: controls the button's size and padding
       * - default: normal size
       * - sm: small button
       * - lg: large button
       * - icon: square button for icons only
       */
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
      /**
       * loading: if true, can be used to apply loading-specific styles
       */
      loading: {
        true: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

/**
 * Button component
 *
 * Renders a button with support for variants, sizes, loading state, and asChild rendering.
 *
 * @param className - additional class names for the button
 * @param variant - button style variant (see buttonVariants)
 * @param size - button size (see buttonVariants)
 * @param asChild - if true, renders as a child component using Slot (for polymorphic usage)
 * @param loading - if true, shows a loading spinner and disables the button
 * @param disabled - disables the button
 * @param children - button content
 * @param props - other button props
 */
export default function Button({
  className, // custom class names
  variant, // button style variant
  size, // button size
  asChild = false, // render as Slot if true
  loading = false, // show loading spinner if true
  disabled = false, // disable button if true
  children, // button content
  ...props // other props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean; // if true, use Slot for polymorphic rendering
  }) {
  // If asChild is true, render as Slot for polymorphic composition, otherwise as a native button
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className, loading }))}
      // Button is disabled if loading or disabled is true
      disabled={loading || disabled}
      {...props}
    >
      {/* Show loading spinner if loading is true */}
      {loading && <Loader2Icon className="animate-spin" />}
      {children}
    </Comp>
  );
}
