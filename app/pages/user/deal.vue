<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <div class="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <button
          @click="navigateBack"
          class="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <svg class="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
          </svg>
          <span class="font-medium">Back</span>
        </button>
      </div>
    </div>
    <!-- Header Section -->
    <div class="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
      <div class="max-w-7xl mx-auto px-6 py-6">
        <div class="text-center space-y-4">
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Game Deals
          </h1>
          <p class="text-lg text-gray-600">
            Discover the best deals on your favorite games!
            <span class="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold ml-2 border border-blue-200">
              {{ dealCount }} games on sale !
            </span>
          </p>
          <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            <div class="relative">
              <select
                v-model="sortOption"
                class="bg-white border border-gray-300 text-gray-900 p-3 pr-10 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none cursor-pointer shadow-sm"
                @change="sortDeals"
              >
                <option value="nameAsc">Name A-Z</option>
                <option value="nameDesc">Name Z-A</option>
                <option value="priceAsc">Low to High Price</option>
                <option value="priceDesc">High to Low Price</option>
              </select>
              <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            <button
              @click="toggleCurrency"
              class="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200"
            >
              💱 Switch to {{ isThaiBaht ? 'USD' : 'THB' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <div class="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-gray-600">Loading amazing deals...</p>
      </div>
    </div>
    <!-- Deals Grid -->
    <div v-else class="max-w-7xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="deal in deals"
          :key="deal.id"
          class="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200/60 hover:shadow-lg hover:border-gray-300/60 transition-all duration-300 hover:-translate-y-1"
        >
          <div class="relative overflow-hidden aspect-video bg-gray-100" style="height: 192px;">
            <ClientOnly>
              <img
                :src="deal.game.backgroundImage || 'https://via.placeholder.com/400x225?text=No+Image'"
                :alt="deal.game.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                @error="onImageError"
              />
              <template #fallback>
                <div class="w-full h-full flex items-center justify-center bg-gray-200">
                  <span class="text-gray-500 text-sm">Image loading...</span>
                </div>
              </template>
            </ClientOnly>
            <div class="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              {{ (deal.savings).toFixed(0) }}% OFF
            </div>
            <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-lg text-xs font-medium">
              {{ deal.store.name }}
            </div>
          </div>
          <div class="p-5 space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
              {{ deal.game.name }}
            </h3>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-gray-500 line-through text-sm">
                  {{ formatCurrency(deal.normalPrice) }}
                </span>
                <div class="text-right">
                  <div class="text-2xl font-bold text-green-600">
                    {{ formatCurrency(deal.salePrice) }}
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-4 text-sm text-gray-500">
              <div v-if="deal.game.rating" class="flex items-center gap-1">
                <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{{ deal.game.rating.toFixed(1) }}</span>
              </div>
              <div v-if="deal.game.released" class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ formatDate(deal.game.released) }}</span>
              </div>
            </div>
            <div class="space-y-2">
              <a
                :href="`https://www.${deal.store.name.toLowerCase()}.com/deal/${deal.dealId}`"
                target="_blank"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl font-semibold text-center transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Buy Now
              </a>
              <div class="flex gap-2">
                <NuxtLink
                  v-if="isClient"
                  :to="`/detail/${deal.game.slug}`"
                  class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg font-medium text-center text-sm transition-all duration-200 flex items-center justify-center gap-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Details
                </NuxtLink>
                <button
                  @click="toggleWishlist(deal.gameId)"
                  :class="[
                    'flex-1 text-white py-2 px-3 rounded-lg font-medium text-sm transition-all duration-200 relative overflow-hidden flex items-center justify-center gap-1',
                    wishlist.includes(deal.gameId)
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-yellow-500 hover:bg-yellow-600'
                  ]"
                  :disabled="wishlistActionLoading === deal.gameId"
                >
                  <div v-if="wishlistActionLoading === deal.gameId" class="absolute inset-0 bg-white/20 animate-pulse rounded-lg"></div>
                  <svg class="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                  </svg>
                  <span class="relative z-10">
                    {{ wishlist.includes(deal.gameId) ? 'Added' : 'Wishlist' }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="errorMessage" class="fixed bottom-6 right-6 z-50">
      <div class="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl shadow-lg max-w-sm">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
            <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p class="font-medium">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

type Deal = {
  id: number
  dealId: string
  gameId: number
  storeId: number
  salePrice: number
  normalPrice: number
  savings: number
  dealRating: number
  addedAt: string
  store: {
    id: number
    name: string
    storeId: string
    isActive: boolean
  }
  game: {
    id: number
    rawgId: number
    name: string
    slug: string
    description: string
    metacritic: number
    website: string
    esrb: string
    backgroundImage: string
    released: string
    rating: number
    createdAt: string
    updatedAt: string
  }
}

type Favorite = {
  id: number // favoriteId
  gameId: number
  userId: number
  note: string
  createdAt: string
}

const deals = ref<Deal[]>([])
const errorMessage = ref('')
const sortOption = ref('nameAsc')
const isThaiBaht = ref(false)
const isLoading = ref(true)
const router = useRouter()
const wishlist = ref<number[]>([]) // เก็บ gameId ที่อยู่ใน wishlist
const wishlistActionLoading = ref<number | null>(null)
const favoritesMap = ref<Map<number, number>>(new Map()) // แมป gameId ไป favoriteId

const dealCount = computed(() => {
  return new Set(deals.value.map(deal => deal.gameId)).size
})

const formatCurrency = (price: number) => {
  const exchangeRate = 33
  const formattedPrice = isThaiBaht.value ? price * exchangeRate : price
  const currencySymbol = isThaiBaht.value ? '฿' : '$'
  return `${currencySymbol}${formattedPrice.toFixed(2)}`
}

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/400x225?text=No+Image'
}

