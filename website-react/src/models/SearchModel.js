import mirror, {actions} from 'mirrorx'
import config from '../config'

export default mirror.model({
  name: 'search',
  initialState: {
    searchTerm: '',
    currentSearch: '',
    results: [],
    loading: false
  },
  reducers: {
    updateSearchTerm (state, searchTerm) {
      return {...state, searchTerm }
    },
    updateResults (state, results) {
      return {
        ...state,
        results,
        currentSearch: state.searchTerm,
        searchTerm: ''
      }
    },
    startLoading (state) {
      return {...state, loading: true}
    },
    stopLoading (state) {
      return {...state, loading: false}
    }
  },
  effects: {
    async search (_, getState) {
      actions.search.startLoading()

      const searchTerm = getState().search.searchTerm
      const url = config.baseUrl + searchTerm
      const options = {
        headers: {
          'api-key': config.apiKey
        }
      }
      const response = await fetch(url, options)
        .then(data => data.json())
        .catch(err => 'An error has occurred.')

      actions.search.stopLoading()
      actions.search.updateResults(response.value)
    }
  }
})
