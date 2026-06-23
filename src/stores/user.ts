import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: number
  phone: string
  password: string
  nickname: string
  avatar: string
}

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<User | null>(null)
  const isLoggedIn = computed(() => currentUser.value !== null)

  function getRegisteredUsers(): User[] {
    const data = localStorage.getItem('registered_users')
    if (data) {
      try {
        return JSON.parse(data)
      } catch {
        return []
      }
    }
    return []
  }

  function saveRegisteredUsers(users: User[]) {
    localStorage.setItem('registered_users', JSON.stringify(users))
  }

  function register(phone: string, password: string): { success: boolean; message: string } {
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return { success: false, message: '手机号格式不正确' }
    }
    if (password.length < 6) {
      return { success: false, message: '密码长度不能少于6位' }
    }

    const users = getRegisteredUsers()
    if (users.find(u => u.phone === phone)) {
      return { success: false, message: '该手机号已注册' }
    }

    const newUser: User = {
      id: Date.now(),
      phone,
      password,
      nickname: `用户${phone.slice(-4)}`,
      avatar: ''
    }

    users.push(newUser)
    saveRegisteredUsers(users)
    return { success: true, message: '注册成功' }
  }

  function login(phone: string, password: string): { success: boolean; message: string } {
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return { success: false, message: '手机号格式不正确' }
    }
    if (password.length < 6) {
      return { success: false, message: '密码长度不能少于6位' }
    }

    const users = getRegisteredUsers()
    const user = users.find(u => u.phone === phone && u.password === password)
    if (!user) {
      return { success: false, message: '手机号或密码错误' }
    }

    currentUser.value = user
    localStorage.setItem('current_user', JSON.stringify(user))
    return { success: true, message: '登录成功' }
  }

  function updateNickname(nickname: string) {
    if (!currentUser.value) return
    currentUser.value.nickname = nickname
    localStorage.setItem('current_user', JSON.stringify(currentUser.value))
    const users = getRegisteredUsers()
    const user = users.find(u => u.id === currentUser.value!.id)
    if (user) {
      user.nickname = nickname
      saveRegisteredUsers(users)
    }
  }

  function logout() {
    currentUser.value = null
    localStorage.removeItem('current_user')
  }

  function loadFromStorage() {
    const data = localStorage.getItem('current_user')
    if (data) {
      try {
        currentUser.value = JSON.parse(data)
      } catch {
        currentUser.value = null
      }
    }
  }

  loadFromStorage()


  function changePassword(oldPassword: string, newPassword: string): { success: boolean; message: string } {
    if (!currentUser.value) return { success: false, message: '请先登录' }
    if (oldPassword !== currentUser.value.password) return { success: false, message: '原密码错误' }
    if (newPassword.length < 6) return { success: false, message: '新密码长度不能少于6位' }
    if (oldPassword === newPassword) return { success: false, message: '新密码不能与原密码相同' }
    
    currentUser.value.password = newPassword
    localStorage.setItem('current_user', JSON.stringify(currentUser.value))
    const users = getRegisteredUsers()
    const user = users.find(u => u.id === currentUser.value!.id)
    if (user) {
      user.password = newPassword
      saveRegisteredUsers(users)
    }
    return { success: true, message: '密码修改成功' }
  }

  return {
    currentUser,
    isLoggedIn,
    register,
    login,
    updateNickname,
    changePassword,
    logout,
    loadFromStorage
  }
})