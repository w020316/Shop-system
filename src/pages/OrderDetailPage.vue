<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, MapPin, Package } from 'lucide-vue-next'
import { useOrderStore } from '@/stores/order'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()

const orderId = route.params.id as string
const order = computed(() => orderStore.orders.find(o => o.id === orderId))

const statusMap: Record<string, string> = {
  pending: '待付款',
  paid: '待发货',
  shipped: '运输中',
  completed: '已完成',
  cancelled: '已取消'
}

const statusDescMap: Record<string, string> = {
  pending: '请尽快完成支付，超时订单将自动取消',
  paid: '商家正在为您准备商品，请耐心等待',
  shipped: '商品正在配送中，请注意查收',
  completed: '订单已完成，感谢您的购买',
  cancelled: '订单已取消'
}

const statusColorMap: Record<string, string> = {
  pending: '#FF6B35',
  paid: '#2196F3',
  shipped: '#4CAF50',
  completed: '#999',
  cancelled: '#999'
}

function goBack() {
  router.back()
}

function handlePay() {
  if (!order.value) return
  orderStore.payOrder(order.value.id)
}

function handleConfirm() {
  if (!order.value) return
  orderStore.confirmReceive(order.value.id)
}

const showCancelDialog = ref(false)

function showCancelConfirm() {
  showCancelDialog.value = true
}

function handleCancel() {
  if (!order.value) return
  orderStore.cancelOrder(order.value.id)
  showCancelDialog.value = false
}

function cancelCancel() {
  showCancelDialog.value = false
}
</script>
<template>
  <div class="order-detail-page" v-if="order">
    <div class="page-header">
      <button class="back-btn" @click="goBack">
        <ArrowLeft :size="22" />
      </button>
      <span class="header-title">订单详情</span>
      <span></span>
    </div>

    <div class="status-card" :style="{ background: `linear-gradient(135deg, ${statusColorMap[order.status]}, ${statusColorMap[order.status]}dd)` }">
      <div class="status-icon">
        <Package :size="28" color="#fff" />
      </div>
      <div class="status-info">
        <h2 class="status-text">{{ statusMap[order.status] }}</h2>
        <p class="status-desc">{{ statusDescMap[order.status] }}</p>
      </div>
    </div>

    <div class="address-card">
      <MapPin :size="18" color="#FF6B35" />
      <div class="address-info">
        <p class="address-detail">{{ order.address }}</p>
      </div>
    </div>

    <div class="goods-section">
      <div v-for="item in order.items" :key="item.productId + item.color + item.size" class="goods-item">
        <img :src="item.image" :alt="item.name" class="goods-image" />
        <div class="goods-info">
          <h3 class="goods-name">{{ item.name }}</h3>
          <p class="goods-spec">{{ item.color }} / {{ item.size }}</p>
        </div>
        <div class="goods-right">
          <span class="goods-price">&#165;{{ item.price.toFixed(1) }}</span>
          <span class="goods-qty">x{{ item.quantity }}</span>
        </div>
      </div>
    </div>

    <div class="info-section">
      <div class="info-row">
        <span class="info-label">订单编号</span>
        <span class="info-value">{{ order.id }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">下单时间</span>
        <span class="info-value">{{ order.createTime }}</span>
      </div>
      <div v-if="order.payTime" class="info-row">
        <span class="info-label">支付时间</span>
        <span class="info-value">{{ order.payTime }}</span>
      </div>
      <div v-if="order.shipTime" class="info-row">
        <span class="info-label">发货时间</span>
        <span class="info-value">{{ order.shipTime }}</span>
      </div>
      <div v-if="order.completeTime" class="info-row">
        <span class="info-label">完成时间</span>
        <span class="info-value">{{ order.completeTime }}</span>
      </div>
      <div v-if="order.cancelTime" class="info-row">
        <span class="info-label">取消时间</span>
        <span class="info-value">{{ order.cancelTime }}</span>
      </div>
      <div class="info-row total">
        <span class="info-label">订单金额</span>
        <span class="info-value price">&#165;{{ order.totalPrice.toFixed(2) }}</span>
      </div>
    </div>

    <div class="action-bar" v-if="order.status === 'pending' || order.status === 'shipped'">
      <button v-if="order.status === 'pending'" class="action-btn cancel" @click="showCancelConfirm">取消订单</button>
      <button v-if="order.status === 'pending'" class="action-btn pay" @click="handlePay">去支付</button>
      <button v-if="order.status === 'shipped'" class="action-btn confirm" @click="handleConfirm">确认收货</button>
    </div>

    <Transition name="overlay">
      <div v-if="showCancelDialog" class="dialog-overlay" @click.self="cancelCancel">
        <div class="dialog-content">
          <h3 class="dialog-title">确认取消</h3>
          <p class="dialog-msg">确定要取消该订单吗？</p>
          <div class="dialog-actions">
            <button class="dialog-btn cancel" @click="cancelCancel">再想想</button>
            <button class="dialog-btn confirm" @click="handleCancel">确定取消</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>

  <div v-else class="not-found">
    <p>订单不存在</p>
    <button @click="router.push('/orders')">返回订单列表</button>
  </div>
</template>
<style scoped>
.order-detail-page {
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
.status-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
  margin: 10px;
  border-radius: 12px;
  color: #fff;
}
.status-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.status-text {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 4px;
}
.status-desc {
  font-size: 13px;
  opacity: 0.9;
  margin: 0;
}
.address-card {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: #fff;
  padding: 14px 16px;
  margin: 0 0 10px;
}
.address-info {
  flex: 1;
}
.address-detail {
  font-size: 14px;
  color: #333;
  margin: 0;
  line-height: 1.5;
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
  width: 60px;
  height: 60px;
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
  margin: 0;
}
.goods-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}
.goods-price {
  font-size: 14px;
  font-weight: 600;
  color: #FF6B35;
}
.goods-qty {
  font-size: 12px;
  color: #999;
}
.info-section {
  background: #fff;
  padding: 14px 16px;
}
.info-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
}
.info-label {
  color: #999;
}
.info-value {
  color: #333;
}
.info-row.total {
  border-top: 1px solid #f0f0f0;
  margin-top: 4px;
  padding-top: 12px;
}
.info-value.price {
  font-size: 18px;
  font-weight: 700;
  color: #FF6B35;
}
.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 16px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  max-width: 480px;
  margin: 0 auto;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.action-btn {
  padding: 10px 24px;
  border-radius: 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: none;
}
.action-btn.pay {
  background: #FF6B35;
  color: #fff;
}
.action-btn.confirm {
  background: #4CAF50;
  color: #fff;
}
.action-btn.cancel {
  background: #fff;
  color: #999;
  border: 1px solid #ddd;
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
.not-found button {
  padding: 8px 24px;
  background: #FF6B35;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
}
.dialog-overlay {
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
.dialog-content {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  width: 280px;
  text-align: center;
}
.dialog-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 8px;
}
.dialog-msg {
  font-size: 14px;
  color: #666;
  margin: 0 0 20px;
}
.dialog-actions {
  display: flex;
  gap: 12px;
}
.dialog-btn {
  flex: 1;
  padding: 10px 0;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
}
.dialog-btn.cancel {
  background: #f5f5f5;
  color: #666;
}
.dialog-btn.confirm {
  background: #FF6B35;
  color: #fff;
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
  .order-detail-page { padding-bottom: 40px; }
  .action-bar { max-width: 100%; }
}
</style>