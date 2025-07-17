'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';

import { cn } from '@/libs/cn/index';
import Skeleton from '../Skeleton';

/**
 * AvatarComponent is a wrapper for the Radix Avatar Root.
 * Use this as the main container for the avatar.
 *
 * @param className - additional class names for styling
 * @param props - other props passed to the Radix Avatar Root
 */
export function AvatarComponent({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  );
}

/**
 * AvatarImage is used to render the avatar image inside the AvatarComponent.
 *
 * @param className - additional class names for styling
 * @param props - other props passed to the Radix Avatar Image
 */
export function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image data-slot="avatar-image" className={cn('aspect-square size-full', className)} {...props} />
  );
}

/**
 * AvatarFallback is used to render fallback content (like initials) if the image fails to load.
 *
 * @param className - additional class names for styling
 * @param props - other props passed to the Radix Avatar Fallback
 */
export function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn('bg-muted flex size-full items-center justify-center rounded-full', className)}
      {...props}
    />
  );
}

/**
 * AvatarProps
 *
 * image?: string;    // The image URL for the avatar
 * fallback?: string; // The fallback content (e.g., initials) if image is not available
 * alt?: string;      // The alt text for the avatar image
 *
 * Inherits all props from Radix Avatar Root.
 */
interface AvatarProps extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  image?: string; // The image URL for the avatar
  fallback?: string; // The fallback content (e.g., initials) if image is not available
  alt?: string; // The alt text for the avatar image
  isLoading?: boolean;
}

/**
 * Avatar is a composite component that renders an avatar image if available,
 * otherwise renders fallback content. This is the main component to use.
 *
 * Logic:
 * - If `image` is provided, AvatarImage will be rendered.
 * - If `fallback` is provided, AvatarFallback will be rendered.
 * - Both can be rendered together, but typically only one is visible at a time.
 */
const Avatar = ({ className, image, fallback, alt, isLoading, ...props }: AvatarProps) => {
  return (
    <AvatarComponent className={className} {...props}>
      {isLoading && <Skeleton className="size-full" />}
      {/* Render AvatarImage if image prop is provided */}
      {!isLoading && image && <AvatarImage src={image} alt={alt ?? 'avatar'} />}
      {/* Render AvatarFallback if fallback prop is provided */}
      {!isLoading && fallback && <AvatarFallback>{fallback[0].toLocaleUpperCase()}</AvatarFallback>}
    </AvatarComponent>
  );
};

export default Avatar;
