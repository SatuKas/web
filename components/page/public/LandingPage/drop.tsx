import { ArrowRight, BarChart2, BookOpen, Clock, Shield } from 'lucide-react';
import Link from 'next/link';

import Box from '@/components/ui/Box';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Stack from '@/components/ui/Stack';
import Typography from '@/components/ui/Typography';
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

const drop = () => {
  return (
    <>
      <Box as="section" className="relative overflow-hidden bg-background py-20 sm:py-32">
        <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Box className="text-center">
            <Typography variant="h1" className="animate-fade-up text-4xl font-bold tracking-tight sm:text-6xl">
              Kelola Keuangan Lebih Mudah
              <br />
              dengan{' '}
              <Typography as="span" className="text-primary">
                SatuKas
              </Typography>
            </Typography>
            <Typography
              variant="p"
              className="animate-fade-up mx-auto mt-6 max-w-2xl text-muted-foreground [animation-delay:200ms]"
            >
              Aplikasi pembukuan keuangan yang simpel dan powerful. Dirancang khusus untuk membantu usaha kecil dan
              menengah mengelola keuangan dengan lebih efisien.
            </Typography>
            <Stack direction="row" className="animate-fade-up mt-10 justify-center gap-4 [animation-delay:400ms]">
              <Link href="/register">
                <Button size="lg">
                  Coba Gratis <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg">
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* Features Section */}
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

      {/* CTA Section */}
      <Box as="section" className="relative overflow-hidden py-20 sm:py-32">
        <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Box className="animate-fade-up rounded-3xl bg-primary/5 px-6 py-20 text-center sm:px-12">
            <Typography variant="h2" className="text-3xl font-bold tracking-tight sm:text-4xl">
              Siap untuk Mulai?
            </Typography>
            <Typography variant="p" className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Bergabung sekarang dan rasakan kemudahan mengelola keuangan dengan SatuKas. Gratis 14 hari pertama!
            </Typography>
            <Link href="/register">
              <Button size="lg" className="mt-10">
                Mulai Sekarang <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box as="footer" className="border-t bg-background">
        <Box className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Box className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Box>
              <Typography variant="h3" className="text-lg font-semibold">
                SatuKas
              </Typography>
              <Typography variant="p" className="mt-4 text-sm text-muted-foreground">
                Solusi pembukuan keuangan modern untuk bisnis yang lebih baik.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h3" className="text-lg font-semibold">
                Produk
              </Typography>
              <Stack className="mt-4 space-y-2">
                <Link href="#features" className="text-sm text-muted-foreground hover:text-primary">
                  Fitur
                </Link>
                <Link href="/register" className="text-sm text-muted-foreground hover:text-primary">
                  Daftar
                </Link>
                <Link href="/login" className="text-sm text-muted-foreground hover:text-primary">
                  Login
                </Link>
              </Stack>
            </Box>
            <Box>
              <Typography variant="h3" className="text-lg font-semibold">
                Perusahaan
              </Typography>
              <Stack className="mt-4 space-y-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Tentang Kami
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Kontak
                </Link>
              </Stack>
            </Box>
            <Box>
              <Typography variant="h3" className="text-lg font-semibold">
                Legal
              </Typography>
              <Stack className="mt-4 space-y-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Privasi
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Syarat & Ketentuan
                </Link>
              </Stack>
            </Box>
          </Box>
          <Box className="mt-8 border-t pt-8">
            <Typography variant="p" className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SatuKas. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default drop;
