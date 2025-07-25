import MainPageLayout from '@/components/layout/MainPageLayout';
import { DASHBOARD_BOOKS_PATH_URL } from '@/constants/routes';
import { breadcrumbHelper } from '@/utils/ui';

const DashboardPage = () => {
  return (
    <MainPageLayout breadcrumb={[breadcrumbHelper('menu.dashboard', DASHBOARD_BOOKS_PATH_URL)]}>
      <div>DashboardPage</div>
    </MainPageLayout>
  );
};

export default DashboardPage;
