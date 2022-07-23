import { createStore } from "vuex";
import {useRouter} from 'vue-router';
import { getAuth, createUserWithEmailAndPassword,
    signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const store = createStore({
  
  state() {
    return {
      signInFlag: false,
      userInfo: {
        name: '',
        email: '',
        photoUrl: ''
      },
    };
  },

  mutations: {
    increment(state) {
      state.count++;
    },

    setTransaction(state, transactionPayload) {
      state.transaction = transactionPayload;
    },

    setTransactions(state, transactionsPayLoad) {
      state.transactions = transactionsPayLoad;
    },

    setSignInFlag(state, user) {
      // state.signInFlag = true;
      // state.userInfo.name = user.displayName;
      // console.log(state.userInfo.name)
      // console.log('mutation signInFlag',state.signInFlag)
      // state.userInfo.email = user.email;
      // state.userInfo.photoUrl = user.photoURL;
    },
  },

  actions: {
    async fetchTransaction({ commit }, { id }) {
      const res = await fetch("http://localhost:3000/transactions/" + id);
      const data = await res.json();

      commit("setTransaction", data);
    },

  },
});

export default store;
