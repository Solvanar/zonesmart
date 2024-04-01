import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../components/Auth.vue'
import Main from '../components/Main.vue'
import { user } from './userModel';

const routes = [
  { path: '/', name: 'auth', component: Auth, meta: { omitAuth: true } },
  { path: '/main', name: 'main', component: Main, meta: { omitAuth: false } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (route): Promise<any> => {
  const omitAuth = route.meta.omitAuth
  if (omitAuth) {
    return;
  }

  if (!user.getToken()) {
    await user.refresh();
  }

  if (!omitAuth && !user.isLoggedIn) {
    return {
      path: "/",
      query: route.fullPath !== "/" ? { redirect: route.fullPath } : {},
    };
  }
  if (route.path === "/" && user.isLoggedIn) {
    return {
      path: '/main',
    };
  }
})

export default router
