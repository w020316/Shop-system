<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Flame } from 'lucide-vue-next'
import { useProductStore } from '@/stores/product'
import { categoryIcons } from '@/data/products'

const router = useRouter()
const productStore = useProductStore()
const showToast = inject<(msg: string, type?: 'success' | 'error' | 'info') => void>('showToast')!

const loading = ref(true)
const searchInput = ref('')
const currentBanner = ref(0)
let bannerTimer: ReturnType<typeof setInterval>

const flashSaleEndTime = ref(Date.now() + 2 * 60 * 60 * 1000) // 2 hours from now
const countdown = ref({ hours: '02', minutes: '00', seconds: '00' })
let countdownTimer: ReturnType<typeof setInterval>

function updateCountdown() {
  const diff = flashSaleEndTime.value - Date.now()
  if (diff <= 0) {
    countdown.value = { hours: '00', minutes: '00', seconds: '00' }
    clearInterval(countdownTimer)
    return
  }
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  countdown.value = {
    hours: String(h).padStart(2, '0'),
    minutes: String(m).padStart(2, '0'),
    seconds: String(s).padStart(2, '0')
  }
}

const flashSaleProducts = computed(() => {
  return [...productStore.allProducts]
    .sort((a, b) => (a.price / a.originalPrice) - (b.price / b.originalPrice))
    .slice(0, 4)
})

function handleSearch() {
  if (searchInput.value.trim()) {
    router.push({ path: '/search', query: { q: searchInput.value.trim() } })
  }
  productStore.setSearchKeyword(searchInput.value)
}

function goToSearch() {
  router.push('/search')
}

function clearSearch() {
  searchInput.value = ''
  productStore.setSearchKeyword('')
}

function goToDetail(id: number) {
  router.push(`/product/${id}`)
}

function startBannerTimer() {
  bannerTimer = setInterval(() => {
    if (productStore.bannerList.length > 0) {
      currentBanner.value = (currentBanner.value + 1) % productStore.bannerList.length
    }
  }, 3500)
}

function onBannerClick(link: string) {
  router.push(link)
}

onMounted(() => {
  productStore.setSearchKeyword('')
  startBannerTimer()
  updateCountdown()
  countdownTimer = setInterval(updateCountdown, 1000)
  setTimeout(() => {
    loading.value = false
  }, 300)
})

onUnmounted(() => {
  clearInterval(bannerTimer)
  clearInterval(countdownTimer)
})
</script>

