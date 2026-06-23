<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="not-found-page">
    <div class="error-icon">404</div>
    <h2 class="error-title">页面走丢了</h2>
    <p class="error-desc">你访问的页面不存在，请返回首页</p>
    <button class="back-btn" @click="router.push('/')">返回首页</button>
  </div>
</template>

<style scoped>
.not-found-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f5f5f7;
  padding: 20px;
}

.error-icon {
  font-size: 72px;
  font-weight: 700;
  color: #FF6B35;
  margin-bottom: 16px;
  letter-spacing: -2px;
}

.error-title {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 8px;
}

.error-desc {
  font-size: 14px;
  color: #999;
  margin: 0 0 24px;
}

.back-btn {
  padding: 10px 32px;
  background: linear-gradient(135deg, #FF6B35, #FF8F5E);
  color: #fff;
  border: none;
  border-radius: 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
}
</style>