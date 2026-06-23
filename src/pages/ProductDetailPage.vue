<script setup lang="ts">
import { ref, computed, inject, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, ShoppingCart, Heart, Star, ChevronRight } from 'lucide-vue-next'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import { useFavoriteStore } from '@/stores/favorite'
import { useHistoryStore } from '@/stores/history'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
const historyStore = useHistoryStore()
const showToast = inject<(msg: string, type?: 'success' | 'error' | 'info') => void>('showToast')!

const productId = computed(() => Number(route.params.id))
const product = computed(() => productStore.getProductById(productId.value))

const selectedColor = ref('')
const selectedSize = ref('')
const quantity = ref(1)
const currentImageIndex = ref(0)
const showSpecModal = ref(false)
const specAction = ref<'cart' | 'buy'>('cart')

const isFav = computed(() => product.value ? favoriteStore.isFavorite(product.value.id) : false)

// 初始化/重置商品规格
function resetSelection() {
  if (product.value) {
    selectedColor.value = product.value.specs.colors[0]
    selectedSize.value = product.value.specs.sizes[0]
    quantity.value = 1
    currentImageIndex.value = 0
  }
}

resetSelection()

// 监听商品切换：重置规格、数量、图片索引，并记录浏览历史
watch(productId, (newId) => {
  if (newId) {
    resetSelection()
    historyStore.addHistory(newId)
  }
}, { immediate: true })

function goBack() {
  router.back()
}

function toggleFavorite() {
  if (!product.value) return
  favoriteStore.toggleFavorite(product.value.id)
  showToast(isFav.value ? '已收藏' : '取消收藏', isFav.value ? 'success' : 'info')
}

function openSpecModal(action: 'cart' | 'buy') {
  specAction.value = action
  showSpecModal.value = true
}

function closeSpecModal() {
  showSpecModal.value = false
}

function handleSpecConfirm() {
  if (!product.value) return
  if (specAction.value === 'cart') {
    cartStore.addToCart({
      productId: product.value.id,
      name: product.value.name,
      price: product.value.price,
      image: product.value.image,
      color: selectedColor.value,
      size: selectedSize.value,
      quantity: quantity.value,
    })
    showToast('已加入购物车', 'success')
    showSpecModal.value = false
  } else {
    cartStore.addToCart({
      productId: product.value.id,
      name: product.value.name,
      price: product.value.price,
      image: product.value.image,
      color: selectedColor.value,
      size: selectedSize.value,
      quantity: quantity.value,
    })
    showSpecModal.value = false
    router.push('/cart')
  }
}
</script>

