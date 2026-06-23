<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft, Package } from 'lucide-vue-next'
import { useOrderStore } from '@/stores/order'

const router = useRouter()
const route = useRoute()
const orderStore = useOrderStore()

const activeTab = ref((route.query.status as string) || 'all')

const tabs = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待付款' },
  { key: 'paid', label: '待发货' },
  { key: 'shipped', label: '待收货' },
  { key: 'completed', label: '已完成' },
]

const filteredOrders = computed(() => {
  if (activeTab.value === 'all') return orderStore.orders
  return orderStore.orders.filter(o => o.status === activeTab.value)
})

function goBack() {
  router.back()
}

const statusMap: Record<string, string> = {
  pending: '待付款',
  paid: '待发货',
  shipped: '待收货',
  completed: '已完成',
  cancelled: '已取消'
}

const statusColorMap: Record<string, string> = {
  pending: '#FF6B35',
  paid: '#2196F3',
  shipped: '#4CAF50',
  completed: '#999',
  cancelled: '#999'
}

function handlePay(orderId: string) {
  orderStore.payOrder(orderId)
}

function handleConfirm(orderId: string) {
  orderStore.confirmReceive(orderId)
}

const showCancelDialog = ref(false)
const cancelOrderId = ref('')

function showCancelConfirm(orderId: string) {
  cancelOrderId.value = orderId
  showCancelDialog.value = true
}

function handleCancel() {
  orderStore.cancelOrder(cancelOrderId.value)
  showCancelDialog.value = false
}

function cancelCancel() {
  showCancelDialog.value = false
}
</script>

<template>
  <div class="order-list-page">
    <div class="page-header">
      <button class="back-btn" @click="goBack">
        <ArrowLeft :size="22" />
      </button>
      <span class="header-title">我的订单</span>
      <span></span>
    </div>

    <div class="tab-bar">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-item"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </div>
    </div>

    <div v-if="filteredOrders.length === 0" class="empty-orders">
      <Package :size="48" color="#ddd" />
      <p>暂无订单</p>
      <button class="go-shop-btn" @click="router.push('/')">去购物</button>
    </div>

    <div v-else class="order-list">
      <div v-for="order in filteredOrders" :key="order.id" class="order-card animate-fade-in" @click="router.push('/order/' + order.id)">
        <div class="order-header">
          <span class="order-id">{{ order.id }}</span>
          <span class="order-status" :style="{ color: statusColorMap[order.status] }">
            {{ statusMap[order.status] }}
          </span>
        </div>

        <div class="order-progress" v-if="order.status !== 'cancelled'">
          <div class="progress-step" :class="{ done: ['paid','shipped','completed'].includes(order.status) }">
            <div class="step-dot"></div>
            <span>下单</span>
          </div>
          <div class="progress-line" :class="{ done: ['paid','shipped','completed'].includes(order.status) }"></div>
          <div class="progress-step" :class="{ done: ['shipped','completed'].includes(order.status) }">
            <div class="step-dot"></div>
            <span>付款</span>
          </div>
          <div class="progress-line" :class="{ done: ['shipped','completed'].includes(order.status) }"></div>
          <div class="progress-step" :class="{ done: order.status === 'completed' }">
            <div class="step-dot"></div>
            <span>完成</span>
          </div>
        </div>

        <div v-for="item in order.items" :key="item.productId + item.color + item.size" class="order-item">
          <img :src="item.image" :alt="item.name" class="order-item-image" />
          <div class="order-item-info">
            <h3 class="order-item-name">{{ item.name }}</h3>
            <p class="order-item-spec">{{ item.color }} / {{ item.size }}</p>
          </div>
          <div class="order-item-right">
            <span class="order-item-price">&#165;{{ item.price.toFixed(1) }}</span>
            <span class="order-item-qty">x{{ item.quantity }}</span>
          </div>
        </div>

        <div class="order-footer">
          <div class="order-meta">
            <span class="order-time">{{ order.createTime }}</span>
            <span class="order-total">
              共{{ order.items.reduce((s, i) => s + i.quantity, 0) }}件 合计：
              <span class="order-total-price">&#165;{{ order.totalPrice.toFixed(2) }}</span>
            </span>
          </div>
          <div class="order-actions">
            <button v-if="order.status === 'pending'" class="order-btn cancel" @click.stop="showCancelConfirm(order.id)">
              取消订单
            </button>
            <button v-if="order.status === 'pending'" class="order-btn pay" @click.stop="handlePay(order.id)">
              去支付
            </button>
            <button v-if="order.status === 'shipped'" class="order-btn confirm" @click.stop="handleConfirm(order.id)">
              确认收货
            </button>
          </div>
        </div>
      </div>
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
</template>
<style scoped>
.order-list-page {
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
.tab-bar {
  display: flex;
  background: #fff;
  padding: 0 8px;
  border-bottom: 1px solid #f0f0f0;
}
.tab-item {
  flex: 1;
  text-align: center;
  padding: 12px 4px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
}
.tab-item.active {
  color: #FF6B35;
  font-weight: 600;
}
.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  border-radius: 2px;
  background: #FF6B35;
}
.empty-orders {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  gap: 12px;
}
.empty-orders p {
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
.order-list {
  padding: 10px 12px;
}
.order-card {
  background: #fff;
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 10px;
}
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #f5f5f7;
}
.order-id {
  font-size: 12px;
  color: #999;
}
.order-status {
  font-size: 13px;
  font-weight: 600;
}
.order-progress {
  display: flex;
  align-items: center;
  padding: 8px 0 4px;
  margin-bottom: 4px;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  color: #ccc;
}

.progress-step.done {
  color: #FF6B35;
}

.step-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ddd;
  transition: background 0.3s;
}

.progress-step.done .step-dot {
  background: #FF6B35;
}

.progress-line {
  flex: 1;
  height: 2px;
  background: #eee;
  margin: 0 4px;
  margin-bottom: 16px;
  transition: background 0.3s;
}

.progress-line.done {
  background: #FF6B35;
}

.order-item {
  display: flex;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #f8f8f8;
}
.order-item:last-of-type {
  border-bottom: none;
}
.order-item-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}
.order-item-info {
  flex: 1;
  min-width: 0;
}
.order-item-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.order-item-spec {
  font-size: 12px;
  color: #999;
  margin: 0;
}
.order-item-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}
.order-item-price {
  font-size: 14px;
  font-weight: 600;
  color: #FF6B35;
}
.order-item-qty {
  font-size: 12px;
  color: #999;
}
.order-footer {
  padding-top: 10px;
  border-top: 1px solid #f5f5f7;
}
.order-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.order-time {
  font-size: 12px;
  color: #bbb;
}
.order-total {
  font-size: 13px;
  color: #666;
}
.order-total-price {
  font-weight: 700;
  color: #FF6B35;
}
.order-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.order-btn {
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
}
.order-btn.pay {
  background: #FF6B35;
  color: #fff;
}
.order-btn.confirm {
  background: #4CAF50;
  color: #fff;
}
.order-btn.cancel {
  background: #fff;
  color: #999;
  border: 1px solid #ddd;
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
  .order-list-page { padding-bottom: 40px; }
  .order-card {
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .order-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
  .order-btn:hover {
    opacity: 0.9;
  }
}
</style>