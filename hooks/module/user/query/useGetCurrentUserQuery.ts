import { useQuery } from '@/libs/react-query';
import { userService } from '@/services/api';
import { UserData } from '@/types/client/user';
import { mapSnakeCaseToCamelCase } from '@/utils/data';
import { useMemo } from 'react';

const USER_CURRENT_QUERY_KEY = 'user-current';

const useGetCurrentUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: [USER_CURRENT_QUERY_KEY],
    queryFn: () => userService.getCurrentUser(),
  });

  const user = useMemo(() => {
    if (data) {
      return mapSnakeCaseToCamelCase(data) as UserData;
    }
    return undefined;
  }, [data]);

  return { user, isLoading };
};

export default useGetCurrentUser;
