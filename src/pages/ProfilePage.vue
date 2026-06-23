<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronRight, Package, Heart, MapPin, LogOut, User, Edit3, Lock, Clock, Info } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import { useOrderStore } from '@/stores/order'
import { useFavoriteStore } from '@/stores/favorite'
import { useAddressStore } from '@/stores/address'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const router = useRouter()
const userStore = useUserStore()
const orderStore = useOrderStore()
const favoriteStore = useFavoriteStore()
const addressStore = useAddressStore()

const showLogoutConfirm = ref(false)
const showNicknameEdit = ref(false)
const nicknameInput = ref('')

function goToLogin() {
  router.push('/login')
}

function goToOrders(status?: string) {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  if (status) {
    router.push(`/orders?status=${status}`)
  } else {
    router.push('/orders')
  }
}

function goToFavorites() {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  router.push('/favorites')
}

function openNicknameEdit() {
  if (!userStore.currentUser) return
  nicknameInput.value = userStore.currentUser.nickname
  showNicknameEdit.value = true
}

function saveNickname() {
  if (nicknameInput.value.trim()) {
    userStore.updateNickname(nicknameInput.value.trim())
  }
  showNicknameEdit.value = false
}

function handleLogout() {
  showLogoutConfirm.value = true
}

function confirmLogout() {
  userStore.logout()
  showLogoutConfirm.value = false
  router.push('/')
}

const pendingCount = computed(() => orderStore.orders.filter(o => o.status === 'pending').length)
const paidCount = computed(() => orderStore.orders.filter(o => o.status === 'paid').length)
const shippedCount = computed(() => orderStore.orders.filter(o => o.status === 'shipped').length)
</script>
<template>
  <div class="profile-page">
    <!-- 用户信息区域 -->
    <div class="profile-header">
      <div class="user-info" v-if="userStore.isLoggedIn">
        <div class="avatar">
          <User :size="32" color="#fff" />
        </div>
        <div class="user-detail">
          <div class="nickname-row">
            <h2 class="nickname">{{ userStore.currentUser?.nickname }}</h2>
            <button class="edit-btn" @click="openNicknameEdit">
              <Edit3 :size="14" color="rgba(255,255,255,0.8)" />
            </button>
          </div>
          <p class="phone">{{ userStore.currentUser?.phone }}</p>
        </div>
      </div>
      <div class="user-info" v-else @click="goToLogin">
        <div class="avatar avatar-empty">
          <User :size="32" color="#FF6B35" />
        </div>
        <div class="user-detail">
          <h2 class="nickname">点击登录</h2>
          <p class="phone">登录后享受更多服务</p>
        </div>
        <ChevronRight :size="20" color="rgba(255,255,255,0.8)" />
      </div>
    </div>

    <!-- 订单入口 -->
    <div class="section">
      <div class="section-header" @click="goToOrders()">
        <h3 class="section-title">我的订单</h3>
        <div class="section-more">
          <span>全部订单</span>
          <ChevronRight :size="16" color="#999" />
        </div>
      </div>
      <div class="order-status-bar">
        <div class="status-item" @click="goToOrders('pending')">
          <div class="status-icon-wrapper">
            <Package :size="22" color="#FF6B35" />
            <span v-if="pendingCount > 0" class="status-badge">{{ pendingCount }}</span>
          </div>
          <span>待付款</span>
        </div>
        <div class="status-item" @click="goToOrders('paid')">
          <div class="status-icon-wrapper">
            <Package :size="22" color="#FF8F5E" />
          </div>
          <span>待发货</span>
        </div>
        <div class="status-item" @click="goToOrders('shipped')">
          <div class="status-icon-wrapper">
            <Package :size="22" color="#FFB088" />
            <span v-if="shippedCount > 0" class="status-badge">{{ shippedCount }}</span>
          </div>
          <span>待收货</span>
        </div>
        <div class="status-item" @click="goToOrders('completed')">
          <div class="status-icon-wrapper">
            <Package :size="22" color="#FFD4BB" />
          </div>
          <span>已完成</span>
        </div>
      </div>
    </div>

    <!-- 功能列表 -->
    <div class="section">
      <div class="menu-item" @click="goToOrders()">
        <Package :size="20" color="#666" />
        <span class="menu-label">我的订单</span>
        <ChevronRight :size="16" color="#ccc" class="menu-arrow" />
      </div>
      <div class="menu-item" @click="goToFavorites">
        <Heart :size="20" color="#666" />
        <span class="menu-label">我的收藏</span>
        <span v-if="favoriteStore.count > 0" class="menu-badge">{{ favoriteStore.count }}</span>
        <ChevronRight :size="16" color="#ccc" class="menu-arrow" />
      </div>
      <div class="menu-item" @click="router.push('/address')">
        <MapPin :size="20" color="#666" />
        <span class="menu-label">收货地址</span>
        <ChevronRight :size="16" color="#ccc" class="menu-arrow" />
      </div>
      <div class="menu-item" @click="router.push('/admin/products')">
        <Package :size="20" color="#666" />
        <span class="menu-label">商品管理</span>
        <ChevronRight :size="16" color="#ccc" class="menu-arrow" />
      </div>
      <div class="menu-item" @click="router.push('/change-password')">
        <Lock :size="20" color="#666" />
        <span class="menu-label">修改密码</span>
        <ChevronRight :size="16" color="#ccc" class="menu-arrow" />
      </div>
      <div class="menu-item" @click="router.push('/history')">
        <Clock :size="20" color="#666" />
        <span class="menu-label">浏览历史</span>
        <ChevronRight :size="16" color="#ccc" class="menu-arrow" />
      </div>
      <div class="menu-item" @click="router.push('/about')">
        <Info :size="20" color="#666" />
        <span class="menu-label">关于</span>
        <ChevronRight :size="16" color="#ccc" class="menu-arrow" />
      </div>
    </div>

    <!-- 退出登录 -->
    <div class="section" v-if="userStore.isLoggedIn">
      <div class="menu-item logout-item" @click="handleLogout">
        <LogOut :size="20" color="#FF4D4F" />
        <span class="menu-label" style="color: #FF4D4F">退出登录</span>
      </div>
    </div>

    <!-- 退出确认 -->
    <ConfirmDialog
      :visible="showLogoutConfirm"
      title="退出登录"
      message="确定要退出登录吗？"
      @confirm="confirmLogout"
      @cancel="showLogoutConfirm = false"
    />

    <!-- 修改昵称弹窗 -->
    <Transition name="overlay">
      <div v-if="showNicknameEdit" class="nickname-overlay" @click.self="showNicknameEdit = false">
        <div class="nickname-dialog animate-fade-in-up">
          <h3 class="dialog-title">修改昵称</h3>
          <input v-model="nicknameInput" class="dialog-input" placeholder="请输入新昵称" maxlength="20" />
          <div class="dialog-actions">
            <button class="dialog-btn cancel" @click="showNicknameEdit = false">取消</button>
            <button class="dialog-btn confirm" @click="saveNickname">保存</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #f5f5f7;
  padding-bottom: 70px;
}

