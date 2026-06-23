<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
}>()

const visible = ref(false)

let timer: ReturnType<typeof setTimeout>

watch(() => props.message, (val) => {
  if (val) {
    visible.value = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      visible.value = false
    }, props.duration || 2000)
  }
})
</script>

<template>
  <Transition name="toast">
    <div v-if="visible && message" class="toast-wrapper">
      <div class="toast-content" :class="type || 'info'">
        <span v-if="type === 'success'" class="toast-icon">&#10003;</span>
        <span v-else-if="type === 'error'" class="toast-icon">&#10007;</span>
        <span v-else class="toast-icon">&#8505;</span>
        <span class="toast-message">{{ message }}</span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.toast-wrapper {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
}

.toast-content.success {
  background: #4CAF50;
  color: #fff;
}

.toast-content.error {
  background: #FF4D4F;
  color: #fff;
}

.toast-content.info {
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
}

.toast-icon {
  font-size: 16px;
}

.toast-enter-active {
  animation: fadeInDown 0.3s ease-out;
}

.toast-leave-active {
  animation: fadeInDown 0.3s ease-in reverse;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>