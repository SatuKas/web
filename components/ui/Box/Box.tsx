import { cn } from '@/libs/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { ElementType, HTMLAttributes, forwardRef } from 'react';

export const boxVariants = cva('', {
  variants: {
    padding: {
      none: 'p-0',
      small: 'p-2',
      normal: 'p-4',
      large: 'p-6',
      xlarge: 'p-8',
    },
    margin: {
      none: 'm-0',
      small: 'm-2',
      normal: 'm-4',
      large: 'm-6',
      xlarge: 'm-8',
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
    padding: 'none',
    margin: 'none',
    width: 'auto',
    height: 'auto',
  },
});

interface BoxProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof boxVariants> {
  as?: ElementType;
}

const Box = forwardRef<HTMLElement, BoxProps>(
  ({ className, as: Component = 'div', padding, margin, width, height, ...props }, ref) => {
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

Box.displayName = 'Box';

export type { BoxProps };
export default Box;
