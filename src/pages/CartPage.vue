<script setup lang="ts">
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()
const showToast = inject<(msg: string, type?: 'success' | 'error' | 'info') => void>('showToast')!

const showDeleteConfirm = ref(false)
const deleteIndex = ref(-1)
const couponClaimed = ref(false)

function goBack() {
  router.push('/')
}

function goToDetail(id: number) {
  router.push(`/product/${id}`)
}

function confirmDelete(index: number) {
  deleteIndex.value = index
  showDeleteConfirm.value = true
}

function handleDeleteConfirm() {
  if (deleteIndex.value >= 0) {
    cartStore.removeFromCart(deleteIndex.value)
    deleteIndex.value = -1
  }
  showDeleteConfirm.value = false
}

function handleClaimCoupon() {
  if (couponClaimed.value) {
    showToast('优惠券已领取', 'info')
    return
  }
  couponClaimed.value = true
  showToast('优惠券领取成功', 'success')
}

function handleCheckout() {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  if (cartStore.checkedItems.length === 0) return
  router.push('/order/confirm')
}
</script>

<template>
  <div class="cart-page">
    <!-- 头部 -->
    <div class="cart-header">
      <h1 class="cart-title">购物车</h1>
      <span class="cart-count" v-if="cartStore.items.length > 0">({{ cartStore.items.length }}件)</span>
    </div>

    <!-- 空购物车 -->
    <div v-if="cartStore.items.length === 0" class="cart-empty">
      <div class="empty-icon-wrapper">
        <ShoppingCart :size="40" color="#ddd" />
      </div>
      <p class="empty-text">购物车是空的</p>
      <p class="empty-sub">快去挑选喜欢的商品吧</p>
      <button class="go-shop-btn" @click="goBack">去逛逛</button>
    </div>

    <!-- 购物车列表 -->
    <div v-else class="cart-content">
      <div class="cart-list">
        <div
          v-for="(item, index) in cartStore.items"
          :key="index"
          class="cart-item animate-fade-in"
          :style="{ animationDelay: `${index * 0.05}s` }"
        >
          <!-- 复选框 -->
          <div
            class="checkbox"
            :class="{ checked: item.checked }"
            @click="cartStore.toggleCheck(index)"
          >
            <span v-if="item.checked" class="check-mark">&#10003;</span>
          </div>

          <!-- 商品图片 -->
          <div class="item-image-wrapper" @click="goToDetail(item.productId)">
            <img :src="item.image" :alt="item.name" class="item-image" />
          </div>

          <!-- 商品信息 -->
          <div class="item-info">
            <h3 class="item-name" @click="goToDetail(item.productId)">{{ item.name }}</h3>
            <p class="item-spec">{{ item.color }} / {{ item.size }}</p>
            <div class="item-bottom">
              <span class="item-price">&#165;{{ item.price.toFixed(1) }}</span>
              <div class="item-quantity">
                <button class="qty-btn" @click="cartStore.updateQuantity(index, item.quantity - 1)">
                  <Minus :size="14" />
                </button>
                <span class="qty-value">{{ item.quantity }}</span>
                <button class="qty-btn" @click="cartStore.updateQuantity(index, item.quantity + 1)">
                  <Plus :size="14" />
                </button>
              </div>
              <button class="delete-btn" @click="confirmDelete(index)">
                <Trash2 :size="16" color="#ccc" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 优惠券 -->
      <div class="coupon-section" v-if="cartStore.items.length > 0">
        <div class="coupon-card">
          <div class="coupon-left">
            <span class="coupon-amount">¥20</span>
            <span class="coupon-condition">满199可用</span>
          </div>
          <div class="coupon-right">
            <span class="coupon-type">新人优惠券</span>
            <button class="coupon-btn" :class="{ claimed: couponClaimed }" @click="handleClaimCoupon">
              {{ couponClaimed ? '已领取' : '领取' }}
            </button>
          </div>
        </div>
      </div>

      <!-- 优惠提示 -->
      <div class="promo-tip" v-if="cartStore.totalPrice < 99">
        🎁 满99元包邮，还差¥{{ (99 - cartStore.totalPrice).toFixed(0) }}元
      </div>
      <div class="promo-tip reached" v-else>
        🎉 已享包邮优惠
      </div>

      <!-- 底部结算 -->
      <div class="cart-footer">
        <div class="select-all" @click="cartStore.toggleCheckAll()">
          <div class="checkbox" :class="{ checked: cartStore.isAllChecked }">
            <span v-if="cartStore.isAllChecked" class="check-mark">&#10003;</span>
          </div>
          <span>全选</span>
        </div>
        <div class="footer-right">
          <div class="total-info">
            <span class="total-label">合计：</span>
            <span class="total-price">&#165;{{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
          <button
            class="checkout-btn"
            :class="{ disabled: cartStore.checkedItems.length === 0 }"
            @click="handleCheckout"
          >
            结算({{ cartStore.totalCount }})
          </button>
        </div>
      </div>
    </div>

    <!-- 删除确认弹窗 -->
    <ConfirmDialog
      :visible="showDeleteConfirm"
      title="删除商品"
      message="确定要删除这件商品吗？"
      confirmText="删除"
      @confirm="handleDeleteConfirm"
      @cancel="showDeleteConfirm = false"
    />
  </div>
