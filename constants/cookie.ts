import env from '@/config/env';
import { CookieSetOptions } from 'universal-cookie';

export const ACCESS_TOKEN_KEY = 'accs';
export const REFRESH_TOKEN_KEY = 'rfsh';
export const DEVICE_ID_KEY = 'dev_id';

export const DEFAULT_COOKIE_CONFIG: CookieSetOptions = {
  domain: env.MAIN_DOMAIN,
  path: '/',
};
