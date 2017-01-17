import {worker} from 'businessman';

worker.registerStore({
  type: 'counter',
  state: 0,
  mutations: {
    increment: (state, num) => {
      return state += num;
    },
    decrement: (state, num) => {
      return state -= num;
    }
  },
  actions: {
    increment: (commit, num = 1) => {
      commit('increment', num);
    },
    decrement: (commit, num = 1) => {
      commit('decrement', num);
    }
  },
  getters: {
    absolute: (state) => {
      return Math.abs(state);
    }
  }
});

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

import Redmine from 'node-redmine';
const hostname = 'http://thq-server:8001';
const config = {
  apiKey: '69e0197754c43cda16d90de771dc036034f6574c',
  format: 'json'
};

worker.registerStore({
  type: 'redmine',
  state: {issues: []},
  mutations: {
    get: (state, issues) => {
      state.issues = issues;
      return state;
    },
    clear: (state) => {
      state.issues = [];
      return state;
    }
  },
  actions: {
    get: (commit, options) => {
      let redmine = new Redmine(hostname, config);

      redmine.issues(
        {
          assigned_to_id: 'me',
          limit: options.limit
        },
        (err, data) => {
          if (err) throw err;

          let issues =[];
          data.issues.forEach((issue, index, array) => {
            issues.push(issue);
          })
          commit('get', issues);
        }
      );
    },
    clear: (commit) => {
      commit('clear');
    }
  },
  getters: {
    issues: (state) => {
      return state.issues;
    }
  }
});

worker.start();