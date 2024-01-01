<script setup lang="ts">
import { ref, computed } from 'vue'
import stores from '@stores'

import LoadingSvg from '@components/LoadingSvg.vue'

const { isLoading } = defineProps(['isLoading'])

const input = ref('')
const category = computed(() => stores.state.categories)

const upperCase = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
</script>

<template>
  <form>
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
      <select
        id="search"
        v-model="input"
        class="block p-4 ps-10 text-sm rounded-lg w-full"
        :disabled="isLoading"
      >
        <option value="">Select Category</option>
        <template v-for="(list, index) in category" :key="index">
          <option :value="list">{{ upperCase(list) }}</option>
        </template>
      </select>
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

<style scoped>
#search {
  appearance: none;
}
</style>