<template>
  <div class="home-page">
    <div class="home-header">
      <h1 class="home-title">微商城</h1>
      <p class="home-subtitle">精选好物，品质生活</p>
    </div>

    <div class="search-bar" @click="goToSearch">
      <Search :size="18" color="#999" class="search-icon" />
      <input v-model="searchInput" type="text" placeholder="搜索商品..." class="search-input" @keyup.enter="handleSearch" />
      <button v-if="searchInput" class="search-clear" @click="clearSearch">&#10005;</button>
    </div>

    <!-- 骨架屏 -->
    <template v-if="loading">
      <div class="skeleton-banner skeleton"></div>
      <div class="skeleton-category">
        <div v-for="i in 5" :key="i" class="skeleton-category-item">
          <div class="skeleton skeleton-circle"></div>
          <div class="skeleton skeleton-text-short"></div>
        </div>
      </div>
      <div class="skeleton-product-grid">
        <div v-for="i in 4" :key="i" class="skeleton-product-card">
          <div class="skeleton skeleton-image"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text-short"></div>
          <div class="skeleton skeleton-text-price"></div>
        </div>
      </div>
    </template>

    <!-- 实际内容 -->
    <template v-else>
      <div class="banner-section" v-if="productStore.bannerList.length > 0">
      <div class="banner-wrapper">
        <div v-for="(banner, index) in productStore.bannerList" :key="banner.id" class="banner-slide" :class="{ active: currentBanner === index }" @click="onBannerClick(banner.link)">
          <img :src="banner.image" :alt="banner.title" class="banner-image" />
          <div class="banner-overlay"><span class="banner-title">{{ banner.title }}</span></div>
        </div>
      </div>
      <div class="banner-dots">
        <span v-for="(_, index) in productStore.bannerList" :key="index" class="dot" :class="{ active: currentBanner === index }"></span>
      </div>
    </div>

    <div class="category-section">
      <div class="category-nav">
        <div v-for="cat in productStore.categoryList" :key="cat" class="category-item" :class="{ active: productStore.currentCategory === cat }" @click="productStore.setCategory(cat)">
          <span class="category-icon">{{ categoryIcons[cat] || '📦' }}</span>
          <span class="category-name">{{ cat }}</span>
        </div>
      </div>
    </div>


    <div class="flash-section" v-if="productStore.currentCategory === '全部' && !productStore.searchKeyword">
      <div class="flash-header">
        <div class="flash-title-row">
          <span style="font-size:18px">⚡</span>
          <h2 class="flash-title">限时秒杀</h2>
          <div class="countdown">
            <span class="countdown-block">{{ countdown.hours }}</span>
            <span class="countdown-sep">:</span>
            <span class="countdown-block">{{ countdown.minutes }}</span>
            <span class="countdown-sep">:</span>
            <span class="countdown-block">{{ countdown.seconds }}</span>
          </div>
        </div>
        <span class="flash-more" @click="productStore.setCategory('全部')">更多 &#8250;</span>
      </div>
      <div class="flash-scroll">
        <div v-for="product in flashSaleProducts" :key="'flash-'+product.id" class="flash-card" @click="goToDetail(product.id)">
          <img :src="product.image" :alt="product.name" class="flash-image" loading="lazy" />
          <span class="flash-badge">{{ Math.round((1 - product.price / product.originalPrice) * 100) }}%OFF</span>
          <div class="flash-info">
            <h3 class="flash-name">{{ product.name }}</h3>
            <div class="flash-price-row">
              <span class="flash-price">&#165;{{ product.price.toFixed(0) }}</span>
              <span class="flash-original">&#165;{{ product.originalPrice.toFixed(0) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hot-section" v-if="productStore.currentCategory === '全部' && !productStore.searchKeyword">
      <div class="section-header">
        <div class="section-title-row"><Flame :size="18" color="#FF6B35" /><h2 class="section-title">热门推荐</h2></div>
        <span class="section-more" @click="productStore.setCategory('全部')">查看更多 &#8250;</span>
      </div>
      <div class="hot-scroll">
        <div v-for="(product, idx) in productStore.hotProducts" :key="product.id" class="hot-card animate-fade-in-up" :style="{ animationDelay: `${idx * 0.08}s` }" @click="goToDetail(product.id)">
          <div class="hot-image-wrapper"><img :src="product.image" :alt="product.name" class="hot-image" loading="lazy" /><span class="hot-rank">{{ idx + 1 }}</span></div>
          <div class="hot-info"><h3 class="hot-name">{{ product.name }}</h3><span class="hot-price">&#165;{{ product.price.toFixed(0) }}</span></div>
        </div>
      </div>
    </div>

    <div class="product-section">
      <div class="section-header" v-if="productStore.currentCategory !== '全部' || productStore.searchKeyword">
        <h2 class="section-title">{{ productStore.searchKeyword ? '搜索结果' : productStore.currentCategory }}</h2>
        <span class="product-count">{{ productStore.filteredProducts.length }}件</span>
      </div>
      <div class="product-grid">
        <div v-for="(product, idx) in productStore.filteredProducts" :key="product.id" class="product-card animate-fade-in-up" :style="{ animationDelay: `${idx * 0.05}s` }" @click="goToDetail(product.id)">
          <div class="product-image-wrapper">
            <img :src="product.image" :alt="product.name" class="product-image" loading="lazy" />
            <div class="product-tags" v-if="product.tags.length > 0"><span class="product-tag">{{ product.tags[0] }}</span></div>
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-desc">{{ product.description }}</p>
            <div class="product-price-row"><span class="product-price">&#165;{{ product.price.toFixed(1) }}</span><span class="product-original-price">&#165;{{ product.originalPrice.toFixed(1) }}</span></div>
            <div class="product-meta"><span class="product-sales">已售{{ product.sales }}件</span><span class="product-discount">{{ Math.round((1 - product.price / product.originalPrice) * 100) }}%OFF</span></div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="productStore.filteredProducts.length === 0" class="empty-state">
      <div class="empty-icon">&#128269;</div><p>暂无相关商品</p><button class="empty-btn" @click="clearSearch">清除搜索</button>
    </div>
    </template>
  </div>
