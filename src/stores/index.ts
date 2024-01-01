import Vuex from 'vuex'
import axios from '@axios'

const validateError = (state: any, error: any) => {
  if (error?.response?.data?.message) state.errorMessage = error?.response.data.message
  else if (error?.data?.message) state.errorMessage = error.data.message
  else state.errorMessage = 'Error, Please try again'
}

const store = new Vuex.Store({
  state: {
    data: [],
    categories: [],
    selectedJokes: {
      categories: [],
      created_at: '',
      icon_url: '',
      id: '',
      updated_at: '',
      url: '',
      value: ''
    },
    jokes: [],
    isLoadJokes: false,
    errorMessage: ''
  },
  mutations: {
    isLoadJokes(state, isTrue = false) {
      state.isLoadJokes = isTrue
    },
    clearJokes(state) {
      state.selectedJokes = {
        categories: [],
        created_at: '',
        icon_url: '',
        id: '',
        updated_at: '',
        url: '',
        value: ''
      }
    },
    selectJokes(state, pageNumber) {
      state.selectedJokes = state.jokes[pageNumber]
    }
  },
  actions: {
    getRandomJokes: async ({ state, commit }, query) => {
      commit('isLoadJokes', true)
      try {
        const params = new URLSearchParams(query).toString()
        const response = await axios.get('/v1/jokes/random?' + params)

        if (response?.data) state.selectedJokes = response.data
      } catch (error: any) {
        validateError(state, error)

        commit('clearJokes')
      }
      commit('isLoadJokes')
    },
    getCategoryJokes: async ({ state, commit }) => {
      commit('isLoadJokes', true)
      try {
        const response = await axios.get('/v1/jokes/category')
        if (response?.data) state.categories = response.data
      } catch (error: any) {
        validateError(state, error)

        state.categories = []
      }
      commit('isLoadJokes')
    },
    getFreeTextJokes: async ({ state, commit }, value) => {
      commit('isLoadJokes', true)
      try {
        const response = await axios.get(`/v1/jokes/free-text?query=${value}`)
        if (!response?.data?.result?.length) throw response

        state.jokes = response.data.result
        commit('selectJokes', 0)
      } catch (error: any) {
        validateError(state, error)

        commit('clearJokes')
        state.jokes = []
      }
      commit('isLoadJokes')
    }
  }
})

export default store
