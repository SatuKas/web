import Box from '@/components/ui/Box';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Separator from '@/components/ui/Separator';
import { SidebarTrigger } from '@/components/ui/Sidebar/Sidebar';
import Stack from '@/components/ui/Stack';
import { BreadcrumbLinkItem } from '@/types/client/ui';

interface SiteHeaderProps {
  breadcrumb: BreadcrumbLinkItem[];
}

export function SiteHeader({ breadcrumb }: SiteHeaderProps) {
  return (
    <Box
      as="header"
      className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
    >
      <Stack direction="row" className="px-4" align="center" gap={2}>
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb items={breadcrumb} />
      </Stack>
    </Box>
  );
}