</template>

<style scoped>
.home-page {
  padding-bottom: 70px;
}

.home-header {
  background: linear-gradient(135deg, #FF6B35, #FF8F5E);
  padding: 20px 20px 24px;
  position: relative;
}

.home-title {
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  letter-spacing: 1px;
}

.home-subtitle {
  color: rgba(255, 255, 255, 0.85);
  font-size: 13px;
  margin: 4px 0 0;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #fff;
  margin: -16px 16px 0;
  padding: 0 14px;
  border-radius: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 10;
  height: 44px;
}

.search-icon {
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0 10px;
  font-size: 14px;
  background: transparent;
  color: #333;
  height: 100%;
}

.search-input::placeholder {
  color: #bbb;
}

.search-clear {
  background: #eee;
  border: none;
  color: #999;
  font-size: 11px;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 骨架屏样式 */
.skeleton-banner {
  margin: 16px 16px 0;
  height: 140px;
  border-radius: 12px;
}

.skeleton-category {
  display: flex;
  gap: 4px;
  padding: 16px 12px 8px;
}

.skeleton-category-item {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
}

.skeleton-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.skeleton-text-short {
  width: 32px;
  height: 12px;
  border-radius: 4px;
}

.skeleton-product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 8px 12px 0;
}

.skeleton-product-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  padding: 0 0 10px;
}

.skeleton-image {
  width: 100%;
  aspect-ratio: 1;
}

.skeleton-text {
  width: 70%;
  height: 14px;
  border-radius: 4px;
  margin: 8px 10px 0;
}

.skeleton-text-price {
  width: 40%;
  height: 18px;
  border-radius: 4px;
  margin: 6px 10px 0;
}

.banner-section {
  padding: 16px 16px 0;
  position: relative;
}

.banner-wrapper {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 16/7;
}

.banner-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.6s ease;
  cursor: pointer;
}

.banner-slide.active {
  opacity: 1;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 16px;
  background: linear-gradient(transparent, rgba(0,0,0,0.5));
}

.banner-title {
  color: #fff;
  font-size: 15px;
  font-weight: 600;
}

.banner-dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  padding: 10px 0;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: #ddd;
  transition: all 0.3s;
}

.dot.active {
  width: 18px;
  background: #FF6B35;
}

.category-section {
  padding: 4px 0;
}

.category-nav {
  display: flex;
  gap: 4px;
  padding: 8px 12px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.category-nav::-webkit-scrollbar {
  display: none;
}

.category-item {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s;
  min-width: 56px;
}

.category-item.active {
  background: #FFF0E8;
}

.category-icon {
  font-size: 22px;
}

.category-name {
  font-size: 11px;
  color: #666;
  white-space: nowrap;
}

.category-item.active .category-name {
  color: #FF6B35;
  font-weight: 600;
}

.flash-section {
  padding: 12px 16px 0;
}

.flash-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.flash-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.flash-title {
  font-size: 17px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.countdown {
  display: flex;
  align-items: center;
  gap: 4px;
}

.countdown-block {
  background: #1a1a2e;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  min-width: 24px;
  text-align: center;
}

.countdown-sep {
  color: #FF6B35;
  font-weight: 700;
  font-size: 12px;
}

.flash-more {
  font-size: 13px;
  color: #999;
  cursor: pointer;
}

.flash-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
  -webkit-overflow-scrolling: touch;
}

.flash-scroll::-webkit-scrollbar {
  display: none;
}

.flash-card {
  flex-shrink: 0;
  width: 120px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: transform 0.2s;
}

.flash-card:active {
  transform: scale(0.96);
}

.flash-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(135deg, #FF4D4F, #FF6B6B);
  color: #fff;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 0 12px 0 8px;
  font-weight: 700;
}

.flash-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
}

