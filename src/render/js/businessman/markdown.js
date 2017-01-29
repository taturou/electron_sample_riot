import {worker} from 'businessman';

worker.registerStore({
  type: 'markdown',
  state: '',
  mutations: {
    set: (state, text) => {
      return text;
    },
  },
  actions: {
    set: (commit, text) => {
      commit('set', text);
    },
  },
  getters: {
    text: (state) => {
      return state;
    }
  }
});