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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Deal Management
                </h1>
                <p class="text-gray-600 mt-1">View and manage your gaming platform's deals</p>
              </div>
            </div>
            <button @click="router.push('/admin')" 
                    class="group flex items-center space-x-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-500 text-indigo-600 hover:text-white rounded-xl transition-all duration-200 border border-indigo-200 hover:border-indigo-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              <span class="font-medium">Back to Dashboard</span>
            </button>
          </div>
        </div>

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

        <!-- Add Deal Form -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg class="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add New Deal
          </h2>
          <form @submit.prevent="addDeal" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div class="relative">
              <input v-model="newDeal.dealId" type="text" placeholder="Deal ID" 
                     class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required />
              <svg class="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10h16V7H4zm4 6h8m-8 2h4m6 0h2"></path>
              </svg>
            </div>
            <select v-model.number="newDeal.gameId" 
                    class="w-full py-3 px-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required>
              <option v-for="game in games" :key="game.id" :value="game.id">{{ game.name }}</option>
            </select>
            <select v-model.number="newDeal.storeId" 
                    class="w-full py-3 px-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required>
              <option v-for="store in stores" :key="store.id" :value="store.id">{{ store.name }}</option>
            </select>
            <div class="relative">
              <input v-model.number="newDeal.salePrice" type="number" step="0.01" placeholder="Sale Price" 
                     class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required />
              <svg class="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div class="relative">
              <input v-model.number="newDeal.normalPrice" type="number" step="0.01" placeholder="Normal Price" 
                     class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required />
              <svg class="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div class="relative">
              <input v-model.number="newDeal.savings" type="number" step="0.01" placeholder="Savings (%)" 
                     class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required />
              <svg class="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10m0 0v10m0-10L3 21"></path>
              </svg>
            </div>
            <div class="relative">
              <input v-model.number="newDeal.dealRating" type="number" step="0.1" placeholder="Deal Rating" 
                     class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" />
              <svg class="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.365 2.684a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.364-2.684a1 1 0 00-1.176 0l-3.364 2.684c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L3.95 9.384c-.784-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z"></path>
              </svg>
            </div>
            <button type="submit" :disabled="isLoading" 
                    class="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center col-span-full sm:col-span-1">
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Add Deal
            </button>
          </form>
        </div>

        <!-- Deals Table -->
        <div class="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl overflow-hidden">
          <div class="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-200/50">
            <div class="flex items-center space-x-3">
              <div class="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-900">Deals List</h2>
            </div>
          </div>
          <div class="p-8">
            <div v-if="isLoading" class="text-center py-4 text-gray-600 flex items-center justify-center">
              <svg class="animate-spin h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </div>
            <div v-else-if="errorMessage" class="text-center py-4 text-red-600">
              {{ errorMessage }}
            </div>
            <div v-else-if="deals.length === 0" class="text-center py-4 text-gray-600">
              No deals available.
            </div>
            <div v-else class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Deal ID</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Game</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Store</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sale Price</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Normal Price</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Savings (%)</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Deal Rating</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Added At</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="deal in deals" :key="deal.id" class="hover:bg-gray-50 transition-colors duration-150">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">#{{ deal.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ deal.dealId }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ deal.game?.name || 'N/A' }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ deal.store?.name || 'N/A' }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ deal.salePrice }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ deal.normalPrice }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ deal.savings }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ deal.dealRating || '-' }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {{ new Date(deal.addedAt).toLocaleDateString('th-TH') }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <div class="flex space-x-3">
                        <button @click="editDeal(deal.id)" 
                                class="text-indigo-600 hover:text-indigo-800 font-medium hover:bg-indigo-50 px-2 py-1 rounded-lg transition-all duration-150">
                          Edit
                        </button>
                        <button @click="deleteDeal(deal.id)" :disabled="isLoading" 
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

        <!-- Edit Modal -->
        <div v-if="showEditModal && selectedDeal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
            <div class="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-t-2xl p-6">
              <h3 class="text-xl font-bold flex items-center">
                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Edit Deal
              </h3>
            </div>
            <form @submit.prevent="saveDeal" class="p-6 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Deal ID</label>
                <input v-model="selectedDeal.dealId" type="text" placeholder="Deal ID" 
                       class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Game</label>
                <select v-model.number="selectedDeal.gameId" 
                        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required>
                  <option v-for="game in games" :key="game.id" :value="game.id">{{ game.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Store</label>
                <select v-model.number="selectedDeal.storeId" 
                        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required>
                  <option v-for="store in stores" :key="store.id" :value="store.id">{{ store.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Sale Price</label>
                <input v-model.number="selectedDeal.salePrice" type="number" step="0.01" placeholder="Sale Price" 
                       class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Normal Price</label>
                <input v-model.number="selectedDeal.normalPrice" type="number" step="0.01" placeholder="Normal Price" 
                       class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Savings (%)</label>
                <input v-model.number="selectedDeal.savings" type="number" step="0.01" placeholder="Savings (%)" 
                       class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Deal Rating</label>
                <input v-model.number="selectedDeal.dealRating" type="number" step="0.1" placeholder="Deal Rating" 
                       class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" />
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
import { useRouter } from 'vue-router'

const router = useRouter()

const deals = ref<Deal[]>([])
const games = ref<Game[]>([])
const stores = ref<Store[]>([])
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)
const newDeal = ref({
  dealId: '',
  gameId: 0,
  storeId: 0,
  salePrice: 0,
  normalPrice: 0,
  savings: 0,
  dealRating: null as number | null,
})
const selectedDeal = ref<Deal | null>(null)
const showEditModal = ref(false)

type Game = {
  id: number
  rawgId: number
  name: string
  slug: string
  description: string | null
  metacritic: number | null
  website: string | null
  esrb: string | null
  backgroundImage: string | null
  released: string | null
  rating: number | null
  createdAt: string
  updatedAt: string
}

type Store = {
  id: number
  name: string
  storeId: string
  isActive: boolean
}

type Deal = {
  id: number
  dealId: string
  gameId: number
  storeId: number
  salePrice: number
  normalPrice: number
  savings: number
  dealRating: number | null
  addedAt: string
  game: Game
  store: Store
}

const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

async function checkAuth() {
  const token = localStorage.getItem('token')
  if (!token) {
    errorMessage.value = 'Please log in to access this page'
    router.push('/login')
    return false
  }
  return true
}

async function fetchGames() {
  if (!(await checkAuth())) return
  try {
    isLoading.value = true
    const token = localStorage.getItem('token')
    const response = await fetch(`${apiBase}/games`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    games.value = data
  } catch (error: any) {
    errorMessage.value = `Failed to fetch games: ${error.message}`
  } finally {
    isLoading.value = false
  }
}

async function fetchStores() {
  if (!(await checkAuth())) return
  try {
    isLoading.value = true
    const token = localStorage.getItem('token')
    const response = await fetch(`${apiBase}/stores`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    stores.value = data
  } catch (error: any) {
    errorMessage.value = `Failed to fetch stores: ${error.message}`
  } finally {
    isLoading.value = false
  }
}

async function fetchDeals() {
  if (!(await checkAuth())) return
  try {
    isLoading.value = true
    const token = localStorage.getItem('token')
    const response = await fetch(`${apiBase}/deals`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    deals.value = data
  } catch (error: any) {
    errorMessage.value = `Failed to fetch deals: ${error.message}`
  } finally {
    isLoading.value = false
  }
}

async function addDeal() {
  if (!(await checkAuth())) return
  try {
    isLoading.value = true
    const token = localStorage.getItem('token')
    const payload = {
      ...newDeal.value,
      dealRating: newDeal.value.dealRating || undefined,
    }
    const response = await fetch(`${apiBase}/deals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    deals.value.push(data)
    successMessage.value = 'Deal added successfully'
    newDeal.value = {
      dealId: '',
      gameId: 0,
      storeId: 0,
      salePrice: 0,
      normalPrice: 0,
      savings: 0,
      dealRating: null,
    }
    setTimeout(() => (successMessage.value = ''), 3000)
  } catch (error: any) {
    errorMessage.value = `Failed to add deal: ${error.message}`
  } finally {
    isLoading.value = false
  }
}

async function editDeal(dealId: number) {
  if (!(await checkAuth())) return
  try {
    isLoading.value = true
    const token = localStorage.getItem('token')
    const response = await fetch(`${apiBase}/deals/${dealId}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    selectedDeal.value = data
    showEditModal.value = true
  } catch (error: any) {
    errorMessage.value = `Failed to fetch deal: ${error.message}`
  } finally {
    isLoading.value = false
  }
}

async function saveDeal() {
  if (!(await checkAuth()) || !selectedDeal.value) return
  try {
    isLoading.value = true
    const token = localStorage.getItem('token')
    const payload = {
      ...selectedDeal.value,
      dealRating: selectedDeal.value.dealRating || undefined,
    }
    const response = await fetch(`${apiBase}/deals/${selectedDeal.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    const index = deals.value.findIndex((d) => d.id === selectedDeal.value!.id)
    if (index !== -1) deals.value[index] = data
    successMessage.value = 'Deal updated successfully'
    showEditModal.value = false
    setTimeout(() => (successMessage.value = ''), 3000)
  } catch (error: any) {
    errorMessage.value = `Failed to update deal: ${error.message}`
  } finally {
    isLoading.value = false
  }
}

async function deleteDeal(dealId: number) {
  if (!(await checkAuth())) return
  const deal = deals.value.find((d) => d.id === dealId)
  if (!deal) return
  const confirmed = window.confirm(`Are you sure you want to delete deal "${deal.dealId}"?`)
  if (!confirmed) return

  try {
    isLoading.value = true
    const token = localStorage.getItem('token')
    const response = await fetch(`${apiBase}/deals/${dealId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
    }
    deals.value = deals.value.filter((d) => d.id !== dealId)
    successMessage.value = 'Deal deleted successfully'
    setTimeout(() => (successMessage.value = ''), 3000)
  } catch (error: any) {
    errorMessage.value = `Failed to delete deal: ${error.message}`
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchGames()
  fetchStores()
  fetchDeals()
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