import { cn } from '@/libs/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { ElementType, HTMLAttributes, forwardRef } from 'react';

/**
 * boxVariants
 * Utility for generating Tailwind classes based on padding, margin, width, and height variants.
 * Uses class-variance-authority (cva) for variant management.
 */
export const boxVariants = cva('', {
  variants: {
    padding: {
      none: 'p-0', // No padding
      small: 'p-2', // Small padding
      normal: 'p-4', // Normal padding
      large: 'p-6', // Large padding
      xlarge: 'p-8', // Extra large padding
    },
    margin: {
      none: 'm-0', // No margin
      small: 'm-2', // Small margin
      normal: 'm-4', // Normal margin
      large: 'm-6', // Large margin
      xlarge: 'm-8', // Extra large margin
    },
    width: {
      auto: 'w-auto', // Width auto
      full: 'w-full', // Full width
      screen: 'w-screen', // Width of the screen
      fit: 'w-fit', // Fit content width
    },
    height: {
      auto: 'h-auto', // Height auto
      full: 'h-full', // Full height
      screen: 'h-screen', // Height of the screen
      fit: 'h-fit', // Fit content height
    },
  },
  defaultVariants: {
    padding: 'none',
    margin: 'none',
    width: 'auto',
    height: 'auto',
  },
});

/**
 * BoxProps
 * Props for the Box component.
 *
 * @property {ElementType} [as] - Custom element type to render (default: 'div')
 * @property {string} [className] - Additional custom class names
 * @property {string} [padding] - Padding variant (see boxVariants)
 * @property {string} [margin] - Margin variant (see boxVariants)
 * @property {string} [width] - Width variant (see boxVariants)
 * @property {string} [height] - Height variant (see boxVariants)
 * ...other HTML attributes from HTMLAttributes<HTMLElement>
 */
interface BoxProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof boxVariants> {
  as?: ElementType; // Custom element type, e.g., 'section', 'article', etc.
}

/**
 * Box
 * A flexible container component with customizable padding, margin, width, and height.
 * Uses forwardRef to support ref forwarding.
 *
 * @param {BoxProps} props - Props for Box component
 * @param {React.Ref<HTMLElement>} ref - Ref forwarded to the root element
 */
const Box = forwardRef<HTMLElement, BoxProps>(
  (
    {
      className, // Custom class names
      as: Component = 'div', // Custom element type, default to 'div'
      padding, // Padding variant
      margin, // Margin variant
      width, // Width variant
      height, // Height variant
      ...props // Other HTML attributes
    },
    ref
  ) => {
    // Combine variant classes and custom className using cn utility
    return (
      <Component
        ref={ref}
        className={cn(
          boxVariants({
            padding,
            margin,
            width,
            height,
            className,
          })
        )}
        {...props}
      />
    );
  }
);

Box.displayName = 'Box'; // Set display name for better debugging

export type { BoxProps };
export default Box;
