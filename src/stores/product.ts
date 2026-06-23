import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { products, categories, banners, type Product } from '@/data/products'

export const useProductStore = defineStore('product', () => {
  const allProducts = ref<Product[]>(products)
  const currentCategory = ref('全部')
  const searchKeyword = ref('')
  const bannerList = ref(banners)

  const filteredProducts = computed(() => {
    let result = allProducts.value
    if (currentCategory.value !== '全部') {
      result = result.filter(p => p.category === currentCategory.value)
    }
    if (searchKeyword.value.trim()) {
      const keyword = searchKeyword.value.trim().toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(keyword) ||
        p.description.toLowerCase().includes(keyword) ||
        p.category.toLowerCase().includes(keyword)
      )
    }
    return result
  })

  const hotProducts = computed(() =>
    [...allProducts.value].sort((a, b) => b.sales - a.sales).slice(0, 6)
  )

  const categoryList = ref(categories)

  function setCategory(category: string) {
    currentCategory.value = category
  }

  function setSearchKeyword(keyword: string) {
    searchKeyword.value = keyword
  }

  function getProductById(id: number): Product | undefined {
    return allProducts.value.find(p => p.id === id)
  }

  function addProduct(product: Product) {
    allProducts.value.push(product)
    saveToStorage()
  }

  function updateProduct(id: number, data: Partial<Product>) {
    const index = allProducts.value.findIndex(p => p.id === id)
    if (index > -1) {
      allProducts.value[index] = { ...allProducts.value[index], ...data }
      saveToStorage()
    }
  }

  function deleteProduct(id: number) {
    allProducts.value = allProducts.value.filter(p => p.id !== id)
    saveToStorage()
  }

  function saveToStorage() {
    localStorage.setItem('products_data', JSON.stringify(allProducts.value))
  }

  function loadFromStorage() {
    const data = localStorage.getItem('products_data')
    if (data) {
      try {
        const stored = JSON.parse(data) as Product[]
        const storedIds = new Set(stored.map(p => p.id))
        const newProducts = products.filter(p => !storedIds.has(p.id))
        allProducts.value = [...stored, ...newProducts]
      } catch {
        allProducts.value = [...products]
      }
    }
  }

  loadFromStorage()

  return {
    allProducts,
    currentCategory,
    searchKeyword,
    filteredProducts,
    hotProducts,
    categoryList,
    bannerList,
    setCategory,
    setSearchKeyword,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    saveToStorage,
    loadFromStorage
  }
})
