import { createStore } from "vuex";
import {useRouter} from 'vue-router';
import { getAuth, createUserWithEmailAndPassword,
    signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const store = createStore({
  
  state() {
    return {
      signInFlag: false,
      // userInfo: {
      //   name: '',
      //   email: '',
      //   photoUrl: ''
      // },
      posts: [],
      post: null,
      postInfo: {name: '', price: '', genre: '', status: '', created_time: ''},
    };
  },

  mutations: {
    increment(state) {
      state.count++;
    },

    setTransaction(state, transactionPayload) {
      state.transaction = transactionPayload;
    },

    setEditPost(state, postPayLoad) {
      state.post = postPayLoad;
      console.log('state.post in mutations', state.post)
    },

    setPosts(state, postsPayLoad) {
      state.posts = postsPayLoad;
    },

    setNewPost(state, addInfo) {
      state.postInfo = addInfo;
      state.posts.push(addInfo);
    },
  },

  actions: {
    // async fetchTransaction({ commit }, { id }) {
    //   const res = await fetch("http://localhost:3000/transactions/" + id);
    //   const data = await res.json();

    //   commit("setTransaction", data);
    // },

    //DELETE
    async deleteProduct({commit}, {id}) {
      fetch('http://localhost:3000/items/' + id, { method: 'DELETE' })
      .then((res) => {
        console.log('delete succesfully');
        // commit('deleteProduct')
      });
    },

    //PUT
    async fetchPost({commit}, {id, editInfo}) {
      console.log('id in actions', id);
      console.log('editInfo in actions', editInfo);
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editInfo)
      };
      fetch('http://localhost:3000/items/' + id, requestOptions)
      .then(response => response.json())
      .then(data => {
        // items.value.find(e => e.id === index).content = content.value;
        // content.value = ''
        commit('setEditPost', data);
        console.log("update successfully")
      })
      .catch((error) => {
          console.error('Error:', error);
      });
    },

    // POST 
    async addProduct({commit}, {addInfo}) {
      fetch("http://localhost:3000/items", 
        {
          method: "POST",
          body: JSON.stringify(addInfo),
          headers: {
             'Content-Type': 'application/json',
           },
        })
     .then(response => response.json())
     .then(result => {
       console.log('Success:', result);
       // items.value.push({id: result.id, content: result.content, updated_at: result.updated_at})
       commit("setNewPost", addInfo);
     })
     .catch((error) => {
       console.error('Error:', error);
     });
    },

    async fetchAllPosts({ commit }) {
      try {
        const response = await fetch("http://localhost:3000/items");

        if (!response.ok) throw new Error("Something went wrong");

        const data = await response.json();
        commit("setPosts", data);
      } catch (err) {
        // commit("setError", err);
        console.log(err);
      }
    },

    

  },

});

export default store;