.profile-header {
  background: linear-gradient(135deg, #FF6B35, #FF8F5E);
  padding: 40px 20px 30px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-empty {
  background: rgba(255, 255, 255, 0.9);
}

.user-detail {
  flex: 1;
}

.nickname-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.nickname {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 4px;
}

.edit-btn {
  background: rgba(255,255,255,0.2);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.phone {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.section {
  background: #fff;
  margin: 10px 0;
  padding: 0 16px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #f5f5f7;
  cursor: pointer;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
}

.section-more {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 13px;
  color: #999;
}

.order-status-bar {
  display: flex;
  padding: 16px 0;
}

.status-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.status-icon-wrapper {
  position: relative;
}

.status-badge {
  position: absolute;
  top: -6px;
  right: -10px;
  background: #FF4D4F;
  color: #fff;
  font-size: 10px;
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

.status-item span {
  font-size: 12px;
  color: #666;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid #f5f5f7;
  cursor: pointer;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-label {
  flex: 1;
  font-size: 15px;
  color: #333;
}

.menu-badge {
  font-size: 12px;
  color: #FF6B35;
  background: #FFF0E8;
  padding: 2px 8px;
  border-radius: 10px;
}

.menu-arrow {
  flex-shrink: 0;
}

.logout-item {
  justify-content: center;
}

.logout-item .menu-label {
  flex: 0;
  text-align: center;
}

/* 昵称弹窗 */
.nickname-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.nickname-dialog {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 300px;
}

.dialog-title {
  font-size: 17px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 16px;
  text-align: center;
}

.dialog-input {
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid #eee;
  border-radius: 10px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}

.dialog-input:focus {
  border-color: #FF6B35;
}

.dialog-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.dialog-btn {
  flex: 1;
  padding: 10px;
  border-radius: 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: none;
}

.dialog-btn.cancel {
  background: #f5f5f7;
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
  .profile-page { padding-bottom: 40px; }
  .profile-header { padding: 48px 32px 36px; }
  .avatar { width: 72px; height: 72px; }
  .nickname { font-size: 22px; }
  .section { margin: 12px 0; }
}
</style>
