import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app';

const config = {
    apiKey: "AIzaSyDKbCgP44DxlN2gOwUcIGiAS8BvfcSMv-A",
  authDomain: "products-170bc.firebaseapp.com",
  projectId: "products-170bc",
  storageBucket: "products-170bc.appspot.com",
  messagingSenderId: "808104047541",
  appId: "1:808104047541:web:0f063feffaaaeb814adffc",
  measurementId: "G-ER1GFQYFSN"
};

initializeApp(config);

createApp(App).use(router).mount('#app')
