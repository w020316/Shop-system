import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CartItem } from './cart'

export interface Order {
  id: string
  items: CartItem[]
  totalPrice: number
  address: string
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled'
  createTime: string
  payTime?: string
  shipTime?: string
  completeTime?: string
  cancelTime?: string
}

export const useOrderStore = defineStore('order', () => {
  const orders = ref<Order[]>([])

  function createOrder(items: CartItem[], address: string): Order {
    const order: Order = {
      id: `ORD${Date.now()}`,
      items: [...items],
      totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      address,
      status: 'pending',
      createTime: new Date().toLocaleString('zh-CN')
    }
    orders.value.unshift(order)
    saveToStorage()
    return order
  }

  function payOrder(orderId: string) {
    const order = orders.value.find(o => o.id === orderId)
    if (order) {
      order.status = 'paid'
      order.payTime = new Date().toLocaleString('zh-CN')
      saveToStorage()
      setTimeout(() => {
        shipOrder(orderId)
      }, 3000)
    }
  }

  function shipOrder(orderId: string) {
    const order = orders.value.find(o => o.id === orderId)
    if (order && order.status === 'paid') {
      order.status = 'shipped'
      order.shipTime = new Date().toLocaleString('zh-CN')
      saveToStorage()
    }
  }

  function confirmReceive(orderId: string) {
    const order = orders.value.find(o => o.id === orderId)
    if (order && order.status === 'shipped') {
      order.status = 'completed'
      order.completeTime = new Date().toLocaleString('zh-CN')
      saveToStorage()
    }
  }

  function cancelOrder(orderId: string) {
    const order = orders.value.find(o => o.id === orderId)
    if (order && order.status === 'pending') {
      order.status = 'cancelled'
      order.cancelTime = new Date().toLocaleString('zh-CN')
      saveToStorage()
    }
  }

  function getOrdersByStatus(status: string): Order[] {
    if (status === 'all') return orders.value
    return orders.value.filter(o => o.status === status)
  }

  function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders.value))
  }

  function loadFromStorage() {
    const data = localStorage.getItem('orders')
    if (data) {
      try {
        orders.value = JSON.parse(data)
      } catch {
        orders.value = []
      }
    }
  }

  loadFromStorage()

  return {
    orders,
    createOrder,
    payOrder,
    shipOrder,
    confirmReceive,
    cancelOrder,
    getOrdersByStatus,
    saveToStorage,
    loadFromStorage
  }
})
