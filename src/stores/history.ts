import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/data/products'

export const useHistoryStore = defineStore('history', () => {
  const historyIds = ref<number[]>([])
  const maxHistory = 20

  function addHistory(productId: number) {
    historyIds.value = historyIds.value.filter(id => id !== productId)
    historyIds.value.unshift(productId)
    if (historyIds.value.length > maxHistory) {
      historyIds.value = historyIds.value.slice(0, maxHistory)
    }
    saveToStorage()
  }

  function clearHistory() {
    historyIds.value = []
    saveToStorage()
  }

  function saveToStorage() {
    localStorage.setItem('browse_history', JSON.stringify(historyIds.value))
  }

  function loadFromStorage() {
    const data = localStorage.getItem('browse_history')
    if (data) {
      try {
        historyIds.value = JSON.parse(data)
      } catch {
        historyIds.value = []
      }
    }
  }

  loadFromStorage()

  return {
    historyIds,
    addHistory,
    clearHistory,
    saveToStorage,
    loadFromStorage
  }
})