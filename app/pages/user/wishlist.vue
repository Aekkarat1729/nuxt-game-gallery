<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <!-- Back Navigation -->
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
            My Wishlist
          </h1>
          <p class="text-lg text-gray-600">
            Your collection of Wishlist games!
            <span class="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold ml-2 border border-blue-200">
              {{ favoriteCount }} games saved
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <div class="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-gray-600">Loading your Wishlist...</p>
      </div>
    </div>

    <!-- Favorites Grid -->
    <div v-else class="max-w-7xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="favorite in filteredFavorites"
          :key="favorite.game.id"
          class="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200/60 hover:shadow-lg hover:border-gray-300/60 transition-all duration-300 hover:-translate-y-1"
        >
          <!-- Image Container -->
          <div class="relative overflow-hidden aspect-video bg-gray-100" style="height: 192px;">
            <ClientOnly>
              <img
                :src="favorite.game.backgroundImage || 'https://via.placeholder.com/400x225?text=No+Image'"
                :alt="favorite.game.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                @error="onImageError"
              />
              <template #fallback>
                <div class="w-full h-full flex items-center justify-center bg-gray-200">
                  <span class="text-gray-500 text-sm">Image loading...</span>
                </div>
              </template>
            </ClientOnly>
          </div>

          <!-- Content -->
          <div class="p-5 space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
              {{ favorite.game.name }}
            </h3>

            <!-- Game Info -->
            <div class="flex items-center gap-4 text-sm text-gray-500">
              <div v-if="favorite.game.rating" class="flex items-center gap-1">
                <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{{ favorite.game.rating.toFixed(1) }}</span>
              </div>
              <div v-if="favorite.game.released" class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ formatDate(favorite.game.released) }}</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-2">
              <NuxtLink
                :to="`/detail/${favorite.game.slug}`"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl font-semibold text-center transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Details
              </NuxtLink>

              <button
                @click="removeFavorite(favorite.id)"
                :disabled="wishlistActionLoading === favorite.id"
                class="w-full text-white py-2 px-3 rounded-lg font-medium text-sm transition-all duration-200 relative overflow-hidden flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600"
              >
                <div v-if="wishlistActionLoading === favorite.id" class="absolute inset-0 bg-white/20 animate-pulse rounded-lg"></div>
                <svg class="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                <span class="relative z-10">Remove</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Error Message -->
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useNuxtApp } from 'nuxt/app'
import { useFetch, useRuntimeConfig } from '#imports'

type Favorite = {
  id: number
  userId: number
  gameId: number
  note: string
  createdAt: string
  game: {
    id: number
    rawgId: number
    name: string
    slug: string
    description: string
    metacritic: number
    website: string
    esrb: string | null
    backgroundImage: string
    released: string
    rating: number
    createdAt: string
    updatedAt: string
  }
}

const config = useRuntimeConfig()
const favorites = ref<Favorite[]>([])
const searchTerm = ref('')
const showSearchText = ref(false)
const isLoading = ref(true)
const errorMessage = ref('')
const wishlistActionLoading = ref<number | null>(null)
let hideTimeout: ReturnType<typeof setTimeout> | null = null

const favoriteCount = computed(() => favorites.value.length)

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/400x225?text=No+Image'
}

const filteredFavorites = computed(() => {
  if (!searchTerm.value) return favorites.value
  return favorites.value.filter(favorite =>
    favorite.game.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

function handleKeyPress(e: KeyboardEvent) {
  const key = e.key

  if (key === ' ') {
    e.preventDefault()
  }

  showSearchText.value = true

  if (key === 'Backspace') {
    searchTerm.value = searchTerm.value.slice(0, -1)
  } else if (key.length === 1) {
    searchTerm.value += key
  }

  if (hideTimeout) clearTimeout(hideTimeout)
  hideTimeout = setTimeout(() => {
    showSearchText.value = false
  }, 2000)
}

onMounted(async () => {
  window.addEventListener('keydown', handleKeyPress)
  const token = localStorage.getItem('token')
  if (token) {
    try {
      isLoading.value = true
      const { data: response } = await useFetch<{ success: boolean; message: string; data: Favorite[] }>('/favorites', {
        baseURL: config.public.apiBase,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.value?.success) {
        favorites.value = response.value.data || []
      } else {
        errorMessage.value = 'Failed to load favorites'
      }
    } catch (error: any) {
      errorMessage.value = error.message || 'An error occurred while fetching favorites'
    } finally {
      isLoading.value = false
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})

const router = useRouter() || useNuxtApp().$router

async function removeFavorite(favoriteId: number) {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      wishlistActionLoading.value = favoriteId
      const response = await fetch(`${config.public.apiBase}/favorites/${favoriteId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        favorites.value = favorites.value.filter(favorite => favorite.id !== favoriteId)
      } else {
        throw new Error('Failed to remove favorite')
      }
    } catch (error: any) {
      errorMessage.value = error.message || 'An error occurred while removing favorite'
    } finally {
      wishlistActionLoading.value = null
    }
  }
}

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}

const navigateBack = () => {
  router.back()
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Text Clamp */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Backdrop blur support */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-xl {
    backdrop-filter: blur(16px);
  }
}

/* Custom scrollbar */
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

/* Hover effects */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

.group:hover .group-hover\:text-blue-600 {
  color: rgb(37 99 235);
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Pulse animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>