import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CartItem {
  productId: number
  name: string
  price: number
  image: string
  color: string
  size: string
  quantity: number
  checked: boolean
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const checkedItems = computed(() => items.value.filter(item => item.checked))

  const totalPrice = computed(() =>
    checkedItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const totalCount = computed(() =>
    checkedItems.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const cartCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const isAllChecked = computed(() =>
    items.value.length > 0 && items.value.every(item => item.checked)
  )

  function addToCart(item: Omit<CartItem, 'checked'>) {
    const existing = items.value.find(
      i => i.productId === item.productId && i.color === item.color && i.size === item.size
    )
    if (existing) {
      existing.quantity += item.quantity
    } else {
      items.value.push({ ...item, checked: true })
    }
    saveToStorage()
  }

  function removeFromCart(index: number) {
    items.value.splice(index, 1)
    saveToStorage()
  }

  function updateQuantity(index: number, quantity: number) {
    if (quantity < 1) return
    items.value[index].quantity = quantity
    saveToStorage()
  }

  function toggleCheck(index: number) {
    items.value[index].checked = !items.value[index].checked
    saveToStorage()
  }

  function toggleCheckAll() {
    const newState = !isAllChecked.value
    items.value.forEach(item => item.checked = newState)
    saveToStorage()
  }

  function clearChecked() {
    items.value = items.value.filter(item => !item.checked)
    saveToStorage()
  }

  function saveToStorage() {
    localStorage.setItem('cart_items', JSON.stringify(items.value))
  }

  function loadFromStorage() {
    const data = localStorage.getItem('cart_items')
    if (data) {
      try {
        items.value = JSON.parse(data)
      } catch {
        items.value = []
      }
    }
  }

  loadFromStorage()

  return {
    items,
    checkedItems,
    totalPrice,
    totalCount,
    cartCount,
    isAllChecked,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCheck,
    toggleCheckAll,
    clearChecked,
    saveToStorage,
    loadFromStorage
  }
})