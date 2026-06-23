<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  src: string
  alt?: string
}>()

const failed = ref(false)

function handleerror() {
  failed.value = true
}
</script>

<template>
  <img
    v-if="!failed"
    :src="src"
    :alt="alt || ''"
    @error="handleerror"
    loading="lazy"
    class="img-fallback"
  />
  <div v-else class="img-placeholder">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  </div>
</template>

<style scoped>
.img-fallback {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
}
</style>