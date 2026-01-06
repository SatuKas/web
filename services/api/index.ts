import { AuthService } from '@/services/api/AuthService';
import { BookService } from '@/services/api/BookService';
import { CoaService } from '@/services/api/CoaService';
import { ReportService } from '@/services/api/ReportService';
import { TransactionService } from '@/services/api/TransactionService';
import { UserService } from '@/services/api/UserService';

export const authService = new AuthService({});
export const userService = new UserService({
  withCredential: true,
});
export const bookService = new BookService({
  withCredential: true,
});

export const coaService = new CoaService({
  withCredential: true,
});

export const transactionService = new TransactionService({
  withCredential: true,
});

export const reportService = new ReportService({
  withCredential: true,
});
