import axios from 'axios'
import _ from 'lodash'
import { ref } from 'vue'

export const useSearch = () => {
  const keywords = ref<string>('')
  const searchType = ref<number | null>(null)

  /** 清空输入 */
  const handleClean = () => {
    keywords.value = ''
    searchType.value = 1
  }
  return {
    keywords,
    searchType,
    handleClean
  }
}

export const useSuggestion = () => {
  const suggestions = ref<Array<any>>([])

  const getList = async (keywords: string) => {
    const res = await axios.get(`/api/search/suggest?keywords=${keywords}`)
    const list = _.flatMap(_.omit(res.data?.result, 'order'))
    suggestions.value = list
  }

  return {
    suggestions,
    getList
  }
}

export const useResult = () => {
  const songs = ref<Array<any>>([])

  const getResultList = async (keywords: string) => {
    if (keywords) {
      const {
        data: { result }
      } = await axios.get(`/api/search?keywords=${keywords}`)
      songs.value = result.songs || []
    }
  }

  return {
    songs,
    getResultList
  }
}

export const useHistory = () => {
  const KEY = 'search-history'

  const getHistory = (): string[] => {
    const historyStr = localStorage.getItem(KEY)
    return historyStr ? JSON.parse(historyStr) : []
  }

  const history = ref<Array<string>>(getHistory())

  const addHistory = (word: string) => {
    if (word === '') {
      return
    }
    history.value = _.uniq([word, ...history.value])
    localStorage.setItem(KEY, JSON.stringify(history.value))
  }

  const clearHistory = () => {
    history.value = []
    localStorage.setItem(KEY, JSON.stringify([]))
  }

  return {
    history,
    addHistory,
    clearHistory
  }
}
