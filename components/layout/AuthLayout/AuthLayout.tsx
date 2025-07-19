import Box from '@/components/ui/Box';
import { Card, CardContent } from '@/components/ui/Card';
import Stack from '@/components/ui/Stack';
import { PRIVACY_PATH_URL, TERMS_PATH_URL } from '@/constants/routes';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * Props for AuthLayout component.
 * @property {ReactNode} children - The content to be rendered inside the layout (usually the form or auth content).
 * @property {any} [image] - Optional image source for the right side of the layout (displayed on md+ screens).
 */
interface AuthLayoutProps {
  children: ReactNode; // Main content to render inside the auth layout
  image?: any; // Image source for the illustration (optional)
}

/**
 * AuthLayout is a layout component for authentication pages.
 * It provides a card layout with an optional illustration and a back button.
 *
 * - On the left: renders children (form, etc) and a back button.
 * - On the right (md+): displays an illustration image if provided.
 * - Below: shows terms and privacy policy links.
 *
 * @param {AuthLayoutProps} props - Props for the component.
 */
const AuthLayout = ({ children, image }: AuthLayoutProps) => {
  return (
    <Box className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <Box className="w-full max-w-sm md:max-w-3xl">
        <Stack gap={6}>
          <Card className="overflow-hidden p-0 min-h-[350px]">
            <CardContent className="grid p-0 md:grid-cols-2 min-h-[350px]">
              {/* Left side: auth form */}
              {children}
              {/* Right side: illustration image, only visible on md+ screens */}
              <Box className="bg-muted relative hidden md:block">
                <Image
                  src={image}
                  alt="Image"
                  width={500}
                  height={500}
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </Box>
            </CardContent>
          </Card>
          {/* Terms and privacy policy notice */}
          <Box className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our <Link href={TERMS_PATH_URL}>Terms of Service</Link> and{' '}
            <Link href={PRIVACY_PATH_URL}>Privacy Policy</Link>.
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default AuthLayout;
