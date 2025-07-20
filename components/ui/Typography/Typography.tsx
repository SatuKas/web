import { cn } from '@/libs/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { ElementType, HTMLAttributes, forwardRef } from 'react';

/**
 * typographyVariants
 * Utility to generate Tailwind class names for different typography variants and font weights.
 * Uses class-variance-authority (cva) for variant management.
 */
export const typographyVariants = cva('text-foreground', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
      h6: 'scroll-m-20 text-base font-semibold tracking-tight',
      p: 'leading-7',
      blockquote:
        'mt-6 border-l-2 border-slate-300 pl-6 italic text-slate-800 dark:border-slate-600 dark:text-slate-200',
      list: 'my-6 ml-6 list-disc [&>li]:mt-2',
      inlineCode:
        'relative rounded bg-slate-100 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-400',
      lead: 'text-xl text-slate-700 dark:text-slate-400',
      large: 'text-lg font-semibold text-slate-900 dark:text-slate-50',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-slate-500 dark:text-slate-400',
    },
    weight: {
      thin: 'font-thin',
      extralight: 'font-extralight',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
    textAlign: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    variant: 'p',
    weight: 'normal',
    textAlign: 'left',
  },
});

/**
 * TypographyProps
 * Props for the Typography component.
 *
 * @property asChild - (optional) If true, renders as a child component. Not used in this implementation.
 * @property as - (optional) Custom element type to render (e.g., 'span', 'div', etc).
 * Other props are inherited from HTMLAttributes<HTMLParagraphElement> and VariantProps<typeof typographyVariants>.
 */
interface TypographyProps extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof typographyVariants> {
  asChild?: boolean; // If true, render as a child component (not used in this implementation)
  as?: ElementType; // Custom element type to render (e.g., 'span', 'div', etc)
}

/**
 * variantElementMap
 * Maps each typography variant to its corresponding HTML element.
 * This ensures semantic HTML output for each variant.
 */
const variantElementMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  blockquote: 'blockquote',
  inlineCode: 'code',
  list: 'ul',
  lead: 'p',
  large: 'p',
  small: 'small',
  muted: 'p',
} as const;

/**
 * Typography
 * Reusable component for rendering semantic and styled text elements.
 *
 * - Selects the HTML element based on the `variant` or `as` prop.
 * - Applies Tailwind classes based on the selected variant and weight.
 * - Forwards ref to the rendered element.
 */
const Typography = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, variant, weight, as, children, textAlign, ...props }, ref) => {
    // Determine which HTML element to render: use `as` prop if provided, otherwise map from variant, fallback to 'p'
    const Component = as || (variant ? variantElementMap[variant] : 'p');

    return (
      <Component className={cn(typographyVariants({ variant, weight, className, textAlign }))} ref={ref} {...props}>
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';

export type { TypographyProps };
export default Typography;
