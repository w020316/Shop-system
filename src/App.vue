<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Home, Grid3X3, ShoppingCart, User, Heart, Package, Settings } from 'lucide-vue-next'
import TabBar from '@/components/TabBar.vue'
import Toast from '@/components/Toast.vue'

const route = useRoute()
const router = useRouter()
const toastMessage = ref('')
const toastType = ref<'success' | 'error' | 'info'>('info')

const showTabBarPages = ['/', '/cart', '/profile', '/category']
const hideSidebarPages = ['/login', '/register']

const isDesktop = ref(window.innerWidth >= 768)

function handleResize() {
  isDesktop.value = window.innerWidth >= 768
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const showSidebar = computed(() => {
  return isDesktop.value && !hideSidebarPages.includes(route.path)
})

const sidebarTabs = [
  { name: '首页', path: '/', icon: Home },
  { name: '分类', path: '/category', icon: Grid3X3 },
  { name: '购物车', path: '/cart', icon: ShoppingCart },
  { name: '我的', path: '/profile', icon: User },
  { name: '收藏', path: '/favorites', icon: Heart },
  { name: '订单', path: '/orders', icon: Package },
  { name: '修改密码', path: '/change-password', icon: Settings },
]

function isTabActive(tabPath: string): boolean {
  if (tabPath === '/') return route.path === '/'
  if (tabPath === '/orders') return route.path === '/orders' || route.path.startsWith('/order/')
  return route.path === tabPath || route.path.startsWith(tabPath + '/')
}

function showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
  toastMessage.value = ''
  setTimeout(() => {
    toastMessage.value = message
    toastType.value = type
  }, 50)
}

provide('showToast', showToast)
</script>

<template>
  <div class="app-layout">
    <!-- PC端侧边栏 -->
    <aside class="desktop-sidebar" v-if="showSidebar">
      <div class="sidebar-brand" @click="router.push('/')">
        <span class="brand-icon">🛒</span>
        <span class="brand-name">微商城</span>
      </div>
      <nav class="sidebar-nav">
        <div v-for="tab in sidebarTabs" :key="tab.path" class="sidebar-nav-item" :class="{ active: isTabActive(tab.path) }" @click="router.push(tab.path)">
          <component :is="tab.icon" :size="20" />
          <span>{{ tab.name }}</span>
        </div>
      </nav>
    </aside>

    <!-- 主内容区 -->
    <div class="app-main">
      <router-view v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
      <!-- 移动端底部导航 -->
      <TabBar v-if="showTabBarPages.includes(route.path) && !isDesktop" />
      <Toast :message="toastMessage" :type="toastType" />
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f5f7;
}

.desktop-sidebar {
  width: 220px;
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
  border-right: 1px solid #f0f0f0;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 200;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 12px rgba(0,0,0,0.06);
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 28px 20px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s;
}

.sidebar-brand:hover {
  background: #FFF0E8;
}
.brand-icon {
  font-size: 32px;
  filter: drop-shadow(0 2px 4px rgba(255, 107, 53, 0.3));
}

.brand-name {
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(135deg, #FF6B35, #FF8F5E);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 2px;
}

.sidebar-nav {
  padding: 16px 0;
  flex: 1;
}

.sidebar-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 20px;
  cursor: pointer;
  color: #666;
  transition: all 0.25s ease;
  font-size: 15px;
  margin: 2px 10px;
  border-radius: 12px;
  position: relative;
}

.sidebar-nav-item:hover {
  background: #f8f8fa;
  color: #333;
  transform: translateX(2px);
}

.sidebar-nav-item.active {
  background: linear-gradient(135deg, #FFF0E8, #FFE8D6);
  color: #FF6B35;
  font-weight: 600;
}

.sidebar-nav-item.active::before {
  content: '';
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  border-radius: 0 4px 4px 0;
  background: linear-gradient(180deg, #FF6B35, #FF8F5E);
}
.app-main {
  flex: 1;
  min-height: 100vh;
  position: relative;
}

/* 移动端隐藏侧边栏 */
@media (max-width: 767px) {
  .desktop-sidebar { display: none; }
  .app-main {
    max-width: 480px;
    margin: 0 auto;
  }
}

/* PC端偏移 */
@media (min-width: 768px) {
  .app-main {
    margin-left: 220px;
  }
}

.page-enter-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>