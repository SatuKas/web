import { BreadcrumbLinkItem, MenuTranslationKeys } from '@/types/client/ui';

/**
 * Helper function to create a breadcrumb link item.
 *
 * @param title - The translation key for the breadcrumb title (MenuTranslationKeys)
 * @param url - (Optional) The URL for the breadcrumb link. If not provided, the breadcrumb will not be clickable.
 * @returns BreadcrumbLinkItem - An object representing a single breadcrumb link.
 */
export const breadcrumbHelper = (
  title: MenuTranslationKeys, // the translation key for the breadcrumb label
  url?: string // optional URL for the breadcrumb link
): BreadcrumbLinkItem => {
  return {
    title, // MenuTranslationKeys: used for displaying the breadcrumb label
    url, // string | undefined: the link URL, if any
  };
};
