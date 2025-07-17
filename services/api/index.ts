import { AuthService } from '@/services/api/AuthService';
import { UserService } from '@/services/api/UserService';

export const authService = new AuthService({});
export const userService = new UserService({
  withCredential: true,
});