const sortDeals = () => {
  deals.value.sort((a, b) => {
    switch (sortOption.value) {
      case 'nameAsc':
        return a.game.name.localeCompare(b.game.name)
      case 'nameDesc':
        return b.game.name.localeCompare(a.game.name)
      case 'priceAsc':
        return a.salePrice - b.salePrice
      case 'priceDesc':
        return b.salePrice - a.salePrice
      default:
        return 0
    }
  })
}

const toggleCurrency = () => {
  isThaiBaht.value = !isThaiBaht.value
}

const fetchWishlist = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      errorMessage.value = 'Please log in to load wishlist'
      return
    }
    const response = await fetch('http://localhost:3000/favorites', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) throw new Error('Failed to fetch wishlist')
    const data = await response.json()
    if (data.success && Array.isArray(data.data)) {
      wishlist.value = data.data.map((fav: Favorite) => fav.gameId)
      favoritesMap.value = new Map(data.data.map((fav: Favorite) => [fav.gameId, fav.id]))
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'An error occurred while fetching wishlist'
  }
}

const addToWishlist = async (gameId: number) => {
  try {
    wishlistActionLoading.value = gameId
    const token = localStorage.getItem('token')
    if (!token) {
      errorMessage.value = 'Please log in to add to wishlist'
      return
    }
    const response = await fetch('http://localhost:3000/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        gameId: gameId,
        note: '',
      }),
    })
    if (!response.ok) throw new Error('Failed to add to wishlist')
    const data = await response.json()
    if (data.success && data.data && data.data.id) {
      if (!wishlist.value.includes(gameId)) {
        wishlist.value.push(gameId)
      }
      favoritesMap.value.set(gameId, data.data.id) // อัปเดต favoriteId ใหม่
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'An error occurred while adding to wishlist'
  } finally {
    wishlistActionLoading.value = null
  }
}

const removeFromWishlist = async (gameId: number) => {
  try {
    wishlistActionLoading.value = gameId
    const token = localStorage.getItem('token')
    if (!token) {
      errorMessage.value = 'Please log in to remove from wishlist'
      return
    }

    const favoriteId = favoritesMap.value.get(gameId)
    if (!favoriteId) {
      throw new Error('Favorite not found')
    }

    const response = await fetch(`http://localhost:3000/favorites/${favoriteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) throw new Error('Failed to remove from wishlist')
    const data = await response.json()
    if (data.success) {
      wishlist.value = wishlist.value.filter(id => id !== gameId)
      favoritesMap.value.delete(gameId) // ลบ favoriteId ออกจาก map
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'An error occurred while removing from wishlist'
  } finally {
    wishlistActionLoading.value = null
  }
}

const toggleWishlist = async (gameId: number) => {
  if (wishlist.value.includes(gameId)) {
    await removeFromWishlist(gameId)
  } else {
    await addToWishlist(gameId)
  }
}

async function fetchDeals() {
  try {
    isLoading.value = true
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3000/deals', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    })
    const data = await response.json()
    if (!response.ok) throw new Error('Failed to fetch deals')
    if (Array.isArray(data)) {
      processDeals(data)
    } else if (data.success && Array.isArray(data.data)) {
      processDeals(data.data)
    } else {
      throw new Error('Invalid response format')
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'An error occurred while fetching deals'
  } finally {
    isLoading.value = false
  }
}

function processDeals(rawDeals: Deal[]) {
  const dealMap = new Map<number, Deal[]>()
  rawDeals.forEach(deal => {
    if (!dealMap.has(deal.gameId)) dealMap.set(deal.gameId, [])
    dealMap.get(deal.gameId)!.push(deal)
  })
  const filteredDeals: Deal[] = []
  dealMap.forEach((gameDeals, gameId) => {
    const bestDeal = gameDeals.reduce((min, current) => (current.salePrice < min.salePrice ? current : min))
    filteredDeals.push(bestDeal)
  })
  deals.value = filteredDeals
  sortDeals()
}

const isClient = ref(false)

onMounted(async () => {
  isClient.value = true
  await Promise.all([fetchDeals(), fetchWishlist()]) // ดึง deals และ wishlist พร้อมกัน
})

const navigateBack = () => {
  router.back()
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

html {
  scroll-behavior: smooth;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-xl {
    backdrop-filter: blur(16px);
  }
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400;
}

.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

.group:hover .group-hover\:text-blue-600 {
  color: rgb(37 99 235);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>