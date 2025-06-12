<template>
  <section class="relative min-h-screen bg-gray-50 px-4 py-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl p-8 mb-10 flex justify-between items-center shadow-lg">
        <div>
          <h1 class="text-4xl font-extrabold tracking-tight">Game Management</h1>
          <p class="text-lg mt-2 opacity-90">Manage your gaming platform's games.</p>
        </div>
        <button @click="router.push('/admin')" class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition transform active:scale-95">
          Back to Dashboard
        </button>
      </div>

      <!-- Messages -->
      <div v-if="errorMessage" class="p-4 bg-red-50 border border-red-200 rounded-xl mb-6">
        <p class="text-red-600 text-sm">{{ errorMessage }}</p>
      </div>
      <div v-if="successMessage" class="p-4 bg-green-50 border border-green-200 rounded-xl mb-6">
        <p class="text-green-600 text-sm">{{ successMessage }}</p>
      </div>

      <!-- Add Game Form -->
      <div class="bg-white rounded-xl shadow-md p-8 mb-10">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Add New Game</h2>
        <form @submit.prevent="addGame" class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input v-model.number="newGame.rawgId" type="number" placeholder="RAWG ID" class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
          <input v-model="newGame.name" type="text" placeholder="Game Name" class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
          <input v-model="newGame.slug" type="text" placeholder="Slug" class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
          <textarea v-model="newGame.description" placeholder="Description" class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" rows="4"></textarea>
          <input v-model.number="newGame.metacritic" type="number" placeholder="Metacritic Score" class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          <input v-model="newGame.website" type="url" placeholder="Website URL" class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          <input v-model="newGame.esrb" type="text" placeholder="ESRB Rating" class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          <input v-model="newGame.backgroundImage" type="url" placeholder="Background Image URL" class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          <input v-model="newGame.released" type="date" placeholder="Release Date" class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          <input v-model.number="newGame.rating" type="number" step="0.01" placeholder="Rating" class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          <button type="submit" :disabled="isLoading" class="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
            Add Game
          </button>
        </form>
      </div>

      <!-- Games Table -->
      <div class="bg-white rounded-xl shadow-md p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Games List</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-100">
                <th class="p-4 text-sm font-semibold text-gray-700">ID</th>
                <th class="p-4 text-sm font-semibold text-gray-700">RAWG ID</th>
                <th class="p-4 text-sm font-semibold text-gray-700">Name</th>
                <th class="p-4 text-sm font-semibold text-gray-700">Slug</th>
                <th class="p-4 text-sm font-semibold text-gray-700">Metacritic</th>
                <th class="p-4 text-sm font-semibold text-gray-700">ESRB</th>
                <th class="p-4 text-sm font-semibold text-gray-700">Released</th>
                <th class="p-4 text-sm font-semibold text-gray-700">Rating</th>
                <th class="p-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="game in games" :key="game.id" class="border-t hover:bg-gray-50">
                <td class="p-4 text-sm text-gray-600">{{ game.id }}</td>
                <td class="p-4 text-sm text-gray-600">{{ game.rawgId }}</td>
                <td class="p-4 text-sm text-gray-600">{{ game.name }}</td>
                <td class="p-4 text-sm text-gray-600">{{ game.slug }}</td>
                <td class="p-4 text-sm text-gray-600">{{ game.metacritic || '-' }}</td>
                <td class="p-4 text-sm text-gray-600">{{ game.esrb || '-' }}</td>
                <td class="p-4 text-sm text-gray-600">{{ game.released ? new Date(game.released).toLocaleDateString() : '-' }}</td>
                <td class="p-4 text-sm text-gray-600">{{ game.rating || '-' }}</td>
                <td class="p-4 text-sm flex gap-3">
                  <button @click="editGame(game.id)" class="text-indigo-600 hover:text-indigo-800 font-medium">Edit</button>
                  <button @click="deleteGame(game.id)" :disabled="isLoading" class="text-red-600 hover:text-red-800 font-medium disabled:opacity-50">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Edit Modal -->
      <div v-if="showEditModal && selectedGame" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-8 w-full max-w-md">
          <h3 class="text-xl font-semibold text-gray-900 mb-6">Edit Game</h3>
          <form @submit.prevent="saveGame" class="space-y-4">
            <input v-model.number="selectedGame.rawgId" type="number" placeholder="RAWG ID" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
            <input v-model="selectedGame.name" type="text" placeholder="Game Name" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
            <input v-model="selectedGame.slug" type="text" placeholder="Slug" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
            <textarea v-model="selectedGame.description" placeholder="Description" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" rows="4"></textarea>
            <input v-model.number="selectedGame.metacritic" type="number" placeholder="Metacritic Score" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
            <input v-model="selectedGame.website" type="url" placeholder="Website URL" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
            <input v-model="selectedGame.esrb" type="text" placeholder="ESRB Rating" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
            <input v-model="selectedGame.backgroundImage" type="url" placeholder="Background Image URL" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
            <input v-model="selectedGame.released" type="date" placeholder="Release Date" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
            <input v-model.number="selectedGame.rating" type="number" step="0.01" placeholder="Rating" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
            <div class="flex justify-end gap-3">
              <button type="button" @click="showEditModal = false" class="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition">Cancel</button>
              <button type="submit" :disabled="isLoading" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useNuxtApp } from 'nuxt/app'

