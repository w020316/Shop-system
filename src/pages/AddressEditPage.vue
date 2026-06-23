<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import { useAddressStore, type Address } from '@/stores/address'

const router = useRouter()
const route = useRoute()
const addressStore = useAddressStore()

const isEdit = ref(false)
const editId = ref('')

const name = ref('')
const phone = ref('')
const province = ref('')
const city = ref('')
const district = ref('')
const detail = ref('')
const isDefault = ref(false)
const errorMsg = ref('')

onMounted(() => {
  const id = route.params.id as string
  if (id) {
    isEdit.value = true
    editId.value = id
    const addr = addressStore.addresses.find(a => a.id === id)
    if (addr) {
      name.value = addr.name
      phone.value = addr.phone
      province.value = addr.province
      city.value = addr.city
      district.value = addr.district
      detail.value = addr.detail
      isDefault.value = addr.isDefault
    }
  }
})

function goBack() {
  router.back()
}

function handleSave() {
  errorMsg.value = ''

  if (!name.value.trim()) { errorMsg.value = '请输入收货人姓名'; return }
  if (!/^1[3-9]\d{9}$/.test(phone.value)) { errorMsg.value = '手机号格式不正确'; return }
  if (!province.value.trim() || !city.value.trim()) { errorMsg.value = '请输入省市区'; return }
  if (!detail.value.trim()) { errorMsg.value = '请输入详细地址'; return }

  if (isEdit.value) {
    addressStore.updateAddress(editId.value, {
      name: name.value.trim(),
      phone: phone.value,
      province: province.value.trim(),
      city: city.value.trim(),
      district: district.value.trim(),
      detail: detail.value.trim(),
      isDefault: isDefault.value
    })
  } else {
    addressStore.addAddress({
      name: name.value.trim(),
      phone: phone.value,
      province: province.value.trim(),
      city: city.value.trim(),
      district: district.value.trim(),
      detail: detail.value.trim(),
      isDefault: isDefault.value
    })
  }
  router.back()
}
</script>

<template>
  <div class="address-edit-page">
    <div class="page-header">
      <button class="back-btn" @click="goBack">
        <ArrowLeft :size="22" />
      </button>
      <span class="header-title">{{ isEdit ? '编辑地址' : '新增地址' }}</span>
      <span></span>
    </div>

    <div class="form-section">
      <div class="form-group">
        <label class="form-label">收货人</label>
        <input v-model="name" type="text" placeholder="请输入姓名" class="form-input" />
      </div>
      <div class="form-group">
        <label class="form-label">手机号</label>
        <input v-model="phone" type="tel" placeholder="请输入手机号" maxlength="11" class="form-input" />
      </div>
      <div class="form-group">
        <label class="form-label">省</label>
        <input v-model="province" type="text" placeholder="如：北京市" class="form-input" />
      </div>
      <div class="form-group">
        <label class="form-label">市</label>
        <input v-model="city" type="text" placeholder="如：北京市" class="form-input" />
      </div>
      <div class="form-group">
        <label class="form-label">区/县</label>
        <input v-model="district" type="text" placeholder="如：朝阳区" class="form-input" />
      </div>
      <div class="form-group">
        <label class="form-label">详细地址</label>
        <textarea v-model="detail" placeholder="请输入详细地址" class="form-textarea" rows="3"></textarea>
      </div>
      <div class="form-group row">
        <label class="form-label">设为默认地址</label>
        <div class="switch" :class="{ active: isDefault }" @click="isDefault = !isDefault">
          <div class="switch-thumb"></div>
        </div>
      </div>
    </div>

    <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

    <div class="save-bar">
      <button class="save-btn" @click="handleSave">保存</button>
    </div>
  </div>
</template>

<style scoped>
.address-edit-page {
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

.form-section {
  background: #fff;
  padding: 0 16px;
  margin: 10px 0;
}

.form-group {
  padding: 14px 0;
  border-bottom: 1px solid #f5f5f7;
}

.form-group:last-child {
  border-bottom: none;
}

.form-group.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 8px;
}

.form-group.row .form-label {
  margin-bottom: 0;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1.5px solid #eee;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  color: #333;
  background: #fafafa;
}

.form-input:focus {
  border-color: #FF6B35;
  background: #fff;
}

.form-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1.5px solid #eee;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  color: #333;
  background: #fafafa;
  resize: none;
  font-family: inherit;
}

.form-textarea:focus {
  border-color: #FF6B35;
  background: #fff;
}

.switch {
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: #ddd;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
}

.switch.active {
  background: #FF6B35;
}

.switch-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.15);
}

.switch.active .switch-thumb {
  transform: translateX(20px);
}

.error-msg {
  color: #FF4D4F;
  font-size: 13px;
  padding: 8px 16px;
  background: #FFF0F0;
  margin: 0 16px;
  border-radius: 8px;
}

.save-bar {
  padding: 16px;
}

.save-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #FF6B35, #FF8F5E);
  color: #fff;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
}

@media (min-width: 768px) {
  .address-edit-page { padding-bottom: 40px; }
  .form-section { padding: 0 24px; }
  .form-input { max-width: 500px; }
  .form-textarea { max-width: 500px; }
}
</style>