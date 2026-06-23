import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ProductDetailPage from '@/pages/ProductDetailPage.vue'
import CartPage from '@/pages/CartPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import OrderConfirmPage from '@/pages/OrderConfirmPage.vue'
import OrderListPage from '@/pages/OrderListPage.vue'
import OrderDetailPage from '@/pages/OrderDetailPage.vue'
import FavoritesPage from '@/pages/FavoritesPage.vue'
import CategoryPage from '@/pages/CategoryPage.vue'
import AddressListPage from '@/pages/AddressListPage.vue'
import AddressEditPage from '@/pages/AddressEditPage.vue'
import ProductManagePage from '@/pages/ProductManagePage.vue'
import SearchPage from '@/pages/SearchPage.vue'
import ChangePasswordPage from '@/pages/ChangePasswordPage.vue'
import BrowseHistoryPage from '@/pages/BrowseHistoryPage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/category',
    name: 'category',
    component: CategoryPage,
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductDetailPage,
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
    meta: { requiresAuth: true },
  },
  {
    path: '/order/confirm',
    name: 'orderConfirm',
    component: OrderConfirmPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrderListPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/order/:id',
    name: 'orderDetail',
    component: OrderDetailPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/address',
    name: 'addressList',
    component: AddressListPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/address/edit/:id?',
    name: 'addressEdit',
    component: AddressEditPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/products',
    name: 'productManage',
    component: ProductManagePage,
    meta: { requiresAuth: true },
  },
  {
    path: '/search',
    name: 'search',
    component: SearchPage,
  },
  {
    path: '/change-password',
    name: 'changePassword',
    component: ChangePasswordPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/history',
    name: 'history',
    component: BrowseHistoryPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFoundPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('current_user')) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router