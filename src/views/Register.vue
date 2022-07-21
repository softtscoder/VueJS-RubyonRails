<template>
    <h1>Create an Account</h1>
    <p><input type="email" placeholder="email" v-model="email"></p>
    <p><input type="password" placeholder="password" v-model="password"></p>
    <p><button @click="register()">Submit</button></p>
    <p><button @click="singInWithGoogle">Sign in with Google</button></p>
</template>

<script>
import {ref} from 'vue'
import {useRouter} from 'vue-router'

import { getAuth, createUserWithEmailAndPassword,
          signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default {
    setup() {
        const email = ref('')
        const password = ref('')
        const router = useRouter()

        const register = ()=>{
            createUserWithEmailAndPassword(getAuth(), email.value, password.value)
            .then((userCredential) => {
                // Signed in 
                console.log('Succesfully registed')
                console.log(userCredential.user)
                console.log(getAuth().currentUser)
                router.push('/feed')
            })
            .catch((error) => {
                console.error(error.code);
                console.error(error.message);
            });
        }

        const singInWithGoogle = ()=> {
            const provider = new GoogleAuthProvider();
            signInWithPopup(getAuth(), provider)
            .then((result) => {
                console.log(result.user);
                router.push('/feed');
            }).catch((error) => {
                console.error(error)
            });
        }

        return {email, password, register, singInWithGoogle}
    },
}
</script>