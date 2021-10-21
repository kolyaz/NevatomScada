const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/MainPage/Index.vue') },
      { path: '/settings', component: () => import('src/pages/Settings/Settings.vue') },
      { path: '/trends', component: () => import('src/pages/Trend/Trend.vue') },
      { path: '/alarms', component: () => import('src/pages/AlarmsMagazine/AlarmsMagazine.vue') },
      { path: '/net_settings', component: () => import('src/pages/NetSettings/NetSettings.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
