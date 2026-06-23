<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Search, ArrowLeft, Clock, Flame, X } from 'lucide-vue-next'
import { useProductStore } from '@/stores/product'

const router = useRouter()
const route = useRoute()
const productStore = useProductStore()

const searchInput = ref('')
const hasSearched = ref(false)
const searchHistory = ref<string[]>([])
const hotKeywords = ['T恤', '耳机', '口红', '背包', '面霜', '运动鞋']

const HISTORY_KEY = 'search_history'
const MAX_HISTORY = 10

function loadHistory() {
  try {
    const data = localStorage.getItem(HISTORY_KEY)
    searchHistory.value = data ? JSON.parse(data) : []
  } catch {
    searchHistory.value = []
  }
}

function saveHistory(keyword: string) {
  const list = searchHistory.value.filter(item => item !== keyword)
  list.unshift(keyword)
  if (list.length > MAX_HISTORY) {
    list.length = MAX_HISTORY
  }
  searchHistory.value = list
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list))
}

function clearHistory() {
  searchHistory.value = []
  localStorage.removeItem(HISTORY_KEY)
}

function removeHistoryItem(index: number) {
  searchHistory.value.splice(index, 1)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistory.value))
}

function doSearch(keyword: string) {
  const kw = keyword.trim()
  if (!kw) return
  searchInput.value = kw
  saveHistory(kw)
  productStore.setSearchKeyword(kw)
  hasSearched.value = true
}

function handleSubmit() {
  doSearch(searchInput.value)
}

function clickHistory(keyword: string) {
  doSearch(keyword)
}

function clickHot(keyword: string) {
  doSearch(keyword)
}

function goBack() {
  router.back()
}

function goToDetail(id: number) {
  router.push(`/product/${id}`)
}

function clearSearch() {
  searchInput.value = ''
  productStore.setSearchKeyword('')
  hasSearched.value = false
}

onMounted(() => {
  loadHistory()
  const q = (route.query.q as string) || ''
  if (q) {
    doSearch(q)
  }
  nextTick(() => {
    const input = document.querySelector('.search-input') as HTMLInputElement
    if (input) input.focus()
  })
})
</script>

<template>
  <div class="search-page">
    <div class="search-header">
      <button class="back-btn" @click="goBack">
        <ArrowLeft :size="20" color="#333" />
      </button>
      <div class="search-bar">
        <Search :size="16" color="#999" class="search-icon" />
        <input
          v-model="searchInput"
          type="text"
          placeholder="搜索商品..."
          class="search-input"
          @keyup.enter="handleSubmit"
        />
        <button v-if="searchInput" class="search-clear" @click="clearSearch">
          <X :size="14" color="#999" />
        </button>
      </div>
      <button class="search-btn" @click="handleSubmit">搜索</button>
    </div>

    <div v-if="!hasSearched" class="search-body">
      <div class="history-section" v-if="searchHistory.length > 0">
        <div class="section-header">
          <div class="section-title-row">
            <Clock :size="16" color="#999" />
            <h3 class="section-title">搜索历史</h3>
          </div>
          <button class="clear-btn" @click="clearHistory">清除</button>
        </div>
        <div class="history-list">
          <div
            v-for="(item, index) in searchHistory"
            :key="index"
            class="history-item"
            @click="clickHistory(item)"
          >
            <span class="history-text">{{ item }}</span>
            <button class="history-remove" @click.stop="removeHistoryItem(index)">
              <X :size="12" color="#ccc" />
            </button>
          </div>
        </div>
      </div>

      <div class="hot-section">
        <div class="section-header">
          <div class="section-title-row">
            <Flame :size="16" color="#FF6B35" />
            <h3 class="section-title">热门搜索</h3>
          </div>
        </div>
        <div class="hot-list">
          <span
            v-for="(keyword, index) in hotKeywords"
            :key="index"
            class="hot-tag"
            @click="clickHot(keyword)"
          >
            <span class="hot-rank" :class="{ top: index < 3 }">{{ index + 1 }}</span>
            {{ keyword }}
          </span>
        </div>
      </div>
    </div>

    <div v-else class="search-results">
      <div class="results-header" v-if="productStore.filteredProducts.length > 0">
        <span class="results-count">找到 {{ productStore.filteredProducts.length }} 件商品</span>
      </div>
      <div class="product-grid">
        <div
          v-for="(product, idx) in productStore.filteredProducts"
          :key="product.id"
          class="product-card animate-fade-in-up"
          :style="{ animationDelay: `${idx * 0.05}s` }"
          @click="goToDetail(product.id)"
        >
          <div class="product-image-wrapper">
            <img :src="product.image" :alt="product.name" class="product-image" loading="lazy" />
            <div class="product-tags" v-if="product.tags.length > 0">
              <span class="product-tag">{{ product.tags[0] }}</span>
            </div>
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-desc">{{ product.description }}</p>
            <div class="product-price-row">
              <span class="product-price">&#165;{{ product.price.toFixed(1) }}</span>
              <span class="product-original-price">&#165;{{ product.originalPrice.toFixed(1) }}</span>
            </div>
            <div class="product-meta">
              <span class="product-sales">已售{{ product.sales }}件</span>
              <span class="product-discount">{{ Math.round((1 - product.price / product.originalPrice) * 100) }}%OFF</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="productStore.filteredProducts.length === 0" class="empty-state">
        <div class="empty-icon">&#128269;</div>
        <p>暂无相关商品</p>
        <button class="empty-btn" @click="clearSearch">清除搜索</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-page {
  min-height: 100vh;
  background: var(--bg-page, #F5F5F7);
  padding-bottom: 20px;
}

.search-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.back-btn {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.search-bar {
  flex: 1;
  display: flex;
  align-items: center;
  background: #f5f5f7;
  border-radius: 20px;
  padding: 0 12px;
  height: 36px;
}

.search-icon {
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0 8px;
  font-size: 14px;
  background: transparent;
  color: #333;
  height: 100%;
}

.search-input::placeholder {
  color: #bbb;
}

.search-clear {
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.search-btn {
  background: linear-gradient(135deg, #FF6B35, #FF8F5E);
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
  white-space: nowrap;
}

.search-body {
  padding: 16px;
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
  gap: 6px;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
}

.clear-btn {
  background: none;
  border: none;
  font-size: 13px;
  color: #999;
  cursor: pointer;
  padding: 2px 4px;
}

.history-section {
  margin-bottom: 24px;
}

.history-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #fff;
  border-radius: 16px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.history-item:active {
  background: #f0f0f0;
}

.history-text {
  font-size: 13px;
  color: #333;
}

.history-remove {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.hot-section {
  margin-bottom: 16px;
}

.hot-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hot-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #fff;
  border-radius: 16px;
  padding: 6px 14px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
}

.hot-tag:active {
  background: #FFF0E8;
  color: #FF6B35;
}

.hot-rank {
  font-size: 11px;
  font-weight: 700;
  color: #ccc;
  min-width: 14px;
  text-align: center;
}

.hot-rank.top {
  color: #FF6B35;
}

.search-results {
  padding: 12px 12px 0;
}

.results-header {
  margin-bottom: 10px;
}

.results-count {
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
  .search-page { padding-bottom: 40px; }
  .search-results .product-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 1024px) {
  .search-results .product-grid { grid-template-columns: repeat(4, 1fr); }
}
</style>
