import Box from '@/components/ui/Box';
import { Card } from '@/components/ui/Card/Card';
import Stack from '@/components/ui/Stack';
import Typography from '@/components/ui/Typography';
import { Briefcase, ClipboardList, LayoutDashboard, NotebookPen } from 'lucide-react';
import { useTranslations } from 'next-intl';

const FeatureSection = () => {
  const t = useTranslations();

  const features = [
    {
      icon: <NotebookPen className="h-8 w-8 text-primary" />,
      title: t('landingPage.featureSection.feature.multiBook.title'),
      description: t('landingPage.featureSection.feature.multiBook.description'),
    },
    {
      icon: <ClipboardList className="h-8 w-8 text-primary" />,
      title: t('landingPage.featureSection.feature.easyToUse.title'),
      description: t('landingPage.featureSection.feature.easyToUse.description'),
    },
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: t('landingPage.featureSection.feature.forEveryone.title'),
      description: t('landingPage.featureSection.feature.forEveryone.description'),
    },
    {
      icon: <LayoutDashboard className="h-8 w-8 text-primary" />,
      title: t('landingPage.featureSection.feature.secureAndTrusted.title'),
      description: t('landingPage.featureSection.feature.secureAndTrusted.description'),
    },
  ];

  return (
    <Stack as="section" id="features" className="relative overflow-hidden pb-16">
      {/* <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> */}
      <Stack gap={2}>
        <Typography variant="h2" textAlign="center">
          {t('landingPage.featureSection.title')}
        </Typography>
        <Typography variant="muted" textAlign="center">
          {t('landingPage.featureSection.subtitle')}
        </Typography>
      </Stack>

      <Box className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Card
            key={feature.title}
            className="animate-fadeIn overflow-hidden p-6 [animation-delay:600ms]"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <Box className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">{feature.icon}</Box>
            <Typography variant="h3" className="mt-4 text-lg font-semibold">
              {feature.title}
            </Typography>
            <Typography variant="p" className="mt-2 text-muted-foreground">
              {feature.description}
            </Typography>
          </Card>
        ))}
      </Box>
      {/* </Box> */}
    </Stack>
  );
};

export default FeatureSection;
