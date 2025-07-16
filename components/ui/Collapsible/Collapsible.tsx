'use client';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

/**
 * Collapsible component
 *
 * Wrapper for Radix Collapsible Root. Use this as the main container for collapsible content.
 *
 * @param props - All props are forwarded to Radix Collapsible Root.
 */
export function Collapsible({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  // Render the root element for the collapsible, with a custom data-slot for easier targeting/styling.
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

/**
 * CollapsibleTrigger component
 *
 * Acts as the trigger to open or close the collapsible content.
 *
 * @param props - All props are forwarded to Radix CollapsibleTrigger.
 */
export function CollapsibleTrigger({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  // Render the trigger element, with a custom data-slot for easier targeting/styling.
  return <CollapsiblePrimitive.CollapsibleTrigger data-slot="collapsible-trigger" {...props} />;
}

/**
 * CollapsibleContent component
 *
 * The content area that will be shown or hidden based on the collapsible state.
 *
 * @param props - All props are forwarded to Radix CollapsibleContent.
 */
export function CollapsibleContent({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  // Render the content element, with a custom data-slot for easier targeting/styling.
  return <CollapsiblePrimitive.CollapsibleContent data-slot="collapsible-content" {...props} />;
}
