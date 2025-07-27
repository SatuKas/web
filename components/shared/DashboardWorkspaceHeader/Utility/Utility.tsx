import AppLogo from '@/components/shared/AppLogo';
import ThemeToggle from '@/components/shared/ThemeToggle';
import Box from '@/components/ui/Box';
import Container from '@/components/ui/Container';
import Stack from '@/components/ui/Stack';
import { DASHBOARD_BOOKS_PATH_URL } from '@/constants/routes';
import Link from 'next/link';
import ProfileDropdownMenu from '../ProfileDropdownMenu';

const Utility = () => {
  return (
    <Container fullWidth>
      <Stack className="w-full relative pt-3" direction="row" justify="between" align="center">
        <Link href={DASHBOARD_BOOKS_PATH_URL} className="h-9">
          <Box className="h-full">
            <AppLogo type="icon" variant="color" />
          </Box>
        </Link>
        <Stack direction="row" gap={2} align="center">
          <ThemeToggle />
          <ProfileDropdownMenu />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Utility;