<template>
  <div class="detail-page" v-if="product">
    <div class="detail-header">
      <button class="back-btn" @click="goBack"><ArrowLeft :size="22" /></button>
      <span class="header-title">商品详情</span>
      <div class="header-actions">
        <button class="action-btn" @click="toggleFavorite">
          <Heart :size="22" :fill="isFav ? '#FF6B35' : 'none'" :color="isFav ? '#FF6B35' : '#333'" />
        </button>
        <button class="action-btn" @click="router.push('/cart')">
          <ShoppingCart :size="22" />
          <span v-if="cartStore.cartCount > 0" class="cart-badge">{{ cartStore.cartCount }}</span>
        </button>
      </div>
    </div>

    <div class="image-carousel">
      <div class="image-track">
        <img v-for="(img, idx) in product.images" :key="idx" :src="img" :alt="product.name" class="carousel-image" :class="{ active: currentImageIndex === idx }" @click="currentImageIndex = (currentImageIndex + 1) % product.images.length" />
      </div>
      <div class="image-dots" v-if="product.images.length > 1">
        <span v-for="(_, idx) in product.images" :key="idx" class="img-dot" :class="{ active: currentImageIndex === idx }"></span>
      </div>
      <span class="image-counter">{{ currentImageIndex + 1 }}/{{ product.images.length }}</span>
    </div>

    <div class="detail-info animate-fade-in">
      <div class="price-row">
        <span class="detail-price">&#165;{{ product.price.toFixed(1) }}</span>
        <span class="detail-original-price">&#165;{{ product.originalPrice.toFixed(1) }}</span>
        <span class="discount-tag">{{ Math.round((1 - product.price / product.originalPrice) * 100) }}%OFF</span>
      </div>
      <h1 class="detail-name">{{ product.name }}</h1>
      <div class="detail-tags">
        <span v-for="tag in product.tags" :key="tag" class="detail-tag">{{ tag }}</span>
      </div>
      <p class="detail-desc">{{ product.description }}</p>
      <div class="detail-stats">
        <span class="stat-item">销量 {{ product.sales }} 件</span>
        <span class="stat-item">{{ product.reviews.length }} 条评论</span>
        <span class="stat-item">收藏 {{ favoriteStore.count }} 人</span>
      </div>
    </div>

    <div class="spec-entry" @click="openSpecModal('cart')">
      <span class="spec-label">已选</span>
      <span class="spec-value">{{ selectedColor }} / {{ selectedSize }} / {{ quantity }}件</span>
      <ChevronRight :size="16" color="#999" />
    </div>

    <div class="review-section">
      <div class="review-header">
        <h3 class="review-title">用户评价 ({{ product.reviews.length }})</h3>
        <div class="review-score">
          <Star :size="14" color="#FFB800" fill="#FFB800" />
          <span>{{ product.reviews.length > 0 ? (product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length).toFixed(1) : '0.0' }}</span>
        </div>
      </div>
      <div class="review-list">
        <div v-for="review in product.reviews.slice(0, 3)" :key="review.id" class="review-item">
          <div class="review-user">
            <div class="review-avatar">{{ review.username[0] }}</div>
            <div class="review-user-info">
              <span class="review-username">{{ review.username }}</span>
              <div class="review-stars">
                <Star v-for="i in 5" :key="i" :size="12" :color="i <= review.rating ? '#FFB800' : '#ddd'" :fill="i <= review.rating ? '#FFB800' : 'none'" />
              </div>
            </div>
            <span class="review-time">{{ review.time }}</span>
          </div>
          <p class="review-content">{{ review.content }}</p>
        </div>
      </div>
    </div>

    <div class="detail-footer">
      <button class="footer-icon-btn" @click="toggleFavorite">
        <Heart :size="22" :fill="isFav ? '#FF6B35' : 'none'" :color="isFav ? '#FF6B35' : '#666'" />
        <span>收藏</span>
      </button>
      <button class="btn-add-cart" @click="openSpecModal('cart')">加入购物车</button>
      <button class="btn-buy-now" @click="openSpecModal('buy')">立即购买</button>
    </div>

    <Transition name="slide-up">
      <div v-if="showSpecModal" class="spec-overlay" @click.self="closeSpecModal">
        <div class="spec-modal">
          <div class="spec-modal-header">
            <img :src="product.image" class="spec-modal-image" />
            <div class="spec-modal-info">
              <span class="spec-modal-price">&#165;{{ product.price.toFixed(1) }}</span>
              <span class="spec-modal-stock">有货</span>
              <span class="spec-modal-selected">已选 {{ selectedColor }} / {{ selectedSize }}</span>
            </div>
            <button class="spec-close" @click="closeSpecModal">&#10005;</button>
          </div>
          <div class="spec-modal-body">
            <div class="spec-group">
              <h3 class="spec-title">颜色</h3>
              <div class="spec-options">
                <span v-for="color in product.specs.colors" :key="color" class="spec-tag" :class="{ active: selectedColor === color }" @click="selectedColor = color">{{ color }}</span>
              </div>
            </div>
            <div class="spec-group">
              <h3 class="spec-title">尺寸</h3>
              <div class="spec-options">
                <span v-for="size in product.specs.sizes" :key="size" class="spec-tag" :class="{ active: selectedSize === size }" @click="selectedSize = size">{{ size }}</span>
              </div>
            </div>
            <div class="spec-group">
              <h3 class="spec-title">数量</h3>
              <div class="quantity-control">
                <button class="qty-btn" @click="quantity > 1 && quantity--">&#8722;</button>
                <span class="qty-value">{{ quantity }}</span>
                <button class="qty-btn" @click="quantity++">+</button>
              </div>
            </div>
          </div>
          <button class="spec-confirm-btn" @click="handleSpecConfirm">
            {{ specAction === 'cart' ? '加入购物车' : '立即购买' }}
          </button>
        </div>
      </div>
    </Transition>
  </div>

  <div v-else class="not-found">
    <div class="not-found-icon">&#128533;</div>
    <p>商品不存在</p>
    <button @click="router.push('/')">返回首页</button>
  </div>
</template>

<style scoped>
.detail-page {
  padding-bottom: 70px;
  background: #f5f5f7;
}

.detail-header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #fff;
  z-index: 10;
  border-bottom: 1px solid #f0f0f0;
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

.header-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  padding: 4px;
  position: relative;
}

