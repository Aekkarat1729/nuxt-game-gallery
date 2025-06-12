<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <!-- Back Button -->
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

    <!-- Loading & Error States -->
    <div v-if="error" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p class="text-gray-600">{{ error }}</p>
      </div>
    </div>

    <div v-else-if="isLoading" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <div class="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-gray-600">Loading...</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="game" class="max-w-7xl mx-auto px-6 py-8 space-y-12">
      
      <!-- Hero Section -->
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              {{ game.name }}
            </h1>
            <p v-if="game.released" class="text-gray-500 mt-2">
              {{ formatDate(game.released) }}
            </p>
          </div>
          <div v-if="game.rating" class="flex items-center gap-2">
            <div class="flex text-yellow-400">
              <svg v-for="i in 5" :key="i" class="w-5 h-5" :class="i <= Math.round(game.rating) ? 'fill-current' : 'fill-gray-200'" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span class="text-gray-600 font-medium">{{ game.rating.toFixed(1) }}</span>
          </div>
        </div>
      </div>

      <!-- Image Gallery -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
        <!-- Main Image -->
        <div class="relative aspect-video bg-gray-100">
          <img
            :src="allImages[currentIndex].url"
            :alt="`${game.name} Image ${currentIndex + 1}`"
            class="w-full h-full object-cover cursor-pointer"
            @click="openModal(currentIndex)"
            @error="onImageError"
          />
          
          <!-- Navigation Buttons -->
          <button
            v-if="allImages.length > 1"
            @click="prevImage"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:shadow-md transition-all duration-200 flex items-center justify-center"
          >
            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            v-if="allImages.length > 1"
            @click="nextImage"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:shadow-md transition-all duration-200 flex items-center justify-center"
          >
            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Image Counter -->
          <div v-if="allImages.length > 1" class="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            {{ currentIndex + 1 }} / {{ allImages.length }}
          </div>
        </div>

        <!-- Thumbnails -->
        <div v-if="allImages.length > 1" class="p-4 bg-gray-50/50">
          <div class="flex gap-2 overflow-x-auto pb-2">
            <button
              v-for="(image, index) in allImages"
              :key="index"
              class="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200"
              :class="currentIndex === index ? 'border-gray-900' : 'border-transparent hover:border-gray-300'"
              @click="currentIndex = index"
            >
              <img
                :src="image.url"
                :alt="`Thumbnail ${index + 1}`"
                class="w-full h-full object-cover"
                @error="onImageError"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid lg:grid-cols-3 gap-8">
        
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          
          <!-- Description -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">About</h2>
            <p v-if="game.description" class="text-gray-700 leading-relaxed">
              {{ game.description }}
            </p>
            <p v-else class="text-gray-500 italic">No description available</p>
          </div>

          <!-- Genres -->
          <div v-if="additionalData.genres?.length" class="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Genres</h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="genre in additionalData.genres"
                :key="genre.id"
                class="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors duration-200"
              >
                {{ genre.name }}
              </span>
            </div>
          </div>

          <!-- Tags -->
          <div v-if="additionalData.tags?.length" class="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in additionalData.tags.slice(0, 12)"
                :key="tag.id"
                class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200"
              >
                {{ tag.name }}
              </span>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div>
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60 space-y-6 sticky top-24">
            <h2 class="text-xl font-semibold text-gray-900">Game Info</h2>
            
            <div class="space-y-4">
              <div v-if="game.metacritic">
                <div class="text-sm text-gray-500 mb-1">Metacritic Score</div>
                <div class="flex items-center gap-2">
                  <div class="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                       :class="game.metacritic >= 75 ? 'bg-green-500' : game.metacritic >= 50 ? 'bg-yellow-500' : 'bg-red-500'">
                    {{ game.metacritic }}
                  </div>
                </div>
              </div>

              <div v-if="additionalData.platforms?.length">
                <div class="text-sm text-gray-500 mb-2">Platforms</div>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="platform in additionalData.platforms.slice(0, 6)"
                    :key="platform.id"
                    class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    {{ platform.name }}
                  </span>
                </div>
              </div>

              <div v-if="game.esrb">
                <div class="text-sm text-gray-500 mb-1">ESRB Rating</div>
                <div class="text-gray-900 font-medium">{{ game.esrb }}</div>
              </div>

              <div v-if="game.website">
                <div class="text-sm text-gray-500 mb-1">Website</div>
                <a
                  :href="game.website"
                  target="_blank"
                  class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  <span class="text-sm">Visit Website</span>
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="closeModal">
      <div class="relative max-w-6xl w-full">
        <img
          :src="allImages[modalImageIndex].url"
          :alt="`${game.name} Image ${modalImageIndex + 1}`"
          class="w-full h-auto rounded-lg shadow-2xl"
          @error="onImageError"
        />
        
        <!-- Close Button -->
        <button
          @click="closeModal"
          class="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center"
        >
          <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Navigation -->
        <button
          v-if="allImages.length > 1"
          @click.stop="prevModalImage"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center"
        >
          <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          v-if="allImages.length > 1"
          @click.stop="nextModalImage"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center"
        >
          <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { useFetch, useRuntimeConfig } from '#imports';

