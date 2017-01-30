import {worker} from 'businessman';
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
    projects: []
  },
  mutations: {
    issues: (state, issues) => {
      state.issues = issues;
      return state;
    },
    projects: (state, projects) => {
      state.projects = projects;
      return state;
    },
    clear: (state) => {
      state = {
        issues: [],
        projects: []
      };
      return state;
    },
    error: (state) => {
      return state;
    }
  },
  actions: {
    issues: (commit, options) => {
      let redmine = new Redmine(options.hostname, config);
      redmine.issues(
        {
          assigned_to_id: 'me',
          limit: options.limit
        },
        (err, data) => {
          if (err) commit('error', err);
          commit('issues', data.issues);
        }
      );
    },
    projects: (commit, options) => {
      let redmine = new Redmine(options.hostname, config);
      redmine.projects(
        {
          limit: options.limit
        },
        (err, data) => {
          if (err) commit('error', err);
          let projects = data.projects.map((org) => {
            let pj = {};
            for (let key in org) {
              if (key !== 'custom_fields') {
                pj[key] = org[key];
              }
            }
            for (let field of org.custom_fields) {
              pj[field.name] = field.value;
            }
            return pj;
          });
          commit('projects', projects);
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