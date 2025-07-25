import MainPageLayout from '@/components/layout/MainPageLayout';
import { DASHBOARD_BOOKS_PATH_URL } from '@/constants/routes';
import { breadcrumbHelper } from '@/utils/ui';

const ProfilePage = () => {
  return (
    <MainPageLayout breadcrumb={[breadcrumbHelper('menu.profile', DASHBOARD_BOOKS_PATH_URL)]}>
      <div>ProfilePage</div>
    </MainPageLayout>
  );
};

export default ProfilePage;
