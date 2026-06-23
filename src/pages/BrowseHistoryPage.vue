<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Clock, Trash2 } from 'lucide-vue-next'
import { useProductStore } from '@/stores/product'
import { useHistoryStore } from '@/stores/history'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { ref } from 'vue'

const router = useRouter()
const productStore = useProductStore()
const historyStore = useHistoryStore()

const showClearConfirm = ref(false)

const historyProducts = computed(() =>
  historyStore.historyIds
    .map(id => productStore.allProducts.find(p => p.id === id))
    .filter(Boolean)
)

function goBack() {
  router.back()
}

function goToDetail(id: number) {
  router.push(`/product/${id}`)
}

function handleClear() {
  showClearConfirm.value = true
}

function confirmClear() {
  historyStore.clearHistory()
  showClearConfirm.value = false
}
</script>

<template>
  <div class="history-page">
    <div class="page-header">
      <button class="back-btn" @click="goBack">
        <ArrowLeft :size="22" />
      </button>
      <span class="header-title">浏览历史</span>
      <button v-if="historyProducts.length > 0" class="clear-btn" @click="handleClear">
        <Trash2 :size="16" color="#FF4D4F" />
      </button>
      <span v-else class="header-placeholder"></span>
    </div>

    <div v-if="historyProducts.length === 0" class="empty-state">
      <Clock :size="48" color="#ddd" />
      <p>暂无浏览记录</p>
      <button class="go-shop-btn" @click="router.push('/')">去逛逛</button>
    </div>

    <div v-else class="history-list">
      <div
        v-for="product in historyProducts"
        :key="product!.id"
        class="history-item animate-fade-in"
        @click="goToDetail(product!.id)"
      >
        <img :src="product!.image" :alt="product!.name" class="item-image" />
        <div class="item-info">
          <h3 class="item-name">{{ product!.name }}</h3>
          <p class="item-desc">{{ product!.description }}</p>
          <div class="item-bottom">
            <span class="item-price">&#165;{{ product!.price.toFixed(1) }}</span>
            <span class="item-original-price">&#165;{{ product!.originalPrice.toFixed(1) }}</span>
          </div>
        </div>
      </div>
    </div>

    <ConfirmDialog
      :visible="showClearConfirm"
      title="清空历史"
      message="确定要清空所有浏览记录吗？"
      @confirm="confirmClear"
      @cancel="showClearConfirm = false"
    />
  </div>
</template>

<style scoped>
.history-page {
  min-height: 100vh;
  background: #f5f5f7;
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

.clear-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.header-placeholder {
  width: 24px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  gap: 12px;
}

.empty-state p {
  color: #999;
  font-size: 14px;
  margin: 0;
}

.go-shop-btn {
  padding: 8px 24px;
  background: #FF6B35;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
}

.history-list {
  padding: 10px 12px;
}

.history-item {
  display: flex;
  gap: 12px;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: transform 0.2s;
  align-items: center;
}

.history-item:active {
  transform: scale(0.98);
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-desc {
  font-size: 12px;
  color: #999;
  margin: 0 0 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-bottom {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.item-price {
  font-size: 16px;
  font-weight: 700;
  color: #FF6B35;
}

.item-original-price {
  font-size: 11px;
  color: #ccc;
  text-decoration: line-through;
}

@media (min-width: 768px) {
  .history-page { padding-bottom: 40px; }
  .history-list { padding: 10px 24px; }
}
</style>