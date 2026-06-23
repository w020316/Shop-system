<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { categories, categoryIcons } from '@/data/products'

const router = useRouter()
const productStore = useProductStore()

const activeCategory = ref('服装')
const categoryList = computed(() => categories.filter(c => c !== '全部'))

const productsInCategory = computed(() =>
  productStore.allProducts.filter(p => p.category === activeCategory.value)
)

function selectCategory(cat: string) {
  activeCategory.value = cat
}

function goToDetail(id: number) {
  router.push(`/product/${id}`)
}
</script>

<template>
  <div class="category-page">
    <div class="category-header">
      <h1 class="page-title">商品分类</h1>
    </div>
    <div class="category-body">
      <!-- 左侧分类列表 -->
      <div class="category-sidebar">
        <div
          v-for="cat in categoryList"
          :key="cat"
          class="sidebar-item"
          :class="{ active: activeCategory === cat }"
          @click="selectCategory(cat)"
        >
          <span class="sidebar-icon">{{ categoryIcons[cat] || '📦' }}</span>
          <span class="sidebar-name">{{ cat }}</span>
        </div>
      </div>
      <!-- 右侧商品列表 -->
      <div class="category-content">
        <div class="content-header">
          <span class="content-title">{{ activeCategory }}</span>
          <span class="content-count">{{ productsInCategory.length }}件商品</span>
        </div>
        <div class="product-list">
          <div
            v-for="product in productsInCategory"
            :key="product.id"
            class="product-item"
            @click="goToDetail(product.id)"
          >
            <img :src="product.image" :alt="product.name" class="product-image" loading="lazy" />
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-desc">{{ product.description }}</p>
              <div class="product-bottom">
                <span class="product-price">&#165;{{ product.price.toFixed(1) }}</span>
                <span class="product-original-price">&#165;{{ product.originalPrice.toFixed(1) }}</span>
              </div>
              <div class="product-tags">
                <span v-for="tag in product.tags" :key="tag" class="product-tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="productsInCategory.length === 0" class="empty-tip">
          该分类暂无商品
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-page {
  min-height: 100vh;
  background: #f5f5f7;
  padding-bottom: 70px;
}

.category-header {
  background: #fff;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.page-title {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.category-body {
  display: flex;
  height: calc(100vh - 120px);
}

.category-sidebar {
  width: 88px;
  background: #f5f5f7;
  overflow-y: auto;
  flex-shrink: 0;
}

.sidebar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 14px 8px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.sidebar-item.active {
  background: #fff;
}

.sidebar-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  border-radius: 0 3px 3px 0;
  background: #FF6B35;
}

.sidebar-icon {
  font-size: 20px;
}

.sidebar-name {
  font-size: 12px;
  color: #666;
}

.sidebar-item.active .sidebar-name {
  color: #FF6B35;
  font-weight: 600;
}

.category-content {
  flex: 1;
  background: #fff;
  overflow-y: auto;
  padding: 0 12px;
}

.content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0 10px;
  border-bottom: 1px solid #f5f5f7;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 5;
}

.content-title {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a2e;
}

.content-count {
  font-size: 12px;
  color: #999;
}

.product-list {
  padding: 8px 0;
}

.product-item {
  display: flex;
  gap: 10px;
  padding: 12px 0;
  border-bottom: 1px solid #f8f8f8;
  cursor: pointer;
}

.product-item:active {
  background: #fafafa;
}

.product-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.product-info {
  flex: 1;
  min-width: 0;
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
  font-size: 12px;
  color: #999;
  margin: 0 0 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-bottom {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 4px;
}

.product-price {
  font-size: 16px;
  font-weight: 700;
  color: #FF6B35;
}

.product-original-price {
  font-size: 11px;
  color: #ccc;
  text-decoration: line-through;
}

.product-tags {
  display: flex;
  gap: 4px;
}

.product-tag {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 3px;
  background: #FFF0E8;
  color: #FF6B35;
}

.empty-tip {
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 14px;
}

@media (min-width: 768px) {
  .category-page { padding-bottom: 40px; }
  .category-body { height: auto; }
  .category-sidebar { width: 120px; }
  .sidebar-item { padding: 18px 12px; }
  .sidebar-icon { font-size: 24px; }
  .sidebar-name { font-size: 13px; }
  .category-content { padding: 0 20px; }
  .product-item { padding: 16px 0; }
  .product-image { width: 100px; height: 100px; }
}
@media (min-width: 1024px) {
  .category-sidebar { width: 140px; }
  .product-image { width: 120px; height: 120px; }
}
</style>