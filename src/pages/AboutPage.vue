<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'

const router = useRouter()

function goBack() {
  router.back()
}

const techStack = [
  'Vue 3',
  'Vite',
  'TypeScript',
  'Pinia',
  'Vue Router',
  'Tailwind CSS',
  'Lucide Icons'
]
</script>

<template>
  <div class="about-page">
    <div class="page-header">
      <button class="back-btn" @click="goBack">
        <ArrowLeft :size="22" />
      </button>
      <span class="header-title">关于</span>
      <span class="header-placeholder"></span>
    </div>

    <div class="about-content">
      <div class="app-brand">
        <div class="app-icon">&#128722;</div>
        <h1 class="app-name">微商城</h1>
        <p class="app-version">v1.0.0</p>
      </div>

      <div class="section">
        <h3 class="section-title">应用简介</h3>
        <p class="section-desc">微商城是一款基于 Vue 3 + TypeScript + Vite 构建的移动端电商应用，提供商品浏览、购物车、订单管理等核心功能。</p>
      </div>

      <div class="section">
        <h3 class="section-title">技术栈</h3>
        <div class="tech-list">
          <span v-for="tech in techStack" :key="tech" class="tech-tag">{{ tech }}</span>
        </div>
      </div>
    </div>

    <div class="about-footer">
      <p>&copy; 2026 微商城 All Rights Reserved</p>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  min-height: 100vh;
  background: #f5f5f7;
  display: flex;
  flex-direction: column;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  padding: 4px;
}

.header-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
}

.header-placeholder {
  width: 30px;
}

.about-content {
  flex: 1;
  padding: 0 0 20px;
}

.app-brand {
  text-align: center;
  padding: 40px 20px 30px;
  background: #fff;
}

.app-icon {
  font-size: 56px;
  margin-bottom: 12px;
}

.app-name {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 6px;
}

.app-version {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.section {
  background: #fff;
  margin: 10px 0;
  padding: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 10px;
}

.section-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  padding: 6px 14px;
  background: #FFF0E8;
  color: #FF6B35;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
}

.about-footer {
  text-align: center;
  padding: 20px;
  color: #bbb;
  font-size: 12px;
}

.about-footer p {
  margin: 0;
}

@media (min-width: 768px) {
  .about-page { padding-bottom: 40px; }
  .about-content { max-width: 600px; margin: 0 auto; }
}
</style>