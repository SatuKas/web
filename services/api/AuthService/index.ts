import { BaseHttpClient } from '@/services/api/core/BaseHttpClient';
import { AUTH_LOGIN_PATH } from '@/services/api/routes';

export class AuthService extends BaseHttpClient {
  async login() {
    return this.get(AUTH_LOGIN_PATH).then((res: any) => res.data);
  }
}
