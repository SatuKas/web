import Box from '@/components/ui/Box';
import Separator from '@/components/ui/Separator';
import { SidebarTrigger } from '@/components/ui/Sidebar/Sidebar';
import Stack from '@/components/ui/Stack';

/**
 * Props for SiteHeader component.
 */
interface SiteHeaderProps {
  breadcrumbComponent: React.ReactNode; // Breadcrumb component to display in the header
}

/**
 * SiteHeader component renders the top section of the sidebar,
 * including the sidebar trigger, a separator, and breadcrumb navigation.
 *
 * @param breadcrumb - Array of breadcrumb link items for navigation
 */
export function SiteHeader({ breadcrumbComponent }: SiteHeaderProps) {
  return (
    <Box
      as="header"
      className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
    >
      <Stack direction="row" className="px-4" align="center" gap={2}>
        {/* SidebarTrigger toggles the sidebar open/close state */}
        <SidebarTrigger className="-ml-1" />
        {/* Separator visually separates the trigger from the breadcrumb */}
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        {/* Breadcrumb displays the current navigation path */}
        {breadcrumbComponent}
      </Stack>
    </Box>
  );
}
