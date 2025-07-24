import AuthFormLayout from '@/components/layout/AuthLayout/AuthFormLayout';
import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';
import Typography from '@/components/ui/Typography';
import { LOGIN_PATH_URL } from '@/constants/routes';
import { Send } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * Props for EmailSent component.
 */
interface EmailSentProps {
  title: string; // The main title to display (usually the email sent message)
  subtitle: string; // Subtitle or additional info below the title
  resendEmail: () => void; // Function to trigger resend email action
  isLoading: boolean; // Indicates if resend email action is in progress
  countDownTimeData: {
    formattedTime: string; // Countdown timer in formatted string (e.g. "00:30")
    isActive: boolean; // If true, countdown is running and resend is disabled
  };
}

/**
 * EmailSent component displays a message after an email is sent,
 * and provides a button to resend the email with a countdown timer.
 *
 * @param resendEmail - function to handle resend email action
 * @param isLoading - loading state for resend button
 * @param countDownTimeData - countdown timer data for resend button
 * @param title - main title text
 * @param subtitle - subtitle text
 */
const EmailSent = ({ resendEmail, isLoading, countDownTimeData, title, subtitle }: EmailSentProps) => {
  const t = useTranslations();

  return (
    <AuthFormLayout backButtonUrl={LOGIN_PATH_URL}>
      <Stack justify="center" align="center" className="p-6 pb-12 md:p-8 md:pb-12 w-full" gap={6}>
        <Send size={60} />

        {/* Display title and subtitle */}
        <Stack className="text-center" align="center" gap={2}>
          <Typography variant={'h3'} className="text-2xl font-bold" textAlign="center">
            {title}
          </Typography>
          <Typography variant="small" className="text-muted-foreground" textAlign="center">
            {subtitle}
          </Typography>
        </Stack>

        {/* Resend email section with countdown logic */}
        <Stack direction="row" align="center" gap={1}>
          <Typography variant="small">{t('common.emailNotReceived')}</Typography>
          <Button
            onClick={resendEmail}
            disabled={isLoading || countDownTimeData.isActive} // Disable if loading or countdown is active
            loading={isLoading}
            size="sm"
            variant="link"
          >
            <Typography variant="small" className="text-inherit">
              {/* Show countdown if active, otherwise show resend text */}
              {countDownTimeData.isActive ? countDownTimeData.formattedTime : t('common.resendEmail')}
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </AuthFormLayout>
  );
};

export default EmailSent;
