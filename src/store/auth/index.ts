import { login } from '../../api/api';

const REFRESH_TOKEN = 'refresh_token'
const ACCESS_TOKEN = 'access_token'

export const auth = {
  state: () => ({
    accessToken: '',
  }),
  mutations: {
    SET_TOKEN(state, tokenPair) {
      state.accessToken = tokenPair.access;
      localStorage.setItem(REFRESH_TOKEN, tokenPair.refresh)
      localStorage.setItem(ACCESS_TOKEN, tokenPair.access)
    },
    SET_ACCESS_TOKEN(state, access) {
      state.accessToken = access;
      localStorage.setItem(ACCESS_TOKEN, access)
    },
    REMOVE_TOKEN(state) {
      state.accessToken = '';
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.removeItem(ACCESS_TOKEN);
    },
  },
  actions: {
    login({ commit }, { email, password }) {
      return new Promise((resolve, reject) => {
        login(email, password).then(result => {
          commit('SET_TOKEN', result.data)
          resolve()
        }).catch(reject)
      })
    },
    setAccessToken({ commit }, { access }) {
      commit('SET_ACCESS_TOKEN', access)
    }
  },
  getters: {
    getRefreshToken({ state }) {
      return localStorage.getItem(REFRESH_TOKEN);
    },
    getAccessToken(state) {
      state.accessToken = state.accessToken || localStorage.getItem(ACCESS_TOKEN);
      return state.accessToken;
    }
  }
}