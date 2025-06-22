import { LANDING_PAGE_PATH_URL } from '@/constants/routes';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const NotFound = () => {
  const t = useTranslations();

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-9xl font-extrabold text-foreground tracking-widest">{t('notFound.title')}</h1>
      <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">{t('notFound.subtitle')}</div>
      <button className="mt-5">
        <Link
          href={LANDING_PAGE_PATH_URL}
          className="relative inline-block text-sm hover:cursor-pointer font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
        >
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3 bg-background border border-current">
            <p>{t('notFound.button')}</p>
          </span>
        </Link>
      </button>
    </main>
  );
};

export default NotFound;
