import { cn } from '@/libs/cn/index';

/**
 * Skeleton component for displaying loading placeholder.
 *
 * @param className - custom class for additional styling
 * @param props - other div props passed to the skeleton
 *
 * This component uses Tailwind classes for background color, animation, and rounded corners.
 * The `cn` utility is used to merge custom and default classes.
 */
function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  // Render a div with skeleton styles and any additional props
  return <div data-slot="skeleton" className={cn('bg-accent animate-pulse rounded-md', className)} {...props} />;
}

export default Skeleton;