type Genre = { id: number; name: string };
type Platform = { id: number; name: string; slug: string };
type Tag = { id: number; name: string; slug: string };
type Screenshot = { id: number; url: string; gameId: number };

type Game = {
  id: number;
  rawgId: number;
  name: string;
  slug: string;
  description: string | null;
  metacritic: number | null;
  website: string | null;
  esrb: string | null;
  backgroundImage: string | null;
  released: string | null;
  rating: number | null;
  tags: string[];
};

type AdditionalData = {
  genres: Genre[];
  platforms: Platform[];
  tags: Tag[];
  screenshots: Screenshot[];
};

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const game = ref<Game | null>(null);
const additionalData = ref<AdditionalData | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);
const currentIndex = ref(0);
const showModal = ref(false);
const modalImageIndex = ref(0);

const allImages = computed(() => {
  const images = [];
  if (additionalData.value?.screenshots) {
    images.push(...additionalData.value.screenshots);
  }
  return images.length ? images : [{ id: 0, url: 'https://via.placeholder.com/800x450?text=No+Image', gameId: 0 }];
});

const navigateBack = () => router.back();

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + allImages.value.length) % allImages.value.length;
};

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % allImages.value.length;
};

const openModal = (index: number) => {
  modalImageIndex.value = index;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const prevModalImage = () => {
  modalImageIndex.value = (modalImageIndex.value - 1 + allImages.value.length) % allImages.value.length;
};

const nextModalImage = () => {
  modalImageIndex.value = (modalImageIndex.value + 1) % allImages.value.length;
};

const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
};

onMounted(async () => {
  try {
    isLoading.value = true;
    error.value = null;

    const rawSlug = route.params.slug;
    const slug = typeof rawSlug === 'string' ? rawSlug : rawSlug[0];

    const { data: gameData } = await useFetch('/games', {
      baseURL: 'http://localhost:3000',
    });
    const allGames = gameData.value?.data || [];
    game.value = allGames.find((g) => g.slug.toLowerCase() === slug.toLowerCase()) || null;

    if (game.value?.id) {
      const { data: additionalDataResponse } = await useFetch(`/game-details?gameId=${game.value.id}`, {
        baseURL: 'http://localhost:3000',
      });
      if (additionalDataResponse.value?.success && additionalDataResponse.value.data) {
        additionalData.value = additionalDataResponse.value.data;
      } else {
        throw new Error('Failed to fetch additional game details');
      }
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An unexpected error occurred';
  } finally {
    isLoading.value = false;
  }
});

function formatDate(dateStr: string | null) {
  return dateStr ? new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';
}
</script>

<style scoped>
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar for thumbnails */
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: #d1d5db #f3f4f6;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Backdrop blur support */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-xl {
    backdrop-filter: blur(16px);
  }
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }
}
</style>