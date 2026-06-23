import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoriteStore = defineStore('favorite', () => {
  const favoriteIds = ref<number[]>([])

  const count = computed(() => favoriteIds.value.length)

  function isFavorite(productId: number): boolean {
    return favoriteIds.value.includes(productId)
  }

  function toggleFavorite(productId: number) {
    const index = favoriteIds.value.indexOf(productId)
    if (index > -1) {
      favoriteIds.value.splice(index, 1)
    } else {
      favoriteIds.value.push(productId)
    }
    saveToStorage()
  }

  function saveToStorage() {
    localStorage.setItem('favorite_ids', JSON.stringify(favoriteIds.value))
  }

  function loadFromStorage() {
    const data = localStorage.getItem('favorite_ids')
    if (data) {
      try {
        favoriteIds.value = JSON.parse(data)
      } catch {
        favoriteIds.value = []
      }
    }
  }

  loadFromStorage()

  return {
    favoriteIds,
    count,
    isFavorite,
    toggleFavorite,
    saveToStorage,
    loadFromStorage
  }
})