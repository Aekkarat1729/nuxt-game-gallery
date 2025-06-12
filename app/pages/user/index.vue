<template>
  <section class="relative px-4 masonry-wrapper">
    <!-- 🔍 Search display (กลางจอ) -->
    <div class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <transition name="fade">
        <div
          v-if="showSearchText"
          class="text-white bg-black/70 px-4 py-2 rounded-lg shadow-md text-xl font-bold"
        >
          Searching: "{{ searchTerm }}"
        </div>
      </transition>
    </div>

    <div class="w-full masonry-container">
      <ul class="grid grid-cols-1 gap-4 lg:block">
        <!-- 🧱 Heading Block inside Masonry -->
        <li class="relative w-full masonry-item bg-black text-white p-0 mb-8 text-left">
          <div class="flex flex-col items-start space-y-3">
            <h1 class="text-7xl font-bold">Hi, User!</h1>

            <NuxtLink
              to="/user/deal"
              class="text-6xl font-bold mt-2 hover:text-green-400 transition duration-200 underline-offset-4 active:scale-95"
            >
              Deal 🕹️
            </NuxtLink>

            <NuxtLink
              to="/user/wishlist"
              class="text-6xl font-bold mt-2 hover:text-blue-400 transition duration-200 underline-offset-4 active:scale-95"
            >
              Wishlist
            </NuxtLink>

            <!-- ✅ ปรับตรงนี้ -->
            <button
              @click="logout"
              class="text-6xl font-bold text-red-400 mt-2 hover:text-red-300 transition duration-200 underline-offset-4 active:scale-95 appearance-none bg-transparent border-none p-0 text-left"
            >
              Logout
            </button>
          </div>
        </li>

        <!-- 🧱 Game Items -->
        <li
          v-for="game in filteredGames"
          :key="game.id"
          class="relative w-full group masonry-item"
        >
          <NuxtLink :to="`/detail/${game.slug}`">
            <img
              :src="game.backgroundImage || '/placeholder.jpg'"
              alt="Game image"
              class="h-auto w-full rounded-md transition-all duration-200 border-image brightness-[.8] hover:brightness-[.2] object-cover"
            />
            <div
              class="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 text-white text-center px-4 transition duration-300"
            >
              <h2 class="text-2xl font-bold drop-shadow">{{ game.name }}</h2>
              <p class="text-lg text-gray-200 drop-shadow">
                {{ game.released?.slice(0, 10) || 'Unknown' }}
              </p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useNuxtApp } from 'nuxt/app'
import { useFetch, useRuntimeConfig } from '#imports'

type Game = {
  id: number
  name: string
  slug: string
  backgroundImage: string
  released: string
}

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = copy[i] as T
    copy[i] = copy[j] as T
    copy[j] = temp
  }
  return copy
}

const config = useRuntimeConfig()
const { data: response } = await useFetch<{ success: boolean; data: Game[] }>('/games', {
  baseURL: config.public.apiBase,
})

const allGames = computed(() => {
  const shuffledGames = shuffleArray(response.value?.data || [])
  return shuffledGames.slice(0, 50) // จำกัดจำนวนเกมเป็น 50 เกมแบบสุ่ม
})

const searchTerm = ref('')
const showSearchText = ref(false)
let hideTimeout: ReturnType<typeof setTimeout> | null = null

const filteredGames = computed(() => {
  if (!searchTerm.value) return allGames.value
  return allGames.value.filter(game =>
    game.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

function handleKeyPress(e: KeyboardEvent) {
  const key = e.key

  // 🚫 ป้องกัน scroll เมื่อกด spacebar
  if (key === ' ') {
    e.preventDefault()
  }

  // 👇 แสดงแถบค้นหา
  showSearchText.value = true

  // ⌫ ลบตัวอักษร
  if (key === 'Backspace') {
    searchTerm.value = searchTerm.value.slice(0, -1)
  }
  // 🔤 เพิ่มตัวอักษรที่กด
  else if (key.length === 1) {
    searchTerm.value += key
  }

  // ⏲️ รีเซต timeout ทุกครั้งที่พิมพ์
  if (hideTimeout) clearTimeout(hideTimeout)
  hideTimeout = setTimeout(() => {
    showSearchText.value = false
  }, 2000)
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})

// Fallback for router in case useRouter is undefined
const router = useRouter() || useNuxtApp().$router

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped lang="postcss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (min-width: 768px) {
  .border-image {
    border-width: 1.15px;
    border-color: rgba(255, 255, 255, 0.1);
  }
}

@media screen and (min-width: 1024px) {
  .masonry-wrapper {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .masonry-container {
    column-count: 3;
    column-gap: 32px;
    column-fill: balance;
    margin-top: 2.5rem;
  }

  .masonry-item {
    display: inline-block;
    margin-bottom: 32px;
    break-inside: avoid;
    width: 100%;
  }
}
</style>