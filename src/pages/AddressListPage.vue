<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLeft, Plus, MapPin } from 'lucide-vue-next'
import { useAddressStore } from '@/stores/address'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { ref } from 'vue'

const router = useRouter()
const addressStore = useAddressStore()

const showDeleteConfirm = ref(false)
const deleteId = ref('')

function goBack() {
  router.back()
}

function addNewAddress() {
  router.push('/address/edit')
}

function editAddress(id: string) {
  router.push(`/address/edit/${id}`)
}

function confirmDelete(id: string) {
  deleteId.value = id
  showDeleteConfirm.value = true
}

function handleDeleteConfirm() {
  addressStore.deleteAddress(deleteId.value)
  showDeleteConfirm.value = false
}

function setDefault(id: string) {
  addressStore.setDefault(id)
}
</script>

<template>
  <div class="address-list-page">
    <div class="page-header">
      <button class="back-btn" @click="goBack">
        <ArrowLeft :size="22" />
      </button>
      <span class="header-title">收货地址</span>
      <span></span>
    </div>

    <div v-if="addressStore.addresses.length === 0" class="empty-state">
      <MapPin :size="48" color="#ddd" />
      <p>暂无收货地址</p>
      <button class="add-btn" @click="addNewAddress">添加地址</button>
    </div>

    <div v-else class="address-list">
      <div v-for="addr in addressStore.addresses" :key="addr.id" class="address-card" @click="editAddress(addr.id)">
        <div class="address-content">
          <div class="address-user">
            <span class="user-name">{{ addr.name }}</span>
            <span class="user-phone">{{ addr.phone }}</span>
            <span v-if="addr.isDefault" class="default-tag">默认</span>
          </div>
          <p class="address-detail">{{ addr.province }}{{ addr.city }}{{ addr.district }}{{ addr.detail }}</p>
        </div>
        <div class="address-actions">
          <button v-if="!addr.isDefault" class="action-btn" @click.stop="setDefault(addr.id)">设为默认</button>
          <button class="action-btn delete" @click.stop="confirmDelete(addr.id)">删除</button>
        </div>
      </div>
    </div>

    <div class="bottom-bar">
      <button class="add-new-btn" @click="addNewAddress">
        <Plus :size="18" />
        新增收货地址
      </button>
    </div>

    <ConfirmDialog
      :visible="showDeleteConfirm"
      title="删除地址"
      message="确定要删除这个地址吗？"
      confirmText="删除"
      @confirm="handleDeleteConfirm"
      @cancel="showDeleteConfirm = false"
    />
  </div>
</template>

<style scoped>
.address-list-page {
  min-height: 100vh;
  background: #f5f5f7;
  padding-bottom: 70px;
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

.add-btn {
  padding: 8px 24px;
  background: #FF6B35;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
}

.address-list {
  padding: 10px 12px;
}

.address-card {
  background: #fff;
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 8px;
}

.address-content {
  margin-bottom: 10px;
}

.address-user {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
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

.default-tag {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  background: #FFF0E8;
  color: #FF6B35;
  font-weight: 600;
}

.address-detail {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  margin: 0;
}

.address-actions {
  display: flex;
  gap: 12px;
  padding-top: 10px;
  border-top: 1px solid #f5f5f7;
}

.action-btn {
  background: none;
  border: none;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  padding: 4px 8px;
}

.action-btn.delete {
  color: #FF4D4F;
}

.bottom-bar {
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
}

.add-new-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #FF6B35, #FF8F5E);
  color: #fff;
  border: none;
  border-radius: 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

@media (min-width: 768px) {
  .address-list-page { padding-bottom: 40px; }
  .address-list { padding: 10px 24px; }
  .bottom-bar { max-width: 100%; }
}
</style>