import { DASHBOARD_BOOKS_PATH_URL } from '@/constants/routes';
import { redirect } from 'next/navigation';

const WorkspacePageRoute = () => {
  redirect(DASHBOARD_BOOKS_PATH_URL);
};

export default WorkspacePageRoute;