.flash-info {
  padding: 6px 8px 8px;
}

.flash-name {
  font-size: 12px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.flash-price-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.flash-price {
  font-size: 16px;
  font-weight: 700;
  color: #FF4D4F;
}

.flash-original {
  font-size: 10px;
  color: #ccc;
  text-decoration: line-through;
}

.hot-section {
  padding: 8px 16px 0;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.section-title-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.section-title {
  font-size: 17px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.section-more {
  font-size: 13px;
  color: #999;
  cursor: pointer;
}

.hot-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
  -webkit-overflow-scrolling: touch;
}

.hot-scroll::-webkit-scrollbar {
  display: none;
}

.hot-card {
  flex-shrink: 0;
  width: 110px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
}

.hot-card:active {
  transform: scale(0.96);
}

.hot-image-wrapper {
  position: relative;
  width: 110px;
  height: 110px;
}

.hot-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hot-rank {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: linear-gradient(135deg, #FF6B35, #FF8F5E);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hot-info {
  padding: 6px 8px 8px;
}

.hot-name {
  font-size: 12px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hot-price {
  font-size: 15px;
  font-weight: 700;
  color: #FF6B35;
}

.product-section {
  padding: 4px 12px 0;
}

.product-count {
  font-size: 13px;
  color: #999;
}

.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.product-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
}

.product-card:active {
  transform: scale(0.97);
}

.product-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: #f8f8f8;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image {
  transform: scale(1.03);
}

.product-tags {
  position: absolute;
  top: 6px;
  left: 6px;
}

.product-tag {
  background: linear-gradient(135deg, #FF6B35, #FF8F5E);
  color: #fff;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.product-info {
  padding: 8px 10px 10px;
}

.product-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-desc {
  font-size: 11px;
  color: #999;
  margin: 0 0 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-price-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.product-price {
  font-size: 17px;
  font-weight: 700;
  color: #FF6B35;
}

.product-original-price {
  font-size: 11px;
  color: #ccc;
  text-decoration: line-through;
}

.product-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
}

.product-sales {
  font-size: 11px;
  color: #bbb;
}

.product-discount {
  font-size: 10px;
  color: #FF6B35;
  background: #FFF0E8;
  padding: 1px 4px;
  border-radius: 3px;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.empty-state p {
  font-size: 14px;
  margin: 0 0 16px;
}

.empty-btn {
  padding: 8px 24px;
  background: #FF6B35;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
}

@media (min-width: 768px) {
  .home-page { padding-bottom: 40px; }
  .home-header { padding: 28px 32px 32px; }
  .home-title { font-size: 28px; }
  .search-bar { margin: -20px 24px 0; height: 48px; }
  .banner-section { padding: 20px 24px 0; }
  .category-nav { padding: 12px 24px; }
  .hot-scroll { gap: 14px; }
  .hot-card { width: 130px; }
  .hot-image-wrapper { width: 130px; height: 130px; }
  .product-section { padding: 8px 24px 0; }
  .product-grid { grid-template-columns: repeat(3, 1fr); gap: 14px; }
  .skeleton-product-grid { grid-template-columns: repeat(3, 1fr); }
  .product-card {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
  .hot-card {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .hot-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }
}
@media (min-width: 1024px) {
  .product-grid { grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .skeleton-product-grid { grid-template-columns: repeat(4, 1fr); }
  .hot-card { width: 150px; }
  .hot-image-wrapper { width: 150px; height: 150px; }
}
</style>
