import Button from '@/components/ui/Button';
import { LANDING_PAGE_PATH_URL } from '@/constants/routes';
import { ArrowLeft, Ghost } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const NotFound = () => {
  const t = useTranslations();

  return (
    <section className="h-dvh w-full flex items-center justify-center bg-background px-6 py-12">
      <div className="max-w-2xl w-full flex flex-col items-center text-center gap-8 animate-fadeIn">
        <div className="relative flex justify-center items-center">
          <Ghost className="w-24 h-24 text-muted-foreground animate-float z-10" />
          <span className="absolute text-9xl font-extrabold text-primary/30 select-none">{t('notFound.404')}</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">{t('notFound.title')}</h1>
          <p className="text-lg md:text-xl text-muted-foreground">{t('notFound.subtitle')}</p>
        </div>

        <Link href={LANDING_PAGE_PATH_URL} passHref>
          <Button variant="default" size="lg">
            <ArrowLeft className="w-4 h-4" />
            {t('notFound.button')}
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
