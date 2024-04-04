import { data } from '../../api/api'

export const goods = {
  state: () => ({
    data: []
  }),
  mutations: {
    SET_DATA(state, data) {
      state.data = data;
    },
  },
  actions: {
    getData({commit}, {limit, offset}) {
      return new Promise((resolve, reject) => {
        data(limit, offset).then(result => {
          commit('SET_DATA', result.data)
          resolve(result.data)
        }).catch(reject)
      })
    },
  },
  getters: {}
}