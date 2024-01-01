<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps(['dataLength'])
const emit = defineEmits(['changePage'])

const pageLength = computed(() => props.dataLength)
const currentPage = ref(0)

const changePage = (type: 'minus' | 'add') => {
  if (
    (type === 'minus' && currentPage.value < 1) ||
    (type === 'add' && currentPage.value >= pageLength.value - 1)
  )
    return

  if (type == 'minus') currentPage.value -= 1
  else currentPage.value += 1

  emit('changePage', currentPage.value)
}
</script>

<template>
  <nav>
    <ul class="inline-flex -space-x-px text-sm">
      <li>
        <a
          href="#"
          class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
          @click="changePage('minus')"
        >
          Previous
        </a>
      </li>

      <li>
        <a
          href="#"
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300"
        >
          {{ pageLength ? currentPage + 1 : 0 }} of {{ pageLength }}
        </a>
      </li>

      <li>
        <a
          href="#"
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
          @click="changePage('add')"
        >
          Next
        </a>
      </li>
    </ul>
  </nav>
</template>
