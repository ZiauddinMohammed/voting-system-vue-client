import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAdminLoggedIn: false,
    isCandidateLoggedIn: false,
    showAdminAlert: false,
    showCandidateAlert: false,
    candidateNames: [],
    loggedInCandidate: {},
    candidates: [],
    hasVoted: true,
  },
  getters: {
    getCandidates(state) {
      return state.candidates;
    },
    getIsAdminLoggedIn(state) {
      return state.isAdminLoggedIn;
    },
    getIsCandidateLoggedIn(state) {
      return state.isCandidateLoggedIn;
    },
    getCandidateNames(state) {
      return state.candidateNames;
    },
    getShowAdminAlert(state) {
      return state.showAdminAlert;
    },
    getShowCandidateAlert(state) {
      return state.showCandidateAlert;
    },
    getLoggedInCandidate(state) {
      return state.loggedInCandidate;
    },
    getHasVoted(state) {
      return state.hasVoted;
    }
  },
  mutations: {
    setCandidates(state, candidates) {
      state.candidates = candidates;
    },
    setIsAdminLoggedIn(state, isAdminLoggedIn) {
      state.isAdminLoggedIn = isAdminLoggedIn;
    },
    setIsCandidateLoggedIn(state, isCandidateLoggedIn) {
      state.isCandidateLoggedIn = isCandidateLoggedIn;
    },
    setCandidateNames(state, candidateNames) {
      state.candidateNames = candidateNames;
    },
    setShowAdminAlert(state, showAdminAlert) {
      state.showAdminAlert = showAdminAlert;
    },
    setShowCandidateAlert(state, showCandidateAlert) {
      state.showCandidateAlert = showCandidateAlert;
    },
    setLoggedInCandidate(state, loggedInCandidate) {
      state.loggedInCandidate = loggedInCandidate;
    },
    setHasVoted(state, hasVoted) {
      state.hasVoted = hasVoted;
    }
  },
  actions: {
    async initCandidatesDetails({commit}) {
      try {
        const config = {
          method: 'get',
          url: 'http://localhost:3000/voter',
        };
        const {data} = await axios(config);
        commit('setCandidates', data);
      }
      catch(error){
        console.error('Initialization Unsuccessful');
      }
    },
    async checkIp({commit}) {
      try {
        const config = {
          method: 'get',
          url: 'http://localhost:3000/voter/checkIp',
        };
        const {data} = await axios(config);
        commit('setHasVoted', data);
      }
      catch(error){
        console.error('CheckIp Unsuccessful');
      }
    },
    async addVote({dispatch, commit}, payload) {
      try {
        const config = {
          method: 'post',
          url: 'http://localhost:3000/voter',
          data: payload,
        };
        axios(config);
        commit('setHasVoted', true);
        dispatch('initCandidatesDetails');
      }
      catch(error){
        console.error('Add Vote Unsuccessful');
      }
    },
    async login({commit}, payload) {
      const config = {
        method: 'post',
        url: `http://localhost:3000/${payload.type}/login`,
        data: payload.form,
      };
      try{
        const {data} = await axios(config);
        if(payload.type === 'admin') {
          sessionStorage.setItem('adminSessionKey', data.adminSessionKey);
          commit('setCandidateNames', data);
          commit('setIsAdminLoggedIn', true);
          commit('setShowAdminAlert', false);
        }
        else if(payload.type === 'candidate') {
          sessionStorage.setItem('candidateSessionKey', data.candidateSessionKey);
          commit('setLoggedInCandidate', data);
          commit('setIsCandidateLoggedIn', true);
          commit('setShowCandidateAlert', false);
        }
      }catch(error) {
        console.error('Login Failed');

        if(payload.type === 'admin') {
          commit('setIsAdminLoggedIn', false);
          commit('setShowAdminAlert', true);
        }
        else if(payload.type === 'candidate') {
          commit('setIsCandidateLoggedIn', false);
          commit('setShowCandidateAlert', true);
        }
      }
    },
    logout({commit}, type) {
      if(type === 'admin') {
        sessionStorage.removeItem('adminSessionKey');
        commit('setIsAdminLoggedIn', false);
      }
      else if(type === 'candidate') {
        sessionStorage.removeItem('candidateSessionKey');
        commit('setIsCandidateLoggedIn', false);
      }
    },
    deleteCandidateAccount({state, commit}, candidateName) {
      const remainedCandidateNames = state.candidateNames.filter((name)=>{
        return name !== candidateName;
      });
      try {
        const key = sessionStorage.getItem('adminSessionKey');
        const config = {
          method: 'post',
          url: 'http://localhost:3000/admin/delete',
          data: {adminSessionKey: key, name: candidateName},
        };
        axios(config);
        commit('setCandidateNames', remainedCandidateNames);
      }
      catch(error){
        console.error('Deletion Unsuccessful');
      }
    },
    addCandidateAccount({state}, payload) {
      const idx = state.candidateNames.indexOf(payload.name);
      if(idx>=0) return;
      try {
        const key = sessionStorage.getItem('adminSessionKey');
        const config = {
          method: 'put',
          url: 'http://localhost:3000/admin',
          data: {adminSessionKey: key, payload},
        };
        axios(config);
        state.candidateNames.push(payload.name);
      }
      catch(error){
        console.error('Addition Unsuccessful');
      }
    },
    updateCandidateDetails({commit}, payload) {
      try {
        const key = sessionStorage.getItem('candidateSessionKey');
        const config = {
          method: 'post',
          url: 'http://localhost:3000/candidate',
          data: {candidateSessionKey: key, payload},
        };
        axios(config);
        commit('setLoggedInCandidate', payload);
      }
      catch(error){
        console.error('Updation Unsuccessful');
      }
    }
  }
});
