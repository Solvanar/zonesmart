import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../components/Auth.vue'
import Main from '../components/Main.vue'
import { store } from '../store/index'

const routes = [
  { path: '/', name: 'auth', component: Auth, meta: { omitAuth: true } },
  { path: '/main', name: 'main', component: Main, meta: { omitAuth: false } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (route): Promise<any> => {
  const omitAuth = route.meta.omitAuth ?? false
  const accessToken = store.getters.getAccessToken

  if (!accessToken && !omitAuth) {
    await store.dispatch('refresh');
  }

  if (!omitAuth && !accessToken) {
    return {
      path: '/',
      query: route.fullPath !== '/' ? { redirect: route.fullPath } : {},
    };
  }
  if (route.path === '/' && accessToken) {
    return {
      path: '/main',
    };
  }
})

export default router
