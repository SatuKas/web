import { AuthService } from '@/services/api/AuthService';
import { BookService } from '@/services/api/BookService';
import { UserService } from '@/services/api/UserService';

export const authService = new AuthService({});
export const userService = new UserService({
  withCredential: true,
});
export const bookService = new BookService({
  withCredential: true,
});
