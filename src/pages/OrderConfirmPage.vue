<script setup lang="ts">
import { ref, computed, inject, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, MapPin, ChevronRight, Plus } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/order'
import { useUserStore } from '@/stores/user'
import { useAddressStore } from '@/stores/address'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()
const userStore = useUserStore()
const addressStore = useAddressStore()
const showToast = inject<(msg: string, type?: 'success' | 'error' | 'info') => void>('showToast')!

const selectedAddressId = ref<string>(addressStore.defaultAddress?.id || '')
const showPaySuccess = ref(false)
let payTimer: ReturnType<typeof setTimeout> | null = null

const selectedAddress = computed(() => {
  if (!selectedAddressId.value) return addressStore.defaultAddress
  return addressStore.addresses.find(a => a.id === selectedAddressId.value) || addressStore.defaultAddress
})

const fullAddress = computed(() => {
  if (!selectedAddress.value) return ''
  const a = selectedAddress.value
  return a.province + a.city + a.district + a.detail
})

function goBack() {
  router.back()
}

function goToAddressList() {
  router.push('/address?select=1')
}

function goToAddAddress() {
  router.push('/address/edit')
}

function handleSubmit() {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }

  if (!selectedAddress.value) {
    showToast('请先添加收货地址', 'error')
    return
  }

  const order = orderStore.createOrder(cartStore.checkedItems, fullAddress.value)
  cartStore.clearChecked()

  showPaySuccess.value = true
  payTimer = setTimeout(() => {
    orderStore.payOrder(order.id)
    showPaySuccess.value = false
    showToast('支付成功！', 'success')
    router.push('/orders')
  }, 1500)
}

onUnmounted(() => {
  if (payTimer) {
    clearTimeout(payTimer)
    payTimer = null
  }
})
</script>
<template>
  <div class="order-confirm-page">
    <div class="page-header">
      <button class="back-btn" @click="goBack">
        <ArrowLeft :size="22" />
      </button>
      <span class="header-title">确认订单</span>
      <span></span>
    </div>

    <div v-if="selectedAddress" class="address-card" @click="goToAddressList">
      <MapPin :size="20" color="#FF6B35" />
      <div class="address-info">
        <div class="address-user">
          <span class="user-name">{{ selectedAddress.name }}</span>
          <span class="user-phone">{{ selectedAddress.phone }}</span>
        </div>
        <p class="address-detail">{{ fullAddress }}</p>
      </div>
      <ChevronRight :size="16" color="#ccc" />
    </div>
    <div v-else class="address-card empty-address" @click="goToAddAddress">
      <MapPin :size="20" color="#ccc" />
      <div class="address-info">
        <p class="add-address-prompt">请添加收货地址</p>
      </div>
      <Plus :size="18" color="#FF6B35" />
    </div>

    <div class="goods-section">
      <div v-for="item in cartStore.checkedItems" :key="item.productId + item.color + item.size" class="goods-item">
        <img :src="item.image" :alt="item.name" class="goods-image" />
        <div class="goods-info">
          <h3 class="goods-name">{{ item.name }}</h3>
          <p class="goods-spec">{{ item.color }} / {{ item.size }}</p>
          <div class="goods-bottom">
            <span class="goods-price">&#165;{{ item.price.toFixed(1) }}</span>
            <span class="goods-qty">x{{ item.quantity }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="amount-section">
      <div class="amount-row">
        <span>商品金额</span>
        <span>&#165;{{ cartStore.totalPrice.toFixed(2) }}</span>
      </div>
      <div class="amount-row">
        <span>运费</span>
        <span class="free-shipping">免运费</span>
      </div>
      <div class="amount-row total">
        <span>合计</span>
        <span class="total-amount">&#165;{{ cartStore.totalPrice.toFixed(2) }}</span>
      </div>
    </div>

    <div class="pay-footer">
      <div class="pay-info">
        <span>实付：</span>
        <span class="pay-amount">&#165;{{ cartStore.totalPrice.toFixed(2) }}</span>
      </div>
      <button class="pay-btn" @click="handleSubmit">提交订单</button>
    </div>

    <Transition name="overlay">
      <div v-if="showPaySuccess" class="pay-success-overlay">
        <div class="pay-success-content animate-fade-in-up">
          <div class="success-icon-wrapper">
            <div class="success-icon">&#10003;</div>
          </div>
          <p class="success-text">支付成功</p>
          <p class="success-sub">正在跳转到订单页面...</p>
        </div>
      </div>
    </Transition>
  </div>
</template>
<style scoped>
.order-confirm-page {
  min-height: 100vh;
  background: #f5f5f7;
  padding-bottom: 80px;
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
.address-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: #fff;
  padding: 16px;
  margin: 10px 0;
  cursor: pointer;
}
.address-card.empty-address {
  align-items: center;
}
.address-info {
  flex: 1;
}
.address-user {
  display: flex;
  gap: 12px;
  margin-bottom: 4px;
}
.user-name {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
}
.user-phone {
  font-size: 14px;
  color: #666;
}
.address-detail {
  font-size: 13px;
  color: #666;
  margin: 0;
  line-height: 1.5;
}
.add-address-prompt {
  font-size: 14px;
  color: #999;
  margin: 0;
}
.goods-section {
  background: #fff;
  padding: 0 16px;
  margin-bottom: 10px;
}
.goods-item {
  display: flex;
  gap: 10px;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f7;
}
.goods-item:last-child {
  border-bottom: none;
}
.goods-image {
  width: 70px;
  height: 70px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}
.goods-info {
  flex: 1;
  min-width: 0;
}
.goods-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 4px;
}
.goods-spec {
  font-size: 12px;
  color: #999;
  margin: 0 0 6px;
}
.goods-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.goods-price {
  font-size: 15px;
  font-weight: 700;
  color: #FF6B35;
}
.goods-qty {
  font-size: 13px;
  color: #999;
}
.amount-section {
  background: #fff;
  padding: 16px;
}
.amount-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
  padding: 6px 0;
}
.free-shipping {
  color: #4CAF50;
  font-weight: 500;
}
.amount-row.total {
  border-top: 1px solid #f0f0f0;
  margin-top: 6px;
  padding-top: 12px;
  font-weight: 600;
  color: #1a1a2e;
}
.total-amount {
  font-size: 18px;
  font-weight: 700;
  color: #FF6B35;
}
.pay-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  max-width: 480px;
  margin: 0 auto;
  z-index: 100;
}
.pay-info {
  display: flex;
  align-items: baseline;
  gap: 2px;
  font-size: 14px;
  color: #666;
}
.pay-amount {
  font-size: 20px;
  font-weight: 700;
  color: #FF6B35;
}
.pay-btn {
  padding: 12px 32px;
  background: linear-gradient(135deg, #FF6B35, #FF5A1F);
  color: #fff;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
}
.pay-btn:active {
  transform: scale(0.98);
}
.pay-success-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}
.pay-success-content {
  background: #fff;
  border-radius: 20px;
  padding: 40px 48px;
  text-align: center;
}
.success-icon-wrapper {
  margin-bottom: 16px;
}
.success-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4CAF50, #66BB6A);
  color: #fff;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}
.success-text {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 8px;
}
.success-sub {
  font-size: 13px;
  color: #999;
  margin: 0;
}
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.25s;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

@media (min-width: 768px) {
  .order-confirm-page { padding-bottom: 40px; }
  .pay-footer { max-width: 100%; }
}
</style>