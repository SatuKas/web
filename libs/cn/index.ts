import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to combine multiple class names into a single string.
 *
 * - Accepts any number of class name values (string, array, object, etc).
 * - Uses `clsx` to handle conditional and dynamic class names.
 * - Uses `twMerge` to intelligently merge Tailwind CSS classes and avoid conflicts.
 *
 * @param inputs - List of class values to be combined. Can be string, array, or object.
 * @returns A single merged class name string.
 */
export function cn(...inputs: ClassValue[]) {
  // First, combine all class values using clsx (handles conditional logic and arrays/objects)
  // Then, merge the result with twMerge to resolve Tailwind CSS class conflicts
  return twMerge(clsx(inputs));
}
