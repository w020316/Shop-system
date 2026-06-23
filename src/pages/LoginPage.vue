<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Eye, EyeOff } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const phone = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMsg = ref('')

function goBack() {
  router.back()
}

function handleLogin() {
  errorMsg.value = ''

  if (!phone.value) {
    errorMsg.value = '请输入手机号'
    return
  }
  if (!/^1[3-9]\d{9}$/.test(phone.value)) {
    errorMsg.value = '手机号格式不正确'
    return
  }
  if (!password.value) {
    errorMsg.value = '请输入密码'
    return
  }
  if (password.value.length < 6) {
    errorMsg.value = '密码长度不能少于6位'
    return
  }

  const result = userStore.login(phone.value, password.value)
  if (result.success) {
    router.push('/profile')
  } else {
    errorMsg.value = result.message
  }
}

function goToRegister() {
  router.push('/register')
}
</script>

<template>
  <div class="login-page">
    <div class="auth-header">
      <button class="back-btn" @click="goBack">
        <ArrowLeft :size="22" />
      </button>
    </div>

    <div class="auth-content">
      <div class="auth-brand">
        <div class="brand-icon">&#128722;</div>
        <h1 class="auth-title">欢迎回来</h1>
        <p class="auth-subtitle">登录微商城，享受品质购物</p>
      </div>

      <div class="auth-form">
        <div class="form-group">
          <label class="form-label">手机号</label>
          <div class="input-wrapper">
            <input
              v-model="phone"
              type="tel"
              placeholder="请输入手机号"
              maxlength="11"
              class="form-input"
            />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">密码</label>
          <div class="input-wrapper">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请输入密码（至少6位）"
              class="form-input"
            />
            <button class="eye-btn" @click="showPassword = !showPassword">
              <Eye v-if="!showPassword" :size="18" color="#999" />
              <EyeOff v-else :size="18" color="#FF6B35" />
            </button>
          </div>
        </div>

        <Transition name="shake">
          <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
        </Transition>

        <button class="auth-btn" @click="handleLogin">登录</button>

        <div class="auth-switch">
          还没有账号？
          <span class="switch-link" @click="goToRegister">立即注册</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.login-page {
  min-height: 100vh;
  background: #fff;
}

.auth-header {
  padding: 12px 16px;
}

.back-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  padding: 4px;
}

.auth-content {
  padding: 20px 32px;
}

.auth-brand {
  text-align: center;
  margin-bottom: 36px;
}

.brand-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.auth-title {
  font-size: 26px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 8px;
}

.auth-subtitle {
  font-size: 14px;
  color: #999;
  margin: 0;
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

.auth-switch {
  text-align: center;
  font-size: 14px;
  color: #999;
}

.switch-link {
  color: #FF6B35;
  cursor: pointer;
  font-weight: 600;
}

.shake-enter-active {
  animation: shake 0.4s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  75% { transform: translateX(6px); }
}
</style>
