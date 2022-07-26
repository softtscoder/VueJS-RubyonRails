<template>
  <div class="bar flex">
    <div id="sidebar" class="font-semibold h-screen pt-5" style="background-color: #6bcfa2; color: #CC0000; width: 200px; box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;">
        <div class="header h-2/6 flex-col">
        </div>
        <div class="mt-20 text-center">
            <ul class="">
                <li class="flex justify-start"><router-link to="/" class=" vcl mt-3 text-3xl hover:text-3xl hover:text-stone-500 cursor-pointer ease-out duration-200">Home</router-link></li>
                <li class="mt-3 text-3xl hover:text-3xl hover:text-stone-500 cursor-pointer ease-out duration-200 text-left">All Products</li>
                <li class="mt-3 text-3xl hover:text-3xl hover:text-stone-500 cursor-pointer ease-out duration-200 text-left"  data-toggle="modal" data-target="#addProduct-modal" @click="reconizeAction('addProduct')">Add Products</li>
                <li class="mt-3 text-3xl hover:text-3xl hover:text-stone-500 cursor-pointer ease-out duration-200 text-left">Profile</li>
            </ul>
        </div>
    </div>

    <main>

      <div id="navbar" class="h-24 rounded-b-3xl" style="background-color: #bbf0d8; color: #CC0000; width: calc(100vw - 200px); left:200px; box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;">
        <div class="navbar__hamburger"><i class="fa-solid fa-bars"></i></div>
        <div class="navbar__userLink">
          <div class="navbar__userLink-info " >
            <div class="flex items-center navbar__userLink-info-hoverr">
              <img v-bind:src="user.photoURL" alt="" class="navbar__userLink-info-avatar">
              <div class="navbar__userInfo-text">{{user.displayName}} </div>
            </div>

            <ul class="navbar__userLink-menu">
              <li class="navbar__userLink-menu-item">About me</li>
              <li class="navbar__userLink-menu-item">My account</li>
              <li class="navbar__userLink-menu-item navbar__userLink-menu-item-separate" @click="handlesSignOut">Sign out</li>
            </ul>
          </div>
        </div>
        
      </div>
      <div class="mainBoard">
        <div class='mainBoard-item'  v-for="post in posts" :key="post.id">
          <div class="item-header">

            <img :src="post.image" alt="" class="item-header-img">
            <div class="item-header-content">
              <p style="font-size: 1.5rem; font-weight: 600;">{{post.name}}</p>
              <p style="font-size: 1.3rem;">${{post.price}}</p>
            </div>
          </div>
          <div class="item-body">
            
            <!-- <p class="flex"><img src="https://img.icons8.com/arcade/16/FA5252/experimental-gift-arcade.png"/><span style="height: 2.1rem; line-height:2.1rem; font-size: 1.3rem;">{{post.genre}}</span></p> -->
            <p class="item-body-genre"><i class="fa-regular fa-calendar-days text-2xl"></i>{{post.genre}}</p>
            <p class="item-body-created_time"><i class="fa-regular fa-calendar-days text-2xl"></i>{{post.created_time}}</p>
            <p class="item-body-status" :class="post.status">{{post.status}}</p>
          </div>

          <div class="item-footer">
            <button class="item-editBtn" @click="reconizeAction(post.id)" data-toggle="modal" data-target="#addProduct-modal">Edit</button>
            <button class="item-deleteBtn" @click="deleteProduct(post.id)">Delete</button>
          </div>
          
          <!-- <div class="price">Price: {{ transaction.price }}</div> -->
        </div>

      </div>
    </main>


    <!-- Product Modal -->
    <div class="modal fade" id="addProduct-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header" style="background-color: #bbf0d8; color: #CC0000;">
            <h5 v-if="createFlag" class="modal-title" id="exampleModalLabel" >Add Product</h5>
            <h5 v-else class="modal-title" id="exampleModalLabel" >Edit Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" style="font-size: 1.5rem">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Product name</label>
                <input v-model="form.name" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Product name">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Price</label>
                <input v-model="form.price" type="text" class="form-control" id="exampleInputPassword1" placeholder="Price">
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect1">Genre</label>
                <h1 style="font-size: 1.3rem;">{{form.genre}}</h1>
                <select v-model="form.genre" class="form-control" id="exampleFormControlSelect1">
                  <option>Book</option>
                  <option>Bag</option>
                  <option>Shoes</option>
                  <option>Clothes</option>
                  <option>Food</option>
                </select>
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect1">Status</label>
                <select v-model="form.status" class="form-control" id="exampleFormControlSelect1">
                  <option>Delivering</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Created at</label>
                <input v-model="form.created_time" type="date" class="form-control" id="exampleInputPassword1" placeholder="Price">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button v-if="createFlag" type="button" class="btn btn-primary btn-lg bg-primary" data-dismiss="modal" @click="addProduct">Add new product</button>
            <button data-dismiss="modal" v-else type="button" class="btn btn-primary btn-lg bg-primary"  @click="editProduct(itemId)">Save changes</button>
            
            <button type="button" class="btn btn-danger btn-lg bg-danger" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>



  </div>


</template>

<script>
import {useRouter} from 'vue-router'
import { useStore } from "vuex"
import {onMounted, ref, reactive, computed} from 'vue'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const auth = getAuth();
    const user = auth.currentUser;
    console.log('user in auth.current', user)
    const isLoggedIn = ref(false);
    let createFlag =ref(true);
    // let editFlag = ref(false);
    const itemId = ref(null);
    // let posts = ref(null)
    let form = reactive({name: '', price: '', genre: '', status: '', created_time: ''});
    // let user = reactive({name: "", email: "", photoUrl: ""})

    // user = store.state.userInfo;
    // store.disptach('fetchCurrentUser', {email: })
    // console.log('userInfo', user);
    store.dispatch("fetchAllPosts");
    const posts = computed(() => store.state.posts)
    console.log('posts after dispatch', posts);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        isLoggedIn.value = true
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

    //Delete product
    const deleteProduct = (index) => {
      console.log('index in deleteProduct feed', index)
      store.dispatch('deleteProduct', {id: index});
    }
    
    //Get product ID
    const getProduct = (index) => {
      itemId.value = index;
      console.log('itemId in getProduct', itemId.value);
      let found = posts.value.find(e => e.id === index);
      form.name = found.name;
      form.price = found.price;
      form.genre = found.genre;
      form.status = found.status;
      form.created_time = found.created_time;
    }

    //Edit product
    const editProduct = (index) => {
      console.log('index in editProduct', index);
      console.log('form in editProduct', form);
      store.dispatch('fetchPost', {id: index, editInfo: form});
      let found = posts.value.find(e => e.id === index)
      for (const property in found) {
        if(property !== 'id') {
          found[property] = form[property];
        }
      }
      // createFlag.value = true;
    }

    //Add products
    const addProduct = () => {
      console.log(form);
      store.dispatch('addProduct', {addInfo: form});

    }

    const reconizeAction = (res) => {
      if(typeof(res) === 'number') {getProduct(res); createFlag.value = false;}
      else if(typeof(res) === 'string') { resetForm(); createFlag.value = true;}
    }

    const resetForm = () => {
      for (const property in form) {
        if(property !== 'id') {
          form[property] = '';
        }
      }
    }

    return {handlesSignOut, user, posts, form, addProduct, editProduct, 
            getProduct, reconizeAction, createFlag, itemId, deleteProduct}
  },
}
</script>

<style scoped>
  @import '../assets/css/Feed.css';

  

</style>