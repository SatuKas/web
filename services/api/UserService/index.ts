import { BaseHttpClient } from '@/services/api/core/BaseHttpClient';
import { USER_CURRENT_PATH } from '@/services/api/routes';
import { ApiResponse } from '@/types/api/common';
import { UserResponse } from '@/types/api/user';

/**
 * UserService handles user-related API requests.
 * Inherits HTTP methods from BaseHttpClient.
 */
export class UserService extends BaseHttpClient {
  async getCurrentUser() {
    // GET request to get current user endpoint
    return this.get<ApiResponse<UserResponse>>(USER_CURRENT_PATH).then((res) => res);
  }
}
