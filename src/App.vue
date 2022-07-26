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

    return {}

  },
}
</script>


<style>
* {
  margin: 0;
  padding: 0;
  font-size: 62.5%;
  line-height: 1.6rem;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  box-sizing: border-box;
}
</style>