.cart-badge {
  position: absolute;
  top: -4px;
  right: -8px;
  background: #FF6B35;
  color: #fff;
  font-size: 10px;
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-carousel {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: #fff;
}

.image-track {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.carousel-image.active {
  opacity: 1;
}

.image-dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
}

.img-dot {
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: rgba(255,255,255,0.5);
  transition: all 0.3s;
}

.img-dot.active {
  width: 16px;
  background: #fff;
}

.image-counter {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(0,0,0,0.4);
  color: #fff;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
}

.detail-info {
  background: #fff;
  padding: 16px;
  margin-bottom: 10px;
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 10px;
}

.detail-price {
  font-size: 26px;
  font-weight: 700;
  color: #FF6B35;
}

.detail-original-price {
  font-size: 14px;
  color: #ccc;
  text-decoration: line-through;
}

.discount-tag {
  background: #FFF0E8;
  color: #FF6B35;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.detail-name {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 8px;
  line-height: 1.4;
}

.detail-tags {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
}

.detail-tag {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  background: #FFF0E8;
  color: #FF6B35;
  font-weight: 500;
}

.detail-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 10px;
}

.detail-stats {
  display: flex;
  gap: 16px;
}

.stat-item {
  font-size: 12px;
  color: #999;
}

.spec-entry {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  padding: 14px 16px;
  margin-bottom: 10px;
  cursor: pointer;
}

.spec-label {
  font-size: 13px;
  color: #999;
}

.spec-value {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.review-section {
  background: #fff;
  padding: 16px;
  margin-bottom: 10px;
}

.review-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.review-title {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
}

.review-score {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #FFB800;
}

.review-item {
  padding: 10px 0;
  border-top: 1px solid #f5f5f7;
}

.review-user {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.review-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF6B35, #FF8F5E);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.review-user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.review-username {
  font-size: 13px;
  font-weight: 500;
  color: #333;
}

.review-stars {
  display: flex;
  gap: 1px;
}

.review-time {
  font-size: 11px;
  color: #bbb;
}

.review-content {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  margin: 0;
}

.detail-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  max-width: 480px;
  margin: 0 auto;
  z-index: 100;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  padding: 6px 0;
}

.footer-icon-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 4px 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 10px;
  color: #666;
}

.btn-add-cart {
  flex: 1;
  padding: 12px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  background: #FF8F5E;
  color: #fff;
  border-radius: 24px 0 0 24px;
}

.btn-buy-now {
  flex: 1;
  padding: 12px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(135deg, #FF6B35, #FF5A1F);
  color: #fff;
  border-radius: 0 24px 24px 0;
}

.spec-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.spec-modal {
  background: #fff;
  width: 100%;
  max-width: 480px;
  border-radius: 16px 16px 0 0;
  max-height: 80vh;
  overflow-y: auto;
}

.spec-modal-header {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}

.spec-modal-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}

.spec-modal-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.spec-modal-price {
  font-size: 20px;
  font-weight: 700;
  color: #FF6B35;
}

.spec-modal-stock {
  font-size: 12px;
  color: #4CAF50;
}

.spec-modal-selected {
  font-size: 12px;
  color: #999;
}

.spec-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #f5f5f7;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spec-modal-body {
  padding: 16px;
}

.spec-group {
  margin-bottom: 20px;
}

.spec-group:last-child {
  margin-bottom: 0;
}

.spec-title {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 10px;
}

.spec-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.spec-tag {
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 13px;
  background: #f5f5f7;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  border: 1.5px solid transparent;
}

.spec-tag.active {
  background: #FFF0E8;
  color: #FF6B35;
  border-color: #FF6B35;
}

.quantity-control {
  display: flex;
  align-items: center;
}

.qty-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background: #f5f5f7;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
}

.qty-btn:first-child {
  border-radius: 6px 0 0 6px;
}

.qty-btn:last-child {
  border-radius: 0 6px 6px 0;
}

.qty-value {
  width: 48px;
  height: 32px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}

.spec-confirm-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #FF6B35, #FF5A1F);
  color: #fff;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.slide-up-enter-active {
  animation: slideUp 0.3s ease-out;
}

.slide-up-leave-active {
  animation: slideUp 0.3s ease-in reverse;
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #999;
  gap: 12px;
}

.not-found-icon {
  font-size: 48px;
}

.not-found button {
  padding: 8px 24px;
  background: #FF6B35;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
}

@media (min-width: 768px) {
  .detail-page { padding-bottom: 40px; }
  .detail-info { padding: 20px 24px; }
  .detail-price { font-size: 30px; }
  .detail-name { font-size: 22px; }
  .spec-entry { padding: 16px 24px; }
  .review-section { padding: 20px 24px; }
  .detail-footer {
    max-width: 100%;
  }
  .btn-add-cart:hover {
    background: #FF7E4A;
  }
  .btn-buy-now:hover {
    box-shadow: 0 4px 16px rgba(255, 107, 53, 0.4);
  }
  .spec-tag:hover {
    border-color: #FF6B35;
    color: #FF6B35;
  }
  .spec-modal { max-width: 500px; margin: 0 auto; }
}
</style>
