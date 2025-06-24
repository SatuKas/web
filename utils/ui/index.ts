import { BreadcrumbLinkItem } from '@/types/client/ui';

export const breadcrumbHelper = (title: string, url?: string): BreadcrumbLinkItem => {
  return {
    title,
    url,
  };
};
