<script setup lang="ts">
const props = defineProps<{
  visible: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

function handleConfirm() {
  emit('confirm')
}

function handleCancel() {
  emit('cancel')
}
</script>

<template>
  <Transition name="overlay">
    <div v-if="visible" class="confirm-overlay" @click.self="handleCancel">
      <div class="confirm-dialog animate-fade-in-up">
        <h3 class="confirm-title">{{ title }}</h3>
        <p class="confirm-message">{{ message }}</p>
        <div class="confirm-actions">
          <button class="confirm-btn cancel" @click="handleCancel">
            {{ cancelText || '取消' }}
          </button>
          <button class="confirm-btn ok" @click="handleConfirm">
            {{ confirmText || '确定' }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.confirm-overlay {
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

.confirm-dialog {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 300px;
  text-align: center;
}

.confirm-title {
  font-size: 17px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 8px;
}

.confirm-message {
  font-size: 14px;
  color: #666;
  margin: 0 0 20px;
  line-height: 1.5;
}

.confirm-actions {
  display: flex;
  gap: 12px;
}

.confirm-btn {
  flex: 1;
  padding: 10px;
  border-radius: 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s;
}

.confirm-btn:active {
  opacity: 0.8;
}

.confirm-btn.cancel {
  background: #f5f5f7;
  color: #666;
}

.confirm-btn.ok {
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
</style>