import { createStore } from 'vuex'
import { auth } from './auth'
import { goods } from './goods'

export const store = createStore({
  state: {},
  modules: {
    auth,
    goods,
  }
})