<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/feed">Feed</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/sign-in">Login</router-link> |
    <button @click="handlesSignOut" v-if="isLoggedIn">Sign Out</button> -->

  </div>
  <router-view/>
</template>

<script>
import {useRouter} from 'vue-router'
import {onMounted, ref} from 'vue'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'

export default {
  setup() {
    const router = useRouter()
    const isLoggedIn = ref(false)
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isLoggedIn.value = true
        // ...
      } else {
        isLoggedIn.value = false

      }
    });


 
    const handlesSignOut = ()=> {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
        console.log('Sign-out successful')
        router.push('/')
      })
        .catch((error) => {
        console.error('Sign-out error')
      });
    }

    return {handlesSignOut, isLoggedIn}

  },
}
</script>


<style>
* {
  margin: 0;
  padding: 0;
  font-size: 62.5%;
  line-height: 1.6rem;
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
}
</style>
