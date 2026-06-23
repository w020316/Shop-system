<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Plus, Trash2, Pencil } from 'lucide-vue-next'
import { useProductStore } from '@/stores/product'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const router = useRouter()
const productStore = useProductStore()

const showDeleteConfirm = ref(false)
const deleteId = ref(0)

function goBack() {
  router.back()
}

function confirmDelete(id: number) {
  deleteId.value = id
  showDeleteConfirm.value = true
}

function handleDeleteConfirm() {
  productStore.deleteProduct(deleteId.value)
  showDeleteConfirm.value = false
}

const formMode = ref<'add' | 'edit'>('add')
const showForm = ref(false)
const editingId = ref(0)

const formData = ref({
  name: '',
  price: 0,
  originalPrice: 0,
  description: '',
  category: '服装',
  image: ''
})

function openAddForm() {
  formMode.value = 'add'
  formData.value = { name: '', price: 0, originalPrice: 0, description: '', category: '服装', image: '' }
  showForm.value = true
}

function openEditForm(product: typeof productStore.allProducts[0]) {
  formMode.value = 'edit'
  editingId.value = product.id
  formData.value = {
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    description: product.description,
    category: product.category,
    image: product.image
  }
  showForm.value = true
}

function handleAddProduct() {
  if (!formData.value.name.trim()) return
  if (formData.value.price <= 0) return

  const id = Date.now()
  productStore.addProduct({
    id,
    name: formData.value.name.trim(),
    price: formData.value.price,
    originalPrice: formData.value.originalPrice || formData.value.price * 2,
    image: formData.value.image || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=' + encodeURIComponent(formData.value.name) + '%20product%20photo&image_size=square',
    images: [formData.value.image || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=' + encodeURIComponent(formData.value.name) + '%20product%20photo&image_size=square'],
    description: formData.value.description || formData.value.name,
    category: formData.value.category,
    sales: 0,
    specs: { colors: ['默认'], sizes: ['标准版'] },
    tags: ['新品'],
    reviews: []
  })

  formData.value = { name: '', price: 0, originalPrice: 0, description: '', category: '服装', image: '' }
  showForm.value = false
}

function handleEditProduct() {
  if (!formData.value.name.trim()) return
  if (formData.value.price <= 0) return

  productStore.updateProduct(editingId.value, {
    name: formData.value.name.trim(),
    price: formData.value.price,
    originalPrice: formData.value.originalPrice || formData.value.price * 2,
    description: formData.value.description,
    category: formData.value.category,
    image: formData.value.image
  })

  showForm.value = false
}

function handleFormSubmit() {
  if (formMode.value === 'add') {
    handleAddProduct()
  } else {
    handleEditProduct()
  }
}
</script>
<template>
  <div class="manage-page">
    <div class="page-header">
      <button class="back-btn" @click="goBack">
        <ArrowLeft :size="22" />
      </button>
      <span class="header-title">商品管理</span>
      <button class="add-btn" @click="openAddForm">
        <Plus :size="18" />
      </button>
    </div>

    <!-- 添加/编辑商品表单 -->
    <Transition name="slide-down">
      <div v-if="showForm" class="add-form">
        <h3 class="form-title">{{ formMode === 'add' ? '添加商品' : '编辑商品' }}</h3>
        <div class="form-group">
          <input v-model="formData.name" placeholder="商品名称" class="form-input" />
        </div>
        <div class="form-row">
          <input v-model.number="formData.price" type="number" placeholder="售价" class="form-input" />
          <input v-model.number="formData.originalPrice" type="number" placeholder="原价" class="form-input" />
        </div>
        <div class="form-group">
          <select v-model="formData.category" class="form-input">
            <option value="服装">服装</option>
            <option value="数码">数码</option>
            <option value="箱包">箱包</option>
            <option value="美妆">美妆</option>
            <option value="家居">家居</option>
            <option value="运动">运动</option>
          </select>
        </div>
        <div class="form-group">
          <textarea v-model="formData.description" placeholder="商品描述" class="form-textarea" rows="2"></textarea>
        </div>
        <div class="form-group">
          <input v-model="formData.image" placeholder="图片URL（选填）" class="form-input" />
        </div>
        <div class="form-actions">
          <button class="cancel-btn" @click="showForm = false">取消</button>
          <button class="submit-btn" @click="handleFormSubmit">{{ formMode === 'add' ? '添加商品' : '保存修改' }}</button>
        </div>
      </div>
    </Transition>

    <!-- 商品列表 -->
    <div class="product-list">
      <div v-for="product in productStore.allProducts" :key="product.id" class="product-item" @click="openEditForm(product)">
        <img :src="product.image" :alt="product.name" class="product-image" />
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <span class="product-category">{{ product.category }}</span>
          <div class="product-price-row">
            <span class="product-price">&#165;{{ product.price.toFixed(1) }}</span>
            <span class="product-sales">已售{{ product.sales }}件</span>
          </div>
        </div>
        <div class="action-btns">
          <button class="edit-btn" @click.stop="openEditForm(product)">
            <Pencil :size="18" color="#FF6B35" />
          </button>
          <button class="delete-btn" @click.stop="confirmDelete(product.id)">
            <Trash2 :size="18" color="#FF4D4F" />
          </button>
        </div>
      </div>
    </div>

    <ConfirmDialog
      :visible="showDeleteConfirm"
      title="删除商品"
      message="确定要删除这个商品吗？删除后无法恢复。"
      confirmText="删除"
      @confirm="handleDeleteConfirm"
      @cancel="showDeleteConfirm = false"
    />
  </div>
</template>
<style scoped>
.manage-page {
  min-height: 100vh;
  background: #f5f5f7;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  padding: 4px;
}

.header-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
}

.add-btn {
  background: #FF6B35;
  border: none;
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.add-form {
  background: #fff;
  padding: 16px;
  margin: 10px 12px;
  border-radius: 12px;
}

.form-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 12px;
}

.form-group {
  margin-bottom: 10px;
}

.form-row {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.form-row .form-input {
  flex: 1;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1.5px solid #eee;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  color: #333;
  background: #fafafa;
}

.form-input:focus {
  border-color: #FF6B35;
}

.form-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1.5px solid #eee;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  color: #333;
  background: #fafafa;
  resize: none;
  font-family: inherit;
}

.form-actions {
  display: flex;
  gap: 10px;
}

.cancel-btn {
  flex: 1;
  padding: 10px;
  background: #f0f0f0;
  color: #666;
  border: none;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.submit-btn {
  flex: 2;
  padding: 10px;
  background: #FF6B35;
  color: #fff;
  border: none;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.product-list {
  padding: 0 12px;
}

.product-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.product-item:active {
  background: #f9f9f9;
}

.product-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.product-info {
  flex: 1;
  min-width: 0;
}

.product-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-category {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  background: #FFF0E8;
  color: #FF6B35;
}

.product-price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
}

.product-price {
  font-size: 15px;
  font-weight: 700;
  color: #FF6B35;
}

.product-sales {
  font-size: 11px;
  color: #999;
}

.action-btns {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.edit-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: background 0.2s;
}

.edit-btn:hover {
  background: #FFF0E8;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: background 0.2s;
}

.delete-btn:hover {
  background: #FFF0F0;
}

.slide-down-enter-active {
  animation: slideDown 0.3s ease-out;
}

.slide-down-leave-active {
  animation: slideDown 0.3s ease-in reverse;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (min-width: 768px) {
  .manage-page { padding-bottom: 40px; }
  .product-list { padding: 0 24px; }
  .add-form { margin: 10px 24px; }
  .product-image { width: 80px; height: 80px; }
}
</style>