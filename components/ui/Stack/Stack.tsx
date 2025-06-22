import { cn } from '@/libs/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { ElementType, HTMLAttributes, forwardRef } from 'react';

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

interface StackProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof stackVariants> {
  as?: ElementType;
}

const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, as: Component = 'div', direction, align, justify, wrap, gap, width, height, ...props }, ref) => {
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

Stack.displayName = 'Stack';

export type { StackProps };
export default Stack;
