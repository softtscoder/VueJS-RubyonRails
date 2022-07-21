<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/feed">Feed</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/sign-in">Login</router-link> |
    <button @click="handlesSignOut" v-if="isLoggedIn">Sign Out</button>

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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
