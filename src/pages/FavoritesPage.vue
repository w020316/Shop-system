<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Heart } from 'lucide-vue-next'
import { useProductStore } from '@/stores/product'
import { useFavoriteStore } from '@/stores/favorite'

const router = useRouter()
const productStore = useProductStore()
const favoriteStore = useFavoriteStore()

const favoriteProducts = computed(() =>
  productStore.allProducts.filter(p => favoriteStore.isFavorite(p.id))
)

function goBack() {
  router.back()
}

function goToDetail(id: number) {
  router.push(`/product/${id}`)
}

function removeFavorite(id: number) {
  favoriteStore.toggleFavorite(id)
}
</script>

<template>
  <div class="favorites-page">
    <div class="page-header">
      <button class="back-btn" @click="goBack">
        <ArrowLeft :size="22" />
      </button>
      <span class="header-title">我的收藏</span>
      <span class="header-count">{{ favoriteProducts.length }}件</span>
    </div>

    <div v-if="favoriteProducts.length === 0" class="empty-state">
      <Heart :size="48" color="#ddd" />
      <p>暂无收藏商品</p>
      <button class="go-shop-btn" @click="router.push('/')">去逛逛</button>
    </div>

    <div v-else class="favorites-list">
      <div
        v-for="product in favoriteProducts"
        :key="product.id"
        class="favorite-item animate-fade-in"
        @click="goToDetail(product.id)"
      >
        <img :src="product.image" :alt="product.name" class="item-image" />
        <div class="item-info">
          <h3 class="item-name">{{ product.name }}</h3>
          <p class="item-desc">{{ product.description }}</p>
          <div class="item-bottom">
            <span class="item-price">&#165;{{ product.price.toFixed(1) }}</span>
            <span class="item-original-price">&#165;{{ product.originalPrice.toFixed(1) }}</span>
          </div>
        </div>
        <button class="unfav-btn" @click.stop="removeFavorite(product.id)">
          <Heart :size="20" fill="#FF6B35" color="#FF6B35" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.favorites-page {
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

.header-count {
  font-size: 13px;
  color: #999;
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

.favorites-list {
  padding: 10px 12px;
}

.favorite-item {
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

.favorite-item:active {
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

.unfav-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .favorites-page { padding-bottom: 40px; }
  .favorites-list { padding: 10px 24px; }
}
</style>