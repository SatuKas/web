'use client';

import BookRouteContext from '@/contexts/BookRouteContext';
import { useContext } from 'react';

const useBookDashboardRoute = () => {
  const context = useContext(BookRouteContext);

  return context;
};

export default useBookDashboardRoute;
