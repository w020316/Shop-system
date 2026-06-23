import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Address {
  id: string
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  isDefault: boolean
}

export const useAddressStore = defineStore('address', () => {
  const addresses = ref<Address[]>([])

  const defaultAddress = computed(() =>
    addresses.value.find(a => a.isDefault) || addresses.value[0] || null
  )

  function addAddress(data: Omit<Address, 'id'>) {
    const address: Address = {
      ...data,
      id: `ADDR${Date.now()}`
    }
    if (address.isDefault) {
      addresses.value.forEach(a => a.isDefault = false)
    }
    addresses.value.push(address)
    saveToStorage()
  }

  function updateAddress(id: string, data: Partial<Address>) {
    const index = addresses.value.findIndex(a => a.id === id)
    if (index > -1) {
      if (data.isDefault) {
        addresses.value.forEach(a => a.isDefault = false)
      }
      addresses.value[index] = { ...addresses.value[index], ...data }
      saveToStorage()
    }
  }

  function deleteAddress(id: string) {
    addresses.value = addresses.value.filter(a => a.id !== id)
    saveToStorage()
  }

  function setDefault(id: string) {
    addresses.value.forEach(a => a.isDefault = a.id === id)
    saveToStorage()
  }

  function saveToStorage() {
    localStorage.setItem('addresses', JSON.stringify(addresses.value))
  }

  function loadFromStorage() {
    const data = localStorage.getItem('addresses')
    if (data) {
      try {
        addresses.value = JSON.parse(data)
      } catch {
        addresses.value = []
      }
    }
  }

  loadFromStorage()

  return {
    addresses,
    defaultAddress,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefault,
    saveToStorage,
    loadFromStorage
  }
})