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
  state: {
    issues: [],
    users: [],
    projects: []
  },
  mutations: {
    issues: (state, issues) => {
      state.issues = issues;
      return state;
    },
    users: (state, users) => {
      state.users = users;
      return state;
    },
    projects: (state, projects) => {
      state.projects = projects;
      return state;
    },
    clear: (state) => {
      state.issues = [];
      return state;
    },
    error: (state) => {
      return state;
    }
  },
  actions: {
    issues: (commit, options) => {
      let redmine = new Redmine(hostname, config);
      redmine.issues(
        {
          assigned_to_id: 'me',
          limit: options.limit
        },
        (err, data) => {
          if (err) commit('error', err);

          let items = [];
          data.issues.forEach((item, index, array) => {
            items.push(item);
          })
          commit('issues', items);
        }
      );
    },
    users: (commit) => {
      let redmine = new Redmine(hostname, config);
      redmine.users(
        {
          status: 1
        },
        (err, data) => {
          if (err) commit('error', err);

          let items = [];
          data.users.forEach((item, index, array) => {
            items.push(item);
          })
          commit('users', items);
        }
      );
    },
    projects: (commit) => {
      let redmine = new Redmine(hostname, config);
      redmine.projects(
        {
        },
        (err, data) => {
          if (err) commit('error', err);

          let items = [];
          data.projects.forEach((item, index, array) => {
            items.push(item);
          })
          commit('projects', items);
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

worker.registerStore({
  type: 'notification',
  state: '',
  mutations: {
    push: (state, text) => {
      return text;
    }
  },
  actions: {
    push: (commit, text) => {
      commit('push', text);
    }
  },
  getters: {
    get: (state) => {
      return state;
    }
  }
});


worker.start();