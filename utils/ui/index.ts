import { BreadcrumbLinkItem, MenuTranslationKeys } from '@/types/client/ui';

export const breadcrumbHelper = (title: MenuTranslationKeys, url?: string): BreadcrumbLinkItem => {
  return {
    title,
    url,
  };
};