</template>
<style scoped>
.cart-page {
  min-height: 100vh;
  background: #f5f5f7;
  padding-bottom: 130px;
}

.cart-header {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 16px 20px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}

.cart-title {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.cart-count {
  font-size: 14px;
  color: #999;
}

.cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  gap: 8px;
}

.empty-icon-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.empty-text {
  color: #999;
  font-size: 16px;
  margin: 0;
  font-weight: 500;
}

.empty-sub {
  color: #ccc;
  font-size: 13px;
  margin: 0;
}

.go-shop-btn {
  margin-top: 16px;
  padding: 10px 32px;
  background: linear-gradient(135deg, #FF6B35, #FF8F5E);
  color: #fff;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
}

.cart-list {
  padding: 10px 12px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 8px;
}

.checkbox {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s;
}

.checkbox.checked {
  background: #FF6B35;
  border-color: #FF6B35;
}

.check-mark {
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

.item-image-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  cursor: pointer;
}

.item-spec {
  font-size: 12px;
  color: #999;
  margin: 0 0 8px;
}

.item-bottom {
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-price {
  font-size: 16px;
  font-weight: 700;
  color: #FF6B35;
}

.item-quantity {
  display: flex;
  align-items: center;
  margin-left: auto;
}
.qty-btn {
  width: 26px;
  height: 26px;
  border: 1px solid #ddd;
  background: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.qty-btn:active {
  background: #eee;
}

.qty-btn:first-child {
  border-radius: 4px 0 0 4px;
}

.qty-btn:last-child {
  border-radius: 0 4px 4px 0;
}

.qty-value {
  width: 32px;
  height: 26px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.coupon-section {
  padding: 0 12px;
  margin-bottom: 8px;
}

.coupon-card {
  display: flex;
  background: linear-gradient(135deg, #FFF0E8, #FFE8D6);
  border-radius: 10px;
  overflow: hidden;
  border: 1px dashed #FF6B35;
}

.coupon-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-right: 1px dashed #FFB088;
  min-width: 80px;
}

.coupon-amount {
  font-size: 22px;
  font-weight: 700;
  color: #FF6B35;
}

.coupon-condition {
  font-size: 10px;
  color: #FF8F5E;
}

.coupon-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
}

.coupon-type {
  font-size: 13px;
  color: #333;
  font-weight: 500;
}

.coupon-btn {
  background: linear-gradient(135deg, #FF6B35, #FF8F5E);
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 4px 14px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.coupon-btn.claimed {
  background: #ccc;
  cursor: default;
}

.promo-tip {
  text-align: center;
  padding: 10px;
  font-size: 12px;
  color: #FF6B35;
  background: #FFF0E8;
  margin: 0 12px;
  border-radius: 8px;
}

.promo-tip.reached {
  color: #4CAF50;
  background: #E8F5E9;
}

.cart-footer {
  position: fixed;
  bottom: 56px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  max-width: 480px;
  margin: 0 auto;
  z-index: 99;
}

.select-all {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.total-info {
  display: flex;
  align-items: baseline;
}

.total-label {
  font-size: 13px;
  color: #666;
}

.total-price {
  font-size: 18px;
  font-weight: 700;
  color: #FF6B35;
}

.checkout-btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, #FF6B35, #FF5A1F);
  color: #fff;
  border: none;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.checkout-btn.disabled {
  background: #ccc;
  cursor: not-allowed;
}

@media (min-width: 768px) {
  .cart-page { padding-bottom: 40px; }
  .cart-list { padding: 10px 24px; }
  .cart-item {
    padding: 16px;
    transition: box-shadow 0.2s;
  }
  .cart-item:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  }
  .item-image-wrapper { width: 100px; height: 100px; }
  .cart-footer { max-width: 100%; }
  .checkout-btn:hover {
    box-shadow: 0 4px 16px rgba(255, 107, 53, 0.4);
  }
  .promo-tip { margin: 0 24px; }
  .coupon-section { padding: 0 24px; }
}
</style>
