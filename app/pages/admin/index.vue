<template>
  <section class="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_theme(colors.blue.100)_0%,_transparent_50%),radial-gradient(circle_at_80%_20%,_theme(colors.indigo.100)_0%,_transparent_50%),radial-gradient(circle_at_40%_40%,_theme(colors.gray.100)_0%,_transparent_50%)]"></div>
    
    <div class="relative px-6 py-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-8 mb-8">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-4">
              <div class="h-12 w-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
              <div>
                <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p class="text-gray-600 mt-1">Welcome back, <span class="font-semibold text-indigo-600">{{ username }}</span></p>
              </div>
            </div>
            <button @click="logout" 
                    class="group flex items-center space-x-2 px-4 py-2 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-xl transition-all duration-200 border border-red-200 hover:border-red-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span class="font-medium">Logout</span>
            </button>
          </div>
        </div>

        <!-- Navigation Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button @click="router.push('/admin/GameManagement')" 
                  class="group bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
            <div class="flex items-center space-x-4">
              <div class="h-14 w-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M12 5v.01M3 12a9 9 0 1018 0 9 9 0 00-18 0z"></path>
                </svg>
              </div>
              <div class="text-left">
                <h3 class="text-xl font-bold text-gray-900">Game Management</h3>
                <p class="text-gray-600 text-sm">Manage games and content</p>
              </div>
            </div>
          </button>

          <button @click="router.push('/admin/DealManagement')" 
                  class="group bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
            <div class="flex items-center space-x-4">
              <div class="h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="text-left">
                <h3 class="text-xl font-bold text-gray-900">Deal Management</h3>
                <p class="text-gray-600 text-sm">Manage offers and promotions</p>
              </div>
            </div>
          </button>
        </div>

        <!-- User Management -->
        <div class="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl overflow-hidden">
          <div class="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-200/50">
            <div class="flex items-center space-x-3">
              <div class="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-900">User Management</h2>
            </div>
          </div>

          <div class="p-8">
            <!-- Alerts -->
            <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-xl">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
                <p class="text-red-700 font-medium">{{ errorMessage }}</p>
              </div>
            </div>

            <div v-if="successMessage" class="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-xl">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <p class="text-green-700 font-medium">{{ successMessage }}</p>
              </div>
            </div>

            <!-- Add User Form -->
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add New User
              </h3>
              <form @submit.prevent="addUser" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div class="relative">
                  <input v-model="newUser.email" type="email" placeholder="Email address" 
                         class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required />
                  <svg class="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                  </svg>
                </div>
                <div class="relative">
                  <input v-model="newUser.password" type="password" placeholder="Password" 
                         class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required />
                  <svg class="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <select v-model="newUser.role" class="py-3 px-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200">
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
                <button type="submit" :disabled="isLoading" 
                        class="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                  <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Add User
                </button>
              </form>
            </div>

            <!-- Users Table -->
            <div class="overflow-hidden rounded-2xl border border-gray-200">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                      <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                      <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                      <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Created</th>
                      <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition-colors duration-150">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">#{{ user.id }}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                            <span class="text-white text-xs font-bold">{{ user.email.charAt(0).toUpperCase() }}</span>
                          </div>
                          <span class="text-sm font-medium text-gray-900">{{ user.email }}</span>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span :class="user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800 border-purple-200' : 'bg-blue-100 text-blue-800 border-blue-200'" 
                              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border">
                          {{ user.role }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {{ new Date(user.createdAt).toLocaleDateString('th-TH') }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm">
                        <div class="flex space-x-3">
                          <button @click="editUser(user.id)" 
                                  class="text-indigo-600 hover:text-indigo-800 font-medium hover:bg-indigo-50 px-2 py-1 rounded-lg transition-all duration-150">
                            Edit
                          </button>
                          <button @click="deleteUser(user.id)" 
                                  :disabled="isLoading || user.email === adminEmail" 
                                  class="text-red-600 hover:text-red-800 font-medium hover:bg-red-50 px-2 py-1 rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit Modal -->
        <div v-if="showEditModal && selectedUser" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
            <div class="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-t-2xl p-6">
              <h3 class="text-xl font-bold flex items-center">
                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Edit User
              </h3>
            </div>
            <form @submit.prevent="saveUser" class="p-6 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input v-model="selectedUser.email" type="email" 
                       class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input v-model="selectedUser.password" type="password" placeholder="Leave blank to keep current password" 
                       class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select v-model="selectedUser.role" 
                        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200">
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <div class="flex justify-end gap-3 pt-4">
                <button type="button" @click="showEditModal = false" 
                        class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 font-medium">
                  Cancel
                </button>
                <button type="submit" :disabled="isLoading" 
                        class="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 font-medium disabled:opacity-50 flex items-center">
                  <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useNuxtApp } from 'nuxt/app'

const router = useRouter() || useNuxtApp().$router

const users = ref<User[]>([])
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)
const username = ref('Admin')
const adminEmail = ref('')
const newUser = ref({ email: '', password: '', role: 'USER' })
const selectedUser = ref<User | null>(null)
const showEditModal = ref(false)

