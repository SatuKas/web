'use client';

import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/libs/cn/index';
import { BreadcrumbLinkItem } from '@/types/client/ui';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../DropdownMenu';

interface BreadcrumbProps {
  items: BreadcrumbLinkItem[];
}

export function BreadcrumbComponent({ ...props }: React.ComponentProps<'nav'>) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

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

export function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="breadcrumb-item" className={cn('inline-flex items-center gap-1.5', className)} {...props} />;
}

export function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp data-slot="breadcrumb-link" className={cn('hover:text-foreground transition-colors', className)} {...props} />
  );
}

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

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const t = useTranslations();
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

  const renderItems = React.useMemo(() => {
    const breadcrumbItems: React.ReactNode[] = [];

    if (items.length > 3) {
      breadcrumbItems.push(renderItem(items[0]));
      breadcrumbItems.push(<BreadcrumbSeparator key="separator-1" />);
      breadcrumbItems.push(renderOtherItems(items.slice(1)));
      breadcrumbItems.push(<BreadcrumbSeparator key="separator-2" />);
      breadcrumbItems.push(renderItem(items[items.length - 1], true));

      return breadcrumbItems;
    }

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
