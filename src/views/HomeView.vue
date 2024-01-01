<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import stores from '@stores'

import CategoryOptions from '@components/CategoryOptions.vue'
import FreeTextInput from '@components/FreeTextInput.vue'
import TypeRadioButton from '@components/TypeRadioButton.vue'
import ContentCard from '@components/contentCard.vue'
import PagePagination from '@components/PagePagination.vue'

const type = ref('category')
const changeType = (value: string) => {
  if (!value) return
  localStorage.setItem('categoryType', value)
  type.value = value
}

const selectedJokes = computed(() => stores.state.selectedJokes)
const searchJokesByCategory = async (value: string) => {
  if (!value) return
  await stores.dispatch('getRandomJokes', { category: value })
}
const jokes = computed(() => stores.state.jokes)
const searchJokesByFreeText = async (value: string) => {
  if (!value) return
  await stores.dispatch('getFreeTextJokes', value)
}

const changePage = (pageNumber: number) => {
  stores.commit('selectJokes', pageNumber)
}

const isLoading = computed(() => stores.state.isLoadJokes)
const errorMessage = computed(() => stores.state.errorMessage)

onMounted(async () => {
  stores.dispatch('getRandomJokes')
  stores.dispatch('getCategoryJokes')
})
</script>

<template>
  <main>
    <div class="bg-white">
      <div class="relative isolate px-6 lg:px-8">
        <div
          class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style="
              clip-path: polygon(
                74.1% 44.1%,
                100% 61.6%,
                97.5% 26.9%,
                85.5% 0.1%,
                80.7% 2%,
                72.5% 32.5%,
                60.2% 62.4%,
                52.4% 68.1%,
                47.5% 58.3%,
                45.2% 34.5%,
                27.5% 76.7%,
                0.1% 64.9%,
                17.9% 100%,
                27.6% 76.8%,
                76.1% 97.7%,
                74.1% 44.1%
              );
            "
          ></div>
        </div>
        <div class="mx-auto max-w-2xl py-11 sm:py-28">
          <div class="text-center">
            <img src="@assets/img/logo.png" class="mx-auto block w-48" />
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Chuck Norris Jokes
            </h1>
            <p class="mt-1 mb-5 text-lg leading-8 text-gray-600">
              Jokes at Your Fingertips: Search here for a laugh.
            </p>
            <CategoryOptions
              v-if="type == 'category'"
              @value="searchJokesByCategory"
              :isLoading="isLoading"
            />
            <FreeTextInput @value="searchJokesByFreeText" :isLoading="isLoading" v-else />

            <TypeRadioButton @value="changeType" />
          </div>
          <!---- CARD ------->
          <ContentCard
            :date="selectedJokes.created_at"
            :content="selectedJokes.value"
            :url="selectedJokes.url"
            :isLoading="isLoading"
            :errorMessage="errorMessage"
          />
          <PagePagination
            v-if="type == 'freeText'"
            :dataLength="jokes?.length || 0"
            @changePage="changePage"
          />
        </div>
        <!---- BG  -->
        <div
          class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style="
              clip-path: polygon(
                74.1% 44.1%,
                100% 61.6%,
                97.5% 26.9%,
                85.5% 0.1%,
                80.7% 2%,
                72.5% 32.5%,
                60.2% 62.4%,
                52.4% 68.1%,
                47.5% 58.3%,
                45.2% 34.5%,
                27.5% 76.7%,
                0.1% 64.9%,
                17.9% 100%,
                27.6% 76.8%,
                76.1% 97.7%,
                74.1% 44.1%
              );
            "
          ></div>
        </div>
      </div>
    </div>
  </main>
</template>
