<script setup lang="ts">
defineProps<{
  icon?: string
  title?: string
  description?: string
  actionText?: string
}>()

const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <div class="empty-state">
    <div class="empty-icon">{{ icon || '📭' }}</div>
    <h3 class="empty-title">{{ title || '暂无数据' }}</h3>
    <p v-if="description" class="empty-desc">{{ description }}</p>
    <button v-if="actionText" class="empty-action" @click="emit('action')">{{ actionText }}</button>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 8px;
}
.empty-icon {
  font-size: 48px;
  margin-bottom: 8px;
}
.empty-title {
  font-size: 16px;
  font-weight: 600;
  color: #999;
  margin: 0;
}
.empty-desc {
  font-size: 13px;
  color: #ccc;
  margin: 0;
}
.empty-action {
  margin-top: 12px;
  padding: 8px 24px;
  background: linear-gradient(135deg, #FF6B35, #FF8F5E);
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
}
</style>