const router = useRouter() || useNuxtApp().$router

const games = ref<Game[]>([])
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)
const newGame = ref({
  rawgId: 0,
  name: '',
  slug: '',
  description: '',
  metacritic: null as number | null,
  website: '',
  esrb: '',
  backgroundImage: '',
  released: '',
  rating: null as number | null,
})
const selectedGame = ref<Game | null>(null)
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

async function fetchGames() {
  try {
    isLoading.value = true
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3000/games', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    games.value = data.data
  } catch (error: any) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

async function addGame() {
  try {
    isLoading.value = true
    const token = localStorage.getItem('token')
    const payload = {
      ...newGame.value,
      metacritic: newGame.value.metacritic || undefined,
      website: newGame.value.website || undefined,
      esrb: newGame.value.esrb || undefined,
      backgroundImage: newGame.value.backgroundImage || undefined,
      released: newGame.value.released || undefined,
      rating: newGame.value.rating || undefined,
    }
    const response = await fetch('http://localhost:3000/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(payload),
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    games.value.push(data.data)
    successMessage.value = 'Game added successfully'
    newGame.value = {
      rawgId: 0,
      name: '',
      slug: '',
      description: '',
      metacritic: null,
      website: '',
      esrb: '',
      backgroundImage: '',
      released: '',
      rating: null,
    }
  } catch (error: any) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

async function editGame(gameId: number) {
  try {
    isLoading.value = true
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3000/games/${gameId}`, {
      
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    selectedGame.value = {
      ...data.data,
      released: data.data.released ? new Date(data.data.released).toISOString().split('T')[0] : '',
    }
    showEditModal.value = true
  } catch (error: any) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

async function saveGame() {
  if (!selectedGame.value) return
  try {
    isLoading.value = true
    const token = localStorage.getItem('token')
    const payload = {
      ...selectedGame.value,
      metacritic: selectedGame.value.metacritic || undefined,
      website: selectedGame.value.website || undefined,
      esrb: selectedGame.value.esrb || undefined,
      backgroundImage: selectedGame.value.backgroundImage || undefined,
      released: selectedGame.value.released || undefined,
      rating: selectedGame.value.rating || undefined,
    }
    const response = await fetch(`http://localhost:3000/games/${selectedGame.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(payload),
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    const index = games.value.findIndex(g => g.id === selectedGame.value!.id)
    if (index !== -1) games.value[index] = data.data
    successMessage.value = 'Game updated successfully'
    showEditModal.value = false
  } catch (error: any) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

async function deleteGame(gameId: number) {
  const game = games.value.find(g => g.id === gameId)
  if (!game) return
  const confirmed = window.confirm(`Are you sure you want to delete game "${game.name}"?`)
  if (!confirmed) return

  try {
    isLoading.value = true
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3000/games/${gameId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.message)
    games.value = games.value.filter(g => g.id !== gameId)
    successMessage.value = 'Game deleted successfully'
  } catch (error: any) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchGames()
})
</script>

<style scoped>
button {
  transition: all 0.2s ease-in-out;
}
</style>