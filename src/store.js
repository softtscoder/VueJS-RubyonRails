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
      postsLen: null,
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

    removeDeletedPost(state, deletedId) {
      state.posts = state.posts.filter(post => post.id != deletedId);
    },

    setEditPost(state, postPayLoad) {
      state.post = postPayLoad;
      console.log('state.post in mutations', state.post)
    },

    setPosts(state, postsPayLoad) {
      state.postsLen = postsPayLoad.length;
      state.posts = postsPayLoad;
      console.log('posts len in commit', state.postsLen);
      // return postsPayLoad.length;
    },

    setNewPost(state, addInfo) {
      state.postInfo = addInfo;
      console.log('state.postInfo', state.postInfo);
      state.posts.push(addInfo);
      console.log('state.posts in commit', state.posts)
      state.postsLen = state.posts.length;
      console.log('postsLen in commit', state.postsLen);
    },

    testCommit(state, data) {
      // state.postsLen = data.length;
      console.log('data in testCommit', data);
      // console.log('data len in testCommit', data.value.length);
      console.log('state.postsLen in testCommit', state.postsLen);
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
        commit('removeDeletedPost', id)
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
      //  this.state.postInfo = result;
       commit("setNewPost", result);
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

    async fetchAllPostsAsync({ commit, rootState }) {
      try {
        const response = await fetch("http://localhost:3000/items");

        if (!response.ok) throw new Error("Something went wrong");

        const data = await response.json();
        this.state.posts = data;
        this.state.postsLen = this.state.posts.length; 
        console.log(this.state.postsLen);
        commit("setPosts", data);

        return data;
        console.log(this.state.posts[0]);
        
      } catch (err) {
        // commit("setError", err);
        console.log(err);
      }
    },

    

  },

});

export default store;
