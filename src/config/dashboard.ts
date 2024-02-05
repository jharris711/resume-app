import { DashboardConfig } from '@/lib/types';

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Dashboard',
      href: '/dashboard'
    },
    {
      title: 'Resume Assistant',
      href: '/'
    },
    {
      title: 'Resources',
      href: '/'
    },
    {
      title: 'Help',
      href: '/'
    }
  ],
  sidebarNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: 'layoutDashboard'
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'settings'
    }
  ]
};
