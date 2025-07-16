import { BaseHttpClient } from '@/services/api/core/BaseHttpClient';
import { AUTH_LOGIN_PATH, AUTH_LOGOUT_PATH } from '@/services/api/routes';
import { LoginPayload } from '@/types/api/auth';

export class AuthService extends BaseHttpClient {
  async login(payload: LoginPayload) {
    return this.post(AUTH_LOGIN_PATH, payload).then((res: any) => res.data);
  }

  async logout() {
    return this.post(AUTH_LOGOUT_PATH, {}).then((res: any) => res.data);
  }
}
