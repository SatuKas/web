import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';
import Typography from '@/components/ui/Typography';
import { LOGIN_PATH_URL } from '@/constants/routes';
import { KeyRound, ShieldCheck, ShieldX } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useMemo } from 'react';

/**
 * Props for ProcessStatus component
 * @property isSuccessVerify - indicates if the email verification was successful
 * @property isErrorToken - indicates if there was a token error during verification
 */
interface ProcessStatusProps {
  isSuccessVerify: boolean; // true if verification is successful
  isErrorToken: boolean; // true if token is invalid or expired
}

/**
 * Props for ProcessIcon component
 * @property type - determines which icon to show: 'success', 'error', or 'token'
 */
interface ProcessIconProps {
  type: 'success' | 'error' | 'token'; // icon type to display
}

/**
 * Render icon based on process status type.
 * - 'error': shows error icon
 * - 'token': shows token-related icon
 * - 'success': shows success icon
 */
const ProcessIcon = ({ type }: ProcessIconProps) => {
  switch (type) {
    case 'error':
      return <ShieldX size={60} className="text-destructive" />;
    case 'token':
      return <KeyRound size={60} className="text-muted-foreground" />;
    default:
      return <ShieldCheck size={60} className="text-primary" />;
  }
};

/**
 * ProcessStatus component displays the status of email verification process.
 * It shows different icon, title, and description based on the verification result.
 * If verification is successful, it also shows a button to go back to login.
 */
const ProcessStatus = ({ isErrorToken, isSuccessVerify }: ProcessStatusProps) => {
  const t = useTranslations();

  /**
   * Memoized title based on verification status.
   * Priority: token error > success > general error
   */
  const title = useMemo(() => {
    if (isErrorToken) {
      return t('auth.verifyEmail.errorToken.title');
    }
    if (isSuccessVerify) {
      return t('auth.verifyEmail.successVerify.title');
    }
    return t('auth.verifyEmail.errorVerify.title');
  }, [isErrorToken, isSuccessVerify, t]);

  /**
   * Memoized description based on verification status.
   * Priority: token error > success > general error
   */
  const description = useMemo(() => {
    if (isErrorToken) {
      return t('auth.verifyEmail.errorToken.description');
    }
    if (isSuccessVerify) {
      return t('auth.verifyEmail.successVerify.description');
    }
    return t('auth.verifyEmail.errorVerify.description');
  }, [isErrorToken, isSuccessVerify, t]);

  // Determine which icon to show based on status:
  // - token error: 'token'
  // - success: 'success'
  // - otherwise: 'error'
  return (
    <Stack gap={4} justify="center" align="center">
      <ProcessIcon type={isErrorToken ? 'token' : isSuccessVerify ? 'success' : 'error'} />
      <Stack gap={1} justify="center" align="center">
        <Typography textAlign="center" variant="h3" weight="semibold">
          {title}
        </Typography>
        <Typography textAlign="center" variant="muted">
          {description}
        </Typography>
      </Stack>
      {/* Show back to login button only if verification is successful */}
      {isSuccessVerify && (
        <Link href={LOGIN_PATH_URL}>
          <Button>{t('common.backToLogin')}</Button>
        </Link>
      )}
    </Stack>
  );
};

export default ProcessStatus;
