<script setup lang="ts">
import { ref, onMounted } from 'vue'
const type = ref('category')
const emit = defineEmits(['value'])

onMounted(() => {
  type.value = localStorage.getItem('categoryType') || 'category'
  emit('value', type.value)
})
</script>

<template>
  <fieldset class="flex mt-5">
    <div class="flex items-center">
      <input
        id="type-1"
        type="radio"
        name="type"
        value="category"
        class="w-4 h-4 border-gray-300"
        checked
        v-model="type"
        @change="$emit('value', type)"
      />
      <label for="type-1" class="block ms-2 text-sm font-medium text-gray-900"> Category </label>
    </div>
    <div class="flex items-center ml-5">
      <input
        id="type-2"
        type="radio"
        name="type"
        value="freeText"
        class="w-4 h-4 border-gray-300"
        v-model="type"
        @change="$emit('value', type)"
      />
      <label for="type-2" class="block ms-2 text-sm font-medium text-gray-900"> Free text </label>
    </div>
  </fieldset>
</template>
