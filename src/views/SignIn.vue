<template>
    <h1>Login </h1>
    <p><input type="email" placeholder="email" v-model="email"></p>
    <p><input type="password" placeholder="password" v-model="password"></p>
    <p><button @click="login()">Login</button></p>
    <h3 style="color:red">{{errMsg}}</h3>
    <p><button @click="singInWithGoogle">Sign in with Google</button></p>
</template>

<script>
import {ref} from 'vue'
import {useRouter} from 'vue-router'

import { getAuth, signInWithEmailAndPassword,
          signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default {
    setup() {
        const email = ref('')
        const password = ref('')
        const router = useRouter()
        const errMsg = ref()
        const login = ()=>{
            signInWithEmailAndPassword(getAuth(), email.value, password.value)
            .then((userCredential) => {
                // Signed in 
                console.log('Succesfully registed')
                console.log(userCredential.user)
                console.log(getAuth().currentUser)
                router.push('/feed')
            })
            .catch((error) => {
                console.error(error.code);
                switch(error.code) {
                    case "auth/invalid-email":
                        errMsg.value = 'Invalid email'
                        break;
                    case "auth/user-not-found":
                        errMsg.value = 'No account with that email was found'
                        break;
                    case "auth/wrong-password":
                        errMsg.value = 'Incorrect password'
                        break;
                    default:
                        errMsg.value = 'Email or password was incorrect'
                        break;
                }
            });
        }


        const singInWithGoogle = ()=> {
            const provider = new GoogleAuthProvider();
            signInWithPopup(getAuth(), provider)
            .then((result) => {
                console.log(result.user);
                console.log(result.user.displayName);
                console.log(result.user.email);
                console.log(result.user.photoURL)
                router.push('/feed');
            }).catch((error) => {
                console.error(error)
            });
        }
        

        return {email, password, errMsg, login, singInWithGoogle}
    },
}
</script>