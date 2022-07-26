<template>
<body>
  
  <h1 class="title">Tran Huy Khoa</h1>
  <div class="container">
    <div class="description">
      <h2>LIVERPOOL FC</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis laborum recusandae iusto quas ea repudiandae aperiam optio ullam ipsa, modi quos nulla culpa aliquam! Labore voluptatem neque saepe iure assumenda!</p>
      <div class="link">
        <!-- <router-link to="/register" class="register">Register</router-link> -->
        <div v-if="isLoggedIn" class="notLoggedInBtn">
          <router-link to="/feed" class="goToFeedBtn">Go to feed</router-link>
          <a href="" @click="handlesSignOut" class="goToSignOut">Sign Out</a>  
        </div>
        <div v-else>
          <!-- Button trigger modal -->
          <a href="" class="login" data-toggle="modal" data-target="#exampleModal" >Login</a> 
        </div>   
      </div>
    </div>

    <div>
      <img src="../assets/logo.png" alt="" class="logo-img">
    </div>
  </div>


  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Register / Login</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div @click="signInWithGoogle" class="modal-body-login-content loginGg">
            <img src="../assets/gg-logo.png" alt="" class="modal-body-gg-logo">
            <a href="" class="loginBtn ">Sign in with Google</a>
          </div>
          <div @click="singInWithGoogle" class="modal-body-login-content loginFb">
            <img src="../assets/fb-logo.png" alt="" class="modal-body-fb-logo">
            <a href="" class="loginBtn ">Sign in with Google</a>
          </div>

        </div>
        <!-- <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div> -->
      </div>
    </div>
  </div>


  <router-view/>
</body>
</template>

<script>
// @ is an alias to /src
import {ref, computed} from 'vue'
import { useStore } from "vuex"
import {useRouter} from 'vue-router'

import { getAuth, createUserWithEmailAndPassword,
          signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

export default {
  setup() {

    const router = useRouter();
    const store = useStore();
    const auth = getAuth();
    const usersList = ref(null);
    const isLoggedIn = ref(false)
    const fetchURL = 'http://localhost:3000/users/sign_in';

  
    const signInWithGoogle = ()=> {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
      .then((result) => {
        console.log('Sign in with gg successfully');
        // console.log(usersList.value)
        console.log('result.user', result.user);
        const removeModal = document.querySelector('.modal-backdrop');
        removeModal.style.display = "none";
        router.push('/feed')

        // store.state.signInFlag = true;
        // store.state.userInfo.name = result.user.displayName;
        // store.state.userInfo.email = result.user.email;
        // store.state.userInfo.photoUrl = result.user.photoURL;

        // console.log(store.state.signInFlag)
        // console.log(store.state.userInfo.name)
        // console.log(store.state.userInfo.email)
        // console.log(store.state.userInfo.photoUrl)

      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }


    onAuthStateChanged(auth, (user) => {
      if (user) {
        isLoggedIn.value = true
        // ...
      } else {
        isLoggedIn.value = false
      }
    });


    const handlesSignOut = ()=> {
      signOut(auth)
        .then(() => {
          // this.$session.destroy()
        console.log('Sign-out successful')
        router.push('/')
      })
        .catch((error) => {
        console.error('Sign-out error')
      });
    };

    return {handlesSignOut, signInWithGoogle, isLoggedIn}
  }

}
</script>

<style scoped>
  * {
    z-index: 1;
  }

  body {
    /* background-color: #eee; */
    min-height: 100vh;
    width: 100%;
    background-image: url("../assets/CL.jpg");
    background-size: cover;
    
  }

  body::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom right, black, #fafafa);
    opacity: .5;
    z-index: 0;
  }

  .title {
    position: relative;
    top: 20px;
    margin: 0 0 0 10%;
    /* position: relative; */
    font-size: 3.5rem;
    color: crimson;
  }
  
  .container {
    display: flex;
    position: absolute;
    top: 25%;
    height: 500px;
    padding: 0 0 0 10%;
    /* margin: 0 0 0 10%; */
    justify-content: space-around;
  }

  .logo-img {
    width: 30vw;
    transform: translateY(-25%);
  }

  .description {
    width: 50%;
  }

  .description h2 {
    font-size: 3rem;
    color: crimson;
    font-weight: 600;
    /* -webkit-text-stroke: 0.3px #ddd; */
  }

  .description p {
    font-size: 2rem;
    font-weight: 600;
    color: #f9f9f9;
    margin-top: 30px;
    margin-right: 30px;
    line-height: 2.5rem;
  }

  .link {
    position: relative;
    top: 3rem;
    width: 170px;
    display: flex;
    justify-content: space-between;
  }

  .register, .login {
    text-decoration: none;
    font-size: 1.6rem;
    padding: 8px;
    border-radius: 4px;
    color: #f9f9f9;
    width: 80px;
    text-align: center;
    transition: all 0.2s;
  }

  /* .register:hover {
    background-color: #f9f9f9;
    color: crimson;
    border: solid 1px crimson;
  } */

  .login:hover {
    background-color: #f9f9f9;
    color: black;
    border: solid 1px #f9f9f9;
  }

  /* .register {
    background-color: crimson;
    border: solid 1px crimson;
  } */

  .login {
    background-color: rgb(49, 48, 48);
    border: solid 1px rgb(49, 48, 48);
  }

  .modal-title {
    line-height: 100%;
    position: absolute;
    top: 7%;
    font-size: 1.8rem;
  }

  .close {
    font-size: 3.2rem;
  }

  .modal {
    top: 18%;
  }

  .modal {
    z-index: 2000;
  }

  .modal-content {
    height: 250px;
  }

  .loginBtn {
    font-size: 1.6rem;
    margin: 5px 0;
    color: black;
    text-align: center;
    margin-left: 15px;
    font-weight: 500;
    text-decoration: none;
  }

  .modal-body-login-content {
    width: 100%;
    border: solid 1px #ddd;
    margin: 10px 0;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .modal-body-login-content:hover {
    cursor: pointer;
  }

  .modal-body-login-content:hover .loginBtn {
    color: white;
  }

  .modal-body-gg-logo, .modal-body-fb-logo {
    width: 30px;
    height: 30px;
  } 

  .loginGg:hover {
    background-color: crimson;
    opacity: 0.8;
  }

  .loginFb:hover {
    background-color: #4267B2;
    opacity: 0.8;
  }

  .notLoggedInBtn {
    display: flex;
    justify-content: space-between;
    width: 200px;
    height: 30px;
  }

  .goToFeedBtn, .goToSignOut {
    text-decoration: none;
  }

  .goToFeedBtn:hover {
    background-color: #555;
  }

  .goToSignOut:hover {
    background-color: rgb(219, 92, 117);
  }

  .goToFeedBtn {
    width: 80px;
    height: 30px;
    line-height: 30px;
    background-color: black;
    color: white;
    font-size: 1.5rem;
    text-align: center;
    border-radius: 4px;
  }

  .goToSignOut {
    width: 80px;
    height: 30px;
    line-height: 30px;
    background-color: crimson;
    color: white;
    font-size: 1.5rem;
    text-align: center;
    border-radius: 4px;
  }

</style>
