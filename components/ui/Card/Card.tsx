import * as React from 'react';

import { cn } from '@/libs/cn/index';

/**
 * Card component acts as the main container for card UI.
 * @param className - custom class for styling
 * @param props - other div props
 */
export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', className)}
      {...props}
    />
  );
}

/**
 * CardHeader is used for the top section of the card, usually for title and actions.
 * @param className - custom class for styling
 * @param props - other div props
 *
 * Note:
 * - Uses CSS grid for layout.
 * - The class 'has-data-[slot=card-action]:grid-cols-[1fr_auto]' will add a second column if CardAction is present.
 */
export function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className
      )}
      {...props}
    />
  );
}

/**
 * CardTitle displays the main title of the card.
 * @param className - custom class for styling
 * @param props - other div props
 */
export function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-title" className={cn('leading-none font-semibold', className)} {...props} />;
}

/**
 * CardDescription is for the subtitle or description under the title.
 * @param className - custom class for styling
 * @param props - other div props
 */
export function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-description" className={cn('text-muted-foreground text-sm', className)} {...props} />;
}

/**
 * CardAction is for placing action elements (like buttons) in the card header.
 * @param className - custom class for styling
 * @param props - other div props
 *
 * Note:
 * - Uses grid positioning to align actions to the top right of the header.
 */
export function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  );
}

/**
 * CardContent is for the main content/body of the card.
 * @param className - custom class for styling
 * @param props - other div props
 */
export function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('px-6', className)} {...props} />;
}

/**
 * CardFooter is for the bottom section of the card, usually for actions or summary.
 * @param className - custom class for styling
 * @param props - other div props
 */
export function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-footer" className={cn('flex items-center px-6 [.border-t]:pt-6', className)} {...props} />
  );
}
