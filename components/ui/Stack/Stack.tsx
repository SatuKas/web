import { cn } from '@/libs/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { ElementType, HTMLAttributes, forwardRef } from 'react';

/**
 * stackVariants
 * Utility for generating Tailwind-based flexbox utility classes using cva.
 * This helps to easily compose flex layouts with different directions, alignments, justifications, wraps, gaps, widths, and heights.
 */
export const stackVariants = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      column: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'column-reverse': 'flex-col-reverse',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    wrap: {
      wrap: 'flex-wrap',
      nowrap: 'flex-nowrap',
      'wrap-reverse': 'flex-wrap-reverse',
    },
    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
      16: 'gap-16',
    },
    width: {
      auto: 'w-auto',
      full: 'w-full',
      screen: 'w-screen',
      fit: 'w-fit',
    },
    height: {
      auto: 'h-auto',
      full: 'h-full',
      screen: 'h-screen',
      fit: 'h-fit',
    },
  },
  defaultVariants: {
    direction: 'column',
    align: 'stretch',
    justify: 'start',
    wrap: 'nowrap',
    gap: 0,
    width: 'auto',
    height: 'auto',
  },
});

/**
 * StackProps
 * Props for the Stack component.
 *
 * @property {ElementType} [as] - Custom component or tag to render as the root element (default: 'div')
 * @property {string} [className] - Additional class names to apply
 * @property {string} [direction] - Flex direction, see stackVariants for options
 * @property {string} [align] - Flex align-items, see stackVariants for options
 * @property {string} [justify] - Flex justify-content, see stackVariants for options
 * @property {string} [wrap] - Flex wrap, see stackVariants for options
 * @property {string|number} [gap] - Gap between children, see stackVariants for options
 * @property {string} [width] - Width of the stack, see stackVariants for options
 * @property {string} [height] - Height of the stack, see stackVariants for options
 * ...HTMLAttributes<HTMLDivElement> - All other native div props
 */
interface StackProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof stackVariants> {
  as?: ElementType; // custom element or component to render, default is 'div'
}

/**
 * Stack
 * A flexible layout component based on flexbox, with easy props for direction, alignment, gap, etc.
 *
 * Uses forwardRef to allow parent components to access the underlying DOM node.
 *
 * @example
 * <Stack direction="row" gap={4} align="center">...</Stack>
 */
const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      as: Component = 'div', // allow custom element/component, default to 'div'
      direction,
      align,
      justify,
      wrap,
      gap,
      width,
      height,
      ...props
    },
    ref
  ) => {
    // Compose the className using stackVariants and any additional className passed in
    return (
      <Component
        ref={ref}
        className={cn(
          stackVariants({
            direction,
            align,
            justify,
            wrap,
            gap,
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

Stack.displayName = 'Stack'; // for better debugging in React DevTools

export type { StackProps };
export default Stack;
