<script setup lang="ts">
import moment from 'moment'
const { date, content, url, isLoading, errorMessage } = defineProps([
  'date',
  'content',
  'url',
  'isLoading',
  'errorMessage'
])

const underlineWall = (content: string) => {
  if (!content) return ''
  const underlinedText = content?.replace(
    /\b(wall)\b/gi,
    '<span style="text-decoration: underline;">$1</span>'
  )
  return underlinedText
}
</script>

<template>
  <div>
    <div class="card mt-5 bg-orange-200 rounded-xl p-5 mb-5">
      <h5 v-if="date" class="text-sm">
        {{ moment(new Date(date)).format('YYYY-DD-MM') }}
        {{ moment(new Date(date)).format('HH:mm:ss') }}
      </h5>
      <div v-else-if="isLoading" class="h-5 bg-gray-100 rounded-full w-40 mb-4"></div>

      <h1 v-if="url" class="my-3" v-html="underlineWall(content)"></h1>
      <div v-else-if="isLoading" class="h-16 bg-gray-100 rounded-md w-100 mb-2"></div>
      <h1 v-else-if="errorMessage">{{ errorMessage }}</h1>

      <h1 v-if="url" class="text-right text-xs">
        <a :href="url" target="_blank">Joke Page</a>
      </h1>
      <h1 v-else-if="isLoading" class="text-right text-xs">
        <div class="h-4 bg-gray-100 rounded-full w-20 float-end"></div>
      </h1>
    </div>
  </div>
</template>
