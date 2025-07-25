import Stack from '@/components/ui/Stack';
import { cn } from '@/libs/cn';
import Navigation from './Navigation';
import Utility from './Utility';

const DashboardWorkspaceHeader = () => {
  return (
    <Stack
      as="header"
      className={cn('sticky h-28 top-0 left-0 z-30 w-full bg-background border-b')}
      gap={3}
      justify="between"
    >
      <Utility />
      <Navigation />
    </Stack>
  );
};

export default DashboardWorkspaceHeader;
