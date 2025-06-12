<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <!-- Login Card -->
      <div class="bg-white rounded-2xl shadow-sm p-8 space-y-6">
        <!-- Header -->
        <div class="text-center space-y-2">
          <h1 class="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p class="text-gray-600">Sign in to your account.</p>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="p-3 bg-red-50 border border-red-200 rounded-xl">
          <p class="text-red-600 text-sm">{{ errorMessage }}</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="submitLogin" class="space-y-4">
          <!-- Email Input -->
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="Enter your email"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
            />
          </div>

          <!-- Password Input -->
          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              placeholder="Enter your password"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-gray-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading">Signing In...</span>
            <span v-else>Sign In</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        <!-- Register Link -->
        <div class="text-center">
          <span class="text-gray-600">Don't have an account? </span>
          <NuxtLink
            to="/register"
            class="text-gray-900 font-medium hover:text-gray-700 transition-colors duration-200"
          >
            Create Account
          </NuxtLink>
        </div>
      </div>

      <!-- Back to Home -->
      <div class="text-center mt-6">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Game Library
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useNuxtApp } from 'nuxt/app'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

// Fallback for router in case useRouter is undefined
const router = useRouter() || useNuxtApp().$router

function parseJwt(token: string) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format')
    }

    const base64Url = parts[1]
    if (!base64Url) {
      throw new Error('Invalid JWT payload')
    }
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (e) {
    return null
  }
}

function isTokenExpired(token: string): boolean {
  const payload = parseJwt(token)
  if (!payload || !payload.exp) {
    return true // Treat as expired if no expiration or invalid payload
  }
  const currentTime = Math.floor(Date.now() / 1000) // Current time in seconds
  return payload.exp < currentTime
}

onMounted(() => {
  const existingToken = localStorage.getItem('token')
  if (existingToken) {
    if (!isTokenExpired(existingToken)) {
      const payload = parseJwt(existingToken)
      if (payload && payload.role) {
        const role = payload.role.toLowerCase()
        if (role === 'admin') {
          router.push('/admin')
        } else if (role === 'user') {
          router.push('/user')
        }
      }
    } else {
      localStorage.removeItem('token')
    }
  }
})

async function submitLogin() {
  errorMessage.value = ''
  isLoading.value = true

  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Login failed')
    }

    // Store token from data.token
    const token = data.data.token
    localStorage.setItem('token', token)

    // Decode JWT to get role
    const payload = parseJwt(token)
    if (!payload || !payload.role) {
      throw new Error('Invalid token payload')
    }

    // Redirect based on role (convert to lowercase for consistency)
    const role = payload.role.toLowerCase()
    if (role === 'admin') {
      await router.push('/admin')
    } else if (role === 'user') {
      await router.push('/user')
    } else {
      throw new Error('Unknown role')
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'An error occurred during login'
  } finally {
    isLoading.value = false
  }
}
</script>