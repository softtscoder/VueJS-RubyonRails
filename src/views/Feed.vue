<template>
  <div class="bar flex">
    <div id="sidebar" class="font-semibold h-screen pt-5" style="background-color: #D9D9D9; color: #C20000; width: 200px; box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;">
        <div class="header h-2/6 flex-col">
            <div class=" ">
                <img class="rounded-full block m-auto p-auto" src="@/assets/tttung.jpg"> 
            </div>
            <h1 class="text-2xl mt-2 text-center">B.sĩ Tôn Thất Tùng</h1>
        </div>
        <div class="mt-20 text-center">
            <ul class="">
                <li class="mt-3 text-3xl hover:text-3xl hover:text-stone-500 cursor-pointer ease-out duration-200">Home</li>
                <li class="mt-3 text-3xl hover:text-3xl hover:text-stone-500 cursor-pointer ease-out duration-200">About Me</li>
                <li class="mt-3 text-3xl hover:text-3xl hover:text-stone-500 cursor-pointer ease-out duration-200">What I Do</li>
                <li class="mt-3 text-3xl hover:text-3xl hover:text-stone-500 cursor-pointer ease-out duration-200">Portfolio</li>
                <li class="mt-3 text-3xl hover:text-3xl hover:text-stone-500 cursor-pointer ease-out duration-200">Workflow</li>
                <li class="mt-3 text-3xl hover:text-3xl hover:text-stone-500 cursor-pointer ease-out duration-200">My Clients</li>
                <li class="mt-3 text-3xl hover:text-3xl hover:text-stone-500 cursor-pointer ease-out duration-200">Contact Me</li>
            </ul>
        </div>
    </div>

    <div id="navbar" class="h-28 rounded-b-3xl" style="background-color: #D9D9D9; color: #C20000; width: calc(100vw - 200px); left:200px; box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;">
      <div class="navbar__hamburger"><i class="fa-solid fa-bars"></i></div>
      <div class="navbar__userInfo">
        <img v-bind:src="user.photoUrl" alt="" class="navbar__userInfo-avatar">
        <p class="navbar__userInfo-text">{{user.name}}</p>
      </div>
    </div>

  </div>
        <a href="" @click="handlesSignOut" >Sign Out</a>


</template>

<script>
import {useRouter} from 'vue-router'
import { useStore } from "vuex"
import {onMounted, ref, reactive} from 'vue'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    let user = reactive({name: "", email: "", photoUrl: ""})

    user = store.state.userInfo;
    console.log('userInfo', user);
    
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

    return {handlesSignOut, user}
  },
}
</script>

<style scoped>
  .modal-open {
    padding: 0;
  }

  #navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }

  .navbar__hamburger {
    font-size: 4.5rem;
    color: black;
  }

  .navbar__userInfo {
    font-size: 2rem;
    display: flex;
    align-items: center;
  }

  .navbar__userInfo-avatar {
    width: 30px;
    margin-right: 10px;
    border-radius: 50%;
  }

  .navbar__userInfo-text {
    font-size: 1.5rem;
    font-weight: 600;
  }

</style>