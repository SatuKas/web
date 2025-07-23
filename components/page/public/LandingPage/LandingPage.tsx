import Box from '@/components/ui/Box';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Stack from '@/components/ui/Stack';
import Typography from '@/components/ui/Typography';
import { APP_LOGO } from '@/config/app';
import { LOGIN_PATH_URL, REGISTER_PATH_URL } from '@/constants/routes';
import { BarChart2, BookOpen, Clock, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

const LandingPage = () => {
  const t = useTranslations();

  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: 'Pencatatan Sederhana',
      description: 'Catat keuangan dengan mudah dan cepat. Desain yang intuitif untuk semua level pengguna.',
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-primary" />,
      title: 'Laporan Real-time',
      description: 'Lihat laporan keuangan secara real-time. Analisis yang jelas untuk keputusan yang lebih baik.',
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: 'Pengingat Otomatis',
      description: 'Jangan lewatkan pembayaran penting. Atur pengingat untuk transaksi rutin.',
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: 'Aman & Terpercaya',
      description: 'Data keuangan lu aman bersama kami. Enkripsi end-to-end untuk keamanan maksimal.',
    },
  ];

  return (
    <Box className="min-h-screen w-full">
      <Stack className="mx-auto max-w-screen-2xl px-4 relative" gap={4}>
        {/* Header */}
        <Stack
          as="header"
          className="@container py-4 h-16 absolute top-0 left-0 px-4 z-30 w-full"
          direction="row"
          justify="between"
        >
          <Box>
            <Image src={APP_LOGO.text} alt="logo" width={100} height={100} />
          </Box>
          <Stack direction="row" gap={2}>
            <Link href={LOGIN_PATH_URL}>
              <Button variant="ghost" size="sm">
                {t('common.login')}
              </Button>
            </Link>
            <Link href={REGISTER_PATH_URL}>
              <Button size="sm">{t('common.noteNow')}</Button>
            </Link>
          </Stack>
        </Stack>

        <Stack as="main" gap={4} className="py-16">
          {/* Hero */}
          <Stack className="py-16" gap={5} justify="center" align="center">
            <Stack gap={5} className="max-w-2xl">
              <Typography variant="h1" className="font-black animate-fadeIn" textAlign="center">
                {t('landingPage.hero.title1')}
                <br />
                {t('landingPage.hero.title2')}
              </Typography>
              <Typography variant="muted" textAlign="center" className="animate-fadeIn">
                {t('landingPage.hero.subtitle')}
              </Typography>
            </Stack>
            <Button size="lg" className="animate-fadeIn delay-150">
              {t('common.noteNow')}
            </Button>
          </Stack>

          {/* Features */}
          <Box
            as="section"
            id="features"
            className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-900/50 sm:py-32"
          >
            <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Box className="text-center">
                <Typography variant="h2" className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Fitur yang Lu Butuhkan
                </Typography>
                <Typography variant="p" className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                  Semua tools yang lu perlukan untuk mengelola keuangan dengan lebih baik, dalam satu aplikasi yang
                  powerful.
                </Typography>
              </Box>

              <Box className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                  <Card
                    key={feature.title}
                    className="animate-fade-up overflow-hidden p-6 [animation-delay:600ms]"
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  >
                    <Box className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      {feature.icon}
                    </Box>
                    <Typography variant="h3" className="mt-4 text-lg font-semibold">
                      {feature.title}
                    </Typography>
                    <Typography variant="p" className="mt-2 text-muted-foreground">
                      {feature.description}
                    </Typography>
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LandingPage;