type User = {
  id: number
  email: string
  password: string
  role: 'USER' | 'ADMIN'
  createdAt: string
  updatedAt: string
}

function parseJwt(token: string) {
  try {
    const parts = token.split('.')
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))
    return JSON.parse(jsonPayload)
  } catch (e) {
    return null
  }
}

async function fetchUsers() {
  try {
    isLoading.value = true
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3000/users', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    users.value = data.data
  } catch (error: any) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

async function addUser() {
  try {
    isLoading.value = true
    errorMessage.value = ''
    successMessage.value = ''
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(newUser.value),
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    users.value.push(data.data)
    successMessage.value = 'User added successfully'
    newUser.value = { email: '', password: '', role: 'USER' }
    setTimeout(() => successMessage.value = '', 5000)
  } catch (error: any) {
    errorMessage.value = error.message
    setTimeout(() => errorMessage.value = '', 5000)
  } finally {
    isLoading.value = false
  }
}

async function editUser(userId: number) {
  const user = users.value.find(u => u.id === userId)
  if (user) {
    selectedUser.value = { ...user, password: '' }
    showEditModal.value = true
  }
}

async function saveUser() {
  if (!selectedUser.value) return
  try {
    isLoading.value = true
    errorMessage.value = ''
    successMessage.value = ''
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3000/users/${selectedUser.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        email: selectedUser.value.email,
        password: selectedUser.value.password || undefined,
        role: selectedUser.value.role
      }),
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    const index = users.value.findIndex(u => u.id === selectedUser.value!.id)
    if (index !== -1) users.value[index] = data.data
    successMessage.value = 'User updated successfully'
    showEditModal.value = false
    setTimeout(() => successMessage.value = '', 5000)
  } catch (error: any) {
    errorMessage.value = error.message
    setTimeout(() => errorMessage.value = '', 5000)
  } finally {
    isLoading.value = false
  }
}

async function deleteUser(userId: number) {
  const user = users.value.find(u => u.id === userId)
  if (!user) return
  const confirmed = window.confirm(`Are you sure you want to delete user "${user.email}"?`)
  if (!confirmed) return

  try {
    isLoading.value = true
    errorMessage.value = ''
    successMessage.value = ''
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    users.value = users.value.filter(u => u.id !== userId)
    successMessage.value = 'User deleted successfully'
    setTimeout(() => successMessage.value = '', 5000)
  } catch (error: any) {
    errorMessage.value = error.message
    setTimeout(() => errorMessage.value = '', 5000)
  } finally {
    isLoading.value = false
  }
}

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    const payload = parseJwt(token)
    if (payload?.email) {
      username.value = payload.email.split('@')[0]
      adminEmail.value = payload.email
    }
  }
  fetchUsers()
})
</script>

<style scoped>
/* Custom animations and transitions */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}

/* Smooth focus transitions */
input:focus, select:focus {
  transform: translateY(-1px);
}

/* Custom scrollbar for table */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>