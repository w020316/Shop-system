<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Home, Grid3X3, ShoppingCart, User } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const tabs = [
  { name: '首页', path: '/', icon: Home },
  { name: '分类', path: '/category', icon: Grid3X3 },
  { name: '购物车', path: '/cart', icon: ShoppingCart },
  { name: '我的', path: '/profile', icon: User },
]

const isActive = (path: string) => {
  return route.path === path
}

function navigateTo(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="tab-bar">
    <div
      v-for="tab in tabs"
      :key="tab.path"
      class="tab-item"
      :class="{ active: isActive(tab.path) }"
      @click="navigateTo(tab.path)"
    >
      <div class="tab-icon-wrapper">
        <component :is="tab.icon" :size="22" :stroke-width="isActive(tab.path) ? 2.5 : 1.8" />
        <span
          v-if="tab.name === '购物车' && cartStore.cartCount > 0"
          class="tab-badge"
        >{{ cartStore.cartCount > 99 ? '99+' : cartStore.cartCount }}</span>
      </div>
      <span class="tab-label">{{ tab.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  padding: 6px 0 env(safe-area-inset-bottom, 8px);
  z-index: 100;
  max-width: 480px;
  margin: 0 auto;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  color: #999;
  transition: color 0.2s;
  padding: 4px 0;
}

.tab-item.active {
  color: #FF6B35;
}

.tab-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-badge {
  position: absolute;
  top: -6px;
  right: -12px;
  background: #FF6B35;
  color: #fff;
  font-size: 10px;
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

.tab-label {
  font-size: 11px;
  line-height: 1;
}

/* PC端隐藏底部导航栏 */
@media (min-width: 768px) {
  .tab-bar {
    display: none;
  }
}
</style>