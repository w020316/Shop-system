<script setup lang="ts">
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Eye, EyeOff } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const showToast = inject<(msg: string, type?: 'success' | 'error' | 'info') => void>('showToast')!

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showOldPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const errorMsg = ref('')

function goBack() {
  router.back()
}

function handleChangePassword() {
  errorMsg.value = ''

  if (!oldPassword.value) {
    errorMsg.value = '请输入原密码'
    return
  }
  if (!newPassword.value) {
    errorMsg.value = '请输入新密码'
    return
  }
  if (newPassword.value.length < 6) {
    errorMsg.value = '新密码长度不能少于6位'
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    errorMsg.value = '两次输入的新密码不一致'
    return
  }

  const result = userStore.changePassword(oldPassword.value, newPassword.value)
  if (result.success) {
    showToast('密码修改成功', 'success')
    setTimeout(() => router.back(), 600)
  } else {
    errorMsg.value = result.message
  }
}
</script>

<template>
  <div class="change-password-page">
    <div class="page-header">
      <button class="back-btn" @click="goBack">
        <ArrowLeft :size="22" />
      </button>
      <span class="header-title">修改密码</span>
      <span class="header-placeholder"></span>
    </div>

    <div class="form-content">
      <div class="auth-form">
        <div class="form-group">
          <label class="form-label">原密码</label>
          <div class="input-wrapper">
            <input
              v-model="oldPassword"
              :type="showOldPassword ? 'text' : 'password'"
              placeholder="请输入原密码"
              class="form-input"
            />
            <button class="eye-btn" @click="showOldPassword = !showOldPassword">
              <Eye v-if="!showOldPassword" :size="18" color="#999" />
              <EyeOff v-else :size="18" color="#FF6B35" />
            </button>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">新密码</label>
          <div class="input-wrapper">
            <input
              v-model="newPassword"
              :type="showNewPassword ? 'text' : 'password'"
              placeholder="请输入新密码（至少6位）"
              class="form-input"
            />
            <button class="eye-btn" @click="showNewPassword = !showNewPassword">
              <Eye v-if="!showNewPassword" :size="18" color="#999" />
              <EyeOff v-else :size="18" color="#FF6B35" />
            </button>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">确认新密码</label>
          <div class="input-wrapper">
            <input
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="请再次输入新密码"
              class="form-input"
            />
            <button class="eye-btn" @click="showConfirmPassword = !showConfirmPassword">
              <Eye v-if="!showConfirmPassword" :size="18" color="#999" />
              <EyeOff v-else :size="18" color="#FF6B35" />
            </button>
          </div>
        </div>

        <Transition name="shake">
          <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
        </Transition>

        <button class="auth-btn" @click="handleChangePassword">确认修改</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.change-password-page {
  min-height: 100vh;
  background: #fff;
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

.header-placeholder {
  width: 30px;
}

.form-content {
  padding: 30px 32px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid #eee;
  border-radius: 12px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  color: #333;
  background: #fafafa;
}

.form-input:focus {
  border-color: #FF6B35;
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  background: #fff;
}

.form-input::placeholder {
  color: #ccc;
}

.eye-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.error-msg {
  color: #FF4D4F;
  font-size: 13px;
  margin: -8px 0 0;
  padding: 8px 12px;
  background: #FFF0F0;
  border-radius: 8px;
}

.auth-btn {
  padding: 14px;
  background: linear-gradient(135deg, #FF6B35, #FF8F5E);
  color: #fff;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
}

.auth-btn:active {
  transform: scale(0.98);
}

.shake-enter-active {
  animation: shake 0.4s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  75% { transform: translateX(6px); }
}

@media (min-width: 768px) {
  .change-password-page { padding-bottom: 40px; }
  .form-content { padding: 30px 48px; }
  .auth-form { max-width: 500px; margin: 0 auto; }
}
</style>