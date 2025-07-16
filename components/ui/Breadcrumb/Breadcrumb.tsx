'use client';

import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/libs/cn/index';
import { BreadcrumbLinkItem } from '@/types/client/ui';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../DropdownMenu';

/**
 * BreadcrumbProps
 * @property items - array of breadcrumb link items to render in the breadcrumb navigation
 */
interface BreadcrumbProps {
  items: BreadcrumbLinkItem[]; // array of breadcrumb items to display
}

/**
 * BreadcrumbComponent
 * Wrapper for the breadcrumb navigation, renders a <nav> with proper aria attributes.
 * @param props - all props for nav element
 */
export function BreadcrumbComponent({ ...props }: React.ComponentProps<'nav'>) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

/**
 * BreadcrumbList
 * Renders the list container for breadcrumb items.
 * @param className - custom class for styling
 * @param props - all other props for ol element
 */
export function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        'text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5',
        className
      )}
      {...props}
    />
  );
}

/**
 * BreadcrumbItem
 * Renders a single breadcrumb item as a <li>.
 * @param className - custom class for styling
 * @param props - all other props for li element
 */
export function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="breadcrumb-item" className={cn('inline-flex items-center gap-1.5', className)} {...props} />;
}

/**
 * BreadcrumbLink
 * Renders a breadcrumb link, optionally as a child component.
 * @param asChild - if true, renders as a Slot for custom component, otherwise as <a>
 * @param className - custom class for styling
 * @param props - all other props for anchor element
 */
export function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean; // if true, use Slot for custom component
}) {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp data-slot="breadcrumb-link" className={cn('hover:text-foreground transition-colors', className)} {...props} />
  );
}

/**
 * BreadcrumbPage
 * Renders the current page in the breadcrumb, styled as non-interactive.
 * @param className - custom class for styling
 * @param props - all other props for span element
 */
export function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('text-foreground font-normal', className)}
      {...props}
    />
  );
}

/**
 * BreadcrumbSeparator
 * Renders a separator between breadcrumb items, default is a ChevronRight icon.
 * @param children - custom separator, defaults to ChevronRight
 * @param className - custom class for styling
 * @param props - all other props for li element
 */
export function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

/**
 * BreadcrumbEllipsis
 * Renders an ellipsis icon for collapsed breadcrumb items.
 * @param className - custom class for styling
 * @param props - all other props for span element
 */
export function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

/**
 * Breadcrumb
 * Main component to render the breadcrumb navigation.
 * Handles logic for displaying collapsed breadcrumbs if items > 3.
 * @param items - array of breadcrumb link items
 */
const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const t = useTranslations();

  /**
   * Render a single breadcrumb item.
   * If not the last child and has a URL, renders as a link.
   * Otherwise, renders as the current page.
   * @param item - breadcrumb item to render
   * @param lastChild - is this the last breadcrumb item (current page)
   */
  const renderItem = (item: BreadcrumbLinkItem, lastChild?: boolean) => {
    return (
      <BreadcrumbItem key={item.title} className={cn({ 'hidden md:block': !lastChild })}>
        {item.url && !lastChild ? (
          <BreadcrumbLink asChild>
            <Link href={item.url}>{t(item.title)}</Link>
          </BreadcrumbLink>
        ) : (
          <BreadcrumbPage>{t(item.title)}</BreadcrumbPage>
        )}
      </BreadcrumbItem>
    );
  };

  /**
   * Render collapsed breadcrumb items as a dropdown menu.
   * Only used when items.length > 3.
   * @param items - array of breadcrumb items to collapse
   */
  const renderOtherItems = (items: BreadcrumbLinkItem[]) => {
    return (
      <BreadcrumbItem key={items[0].title}>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1">
            <BreadcrumbEllipsis className="size-4" />
            <span className="sr-only">Toggle menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            {items.map((otherItems) => (
              <DropdownMenuItem key={otherItems.title}>
                {otherItems.url ? (
                  <BreadcrumbLink asChild>
                    <Link href={otherItems.url}>{otherItems.title}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{otherItems.title}</BreadcrumbPage>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </BreadcrumbItem>
    );
  };

  /**
   * Memoized rendering of breadcrumb items.
   * If more than 3 items, collapse the middle items into a dropdown.
   * Otherwise, render all items with separators.
   */
  const renderItems = React.useMemo(() => {
    const breadcrumbItems: React.ReactNode[] = [];

    // If more than 3 items, collapse the middle items into a dropdown
    if (items.length > 3) {
      breadcrumbItems.push(renderItem(items[0]));
      breadcrumbItems.push(<BreadcrumbSeparator key="separator-1" />);
      // Collapse all items except the first and last into a dropdown
      breadcrumbItems.push(renderOtherItems(items.slice(1)));
      breadcrumbItems.push(<BreadcrumbSeparator key="separator-2" />);
      breadcrumbItems.push(renderItem(items[items.length - 1], true));

      return breadcrumbItems;
    }

    // Render all items with separators if 3 or less
    return items.map((item, index) => (
      <React.Fragment key={item.title}>
        {renderItem(item, index === items.length - 1)}
        {index < items.length - 1 && <BreadcrumbSeparator key={`separator-${index}`} />}
      </React.Fragment>
    ));
  }, [items]);

  return (
    <BreadcrumbComponent>
      <BreadcrumbList>{renderItems}</BreadcrumbList>
    </BreadcrumbComponent>
  );
};

export default Breadcrumb;
