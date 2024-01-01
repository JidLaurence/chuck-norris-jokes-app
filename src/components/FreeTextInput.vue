<script setup lang="ts">
import { ref } from 'vue'
import LoadingSvg from '@components/LoadingSvg.vue'

const emit = defineEmits(['value'])
const { isLoading } = defineProps(['isLoading'])

const input = ref('')
</script>

<template>
  <form>
    <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
    <div class="relative">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          class="w-4 h-4 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        v-model="input"
        type="search"
        id="search"
        class="block w-full p-4 ps-10 text-sm rounded-lg"
        placeholder="Free Text"
        required
        :disabled="isLoading"
      />
      <button
        type="button"
        class="text-white absolute end-2.5 bottom-2.5 bg-amber-600 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-6 py-2"
        @click="$emit('value', input)"
        :class="isLoading && 'cursor-not-allowed'"
        :disabled="isLoading"
      >
        <LoadingSvg v-if="isLoading" />
        Search
      </button>
    </div>
  </form>
</template>
