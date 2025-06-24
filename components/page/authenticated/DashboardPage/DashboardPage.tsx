import MainPageLayout from '@/components/layout/MainPageLayout';
import { DASHBOARD_PATH_URL } from '@/constants/routes';
import { breadcrumbHelper } from '@/utils/ui';

const DashboardPage = () => {
  return (
    <MainPageLayout
      breadcrumb={[
        breadcrumbHelper('Dashboard', DASHBOARD_PATH_URL),
        breadcrumbHelper('Dashboards', DASHBOARD_PATH_URL),
        breadcrumbHelper('Dashboards1', DASHBOARD_PATH_URL),
        breadcrumbHelper('Dashboards2', DASHBOARD_PATH_URL),
        breadcrumbHelper('Dashboards3', DASHBOARD_PATH_URL),
      ]}
    >
      <div>DashboardPage</div>
    </MainPageLayout>
  );
};

export default DashboardPage;
