<template>
  <div class="bar">
    <input type='checkbox' id='toggle' style="position: absolute; left: -20px">
    <div id="sidebar">
      <div class="mt-15 text-center sidebar-menu">
          <ul class="sidebar__items">
              <li><router-link to="/"><i class="fa-solid fa-house-user"></i>Home</router-link></li>
              <li ><router-link to="/feed"><i class="fa-solid fa-list"></i>All Products</router-link> </li>
              <li class="addProductBtn" data-toggle="modal" data-target="#addProduct-modal" @click="reconizeAction('addProduct')"><i class="fa-solid fa-circle-plus"></i>Add Products</li>
          </ul>
      </div>

      <div class="sidebar-search">
        <p class="sidebar-search__text"><i class="fa-solid fa-magnifying-glass"></i>Search</p>
        <div class="sidebar-search__input">

          <div class="search-item">
            <p class="search-item__text">Name</p>
            <input v-model="searchName" class="search-item-name" placeholder="search by name" />
          </div>
          
          <div class="search-item">
            <p class="search-item__text">Genre</p>
            <select v-model="searchGenre" class="search-item-genre">
              <option value='Book'>Book</option>
              <option value='Bag'>Bag</option>
              <option value='Shoes'>Shoes</option>
              <option value='Clothes'>Clothes</option>
              <option value='Food'>Food</option>
            </select>
          </div>
          
          <div class="search-item">
            <p class="search-item__text">Status</p>
            <select v-model="searchStatus" class="search-item-status">
              <option>Delivering</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
          
          

        </div>
          <button class="clearSearch" @click="clearSearch">Clear</button>
      </div>

    </div>

    <main>

      <div id="navbar">
        <label for="toggle" class="navbar__hamburger"><i class="fa-solid fa-bars"></i></label>
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
      <!-- <div class="mainBoard" v-if="postsLength > 0"> -->
      <div class="notice">
        <div class="notice-delivering"><span>{{noticeDelivering}} Delivering</span></div>
        <div class="notice-delivered"><span>{{noticeDelivered}} Delivered</span></div>
        <div class="notice-cancelled"><span>{{noticeCancelled}} Cancelled</span></div>
      </div>
      
      <div v-if="noPostsFound === false">
        <div class="mainBoard">
        
        
          <div class='mainBoard-item' v-for="post in filteredItems" :key="post.id" :class="'mainBoard-item-'+[post.id]">
            <div class="item-header">

              <img :src="post.image" alt="" class="item-header-img">
              <div class="item-header-content">
                <p style="font-size: 1.5rem; font-weight: 600;">{{post.name}}</p>
                <p style="font-size: 1.3rem;">${{post.price}}</p>
                <p class="item-body-status" :class="post.status">{{post.status}}</p>
              </div>
            </div>
            <div class="item-body">
              
              <!-- <p class="flex"><img src="https://img.icons8.com/arcade/16/FA5252/experimental-gift-arcade.png"/><span style="height: 2.1rem; line-height:2.1rem; font-size: 1.3rem;">{{post.genre}}</span></p> -->
              <p class="item-body-genre"><i class="fa-solid fa-umbrella-beach text-2xl"></i>{{post.genre}}</p>
              <p class="item-body-created_time"><i class="fa-regular fa-calendar-days text-2xl"></i>{{post.created_time}}</p>
            </div>

            <div class="item-footer" >
              <button class="item-editBtn" @click="reconizeAction(post.id)" data-toggle="modal" data-target="#addProduct-modal">Edit</button>
              <button class="item-deleteBtn" @click="deleteProduct(post.id)">Delete</button>
            </div>
            
            <!-- <div class="price">Price: {{ transaction.price }}</div> -->
          </div>
        </div>


      </div>

      <div v-else class="noPostFound">No product found :((</div>

      <!-- <div id="container"></div> -->
  
      <!-- <button class="addItem">Add New Item</button> -->
      <div class="pagination">
        <button class="pagePrev" style="font-size: 2rem;"><i class="fa-solid fa-angle-left"></i></button>
        <div id="control">
        </div>
        <button class="pageNext" style="font-size: 2rem;"><i class="fa-solid fa-angle-right"></i></button>
      </div>
      

    </main>


   


  </div>

    <!-- Product Modal -->
    <div class="modal fade" id="addProduct-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header" style="background-color: #bbf0d8; color: #CC0000;">
            <h5 v-if="createFlag" class="modal-title addItem" id="exampleModalLabel">Add Product</h5>
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
                <select v-model="form.genre" class="form-control" id="exampleFormControlSelect1">
                  <option></option>
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
                  <option></option>
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
            <button v-if="createFlag" type="button" class="btn btn-primary btn-lg bg-primary addProduct" data-dismiss="modal" @click="addProduct">Add new product</button>
            <button data-dismiss="modal" v-else type="button" class="btn btn-primary btn-lg bg-primary"  @click="editProduct(itemId)">Save changes</button>
            
            <button type="button" class="btn btn-danger btn-lg bg-danger" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {useRouter} from 'vue-router'
import { useStore, rootState  } from "vuex"
import {onMounted, ref, reactive, computed, watch} from 'vue'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'

export default {
  setup() {    
    const root = ref(null);
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

    let noticeDelivering = ref(null);
    let noticeDelivered = ref(null);
    let noticeCancelled = ref(null);

    let searchName = ref('');
    let searchStatus = ref('');
    let searchGenre = ref('');

    let element;
    let slideIndex = 0;    //current pagination page
    let numBtn;            // number of pages
    let buttons;            // Get all the pagination buttons by document.querySelectorAll(".btn")
    let maxItemsPerPage = 8;
    let addItemBtn;      //Add New Item button
    let prev;
    let next;
    let selectElement;

    let posts = reactive([]);
    let filteredItems = ref([]);

    const postsLength = ref(null);
    const waitDispatch = async () => {
      posts = await store.dispatch("fetchAllPostsAsync");
      return posts;
    }
    waitDispatch()
    .then((result) => {
      posts = result;
      filteredItems.value = result;
      // console.log(filteredItems);
      // console.log(filteredItems.length);

      postsLength.value = filteredItems.value.length;
      console.log('postsLength', postsLength.value); // => null
      
      prev.addEventListener('click', ()=>{
        slideIndex -= 1;
        resetPageIndex(slideIndex);
        showItems(slideIndex);
      })

      next.addEventListener('click', ()=>{
        slideIndex += 1;
        resetPageIndex(slideIndex);
        showItems(slideIndex);
      })

      setNumBtn(postsLength.value, 0);
      setClickBtn();
    })

    // store.dispatch("fetchAllPosts");
    // posts = computed(() => store.state.posts);
    // // filteredItems = computed(() => store.state.posts);      
      
    // console.log('posts after dispatch', posts);


    onAuthStateChanged(auth, (user) => {
      if (user) {
        isLoggedIn.value = true;
      } else {
        isLoggedIn.value = false;
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
      posts = store.state.posts;
      console.log('posts before delete', posts);
      console.log('index in deleteProduct feed', index)

      store.dispatch('deleteProduct', {id: index});
      let deleteItem = document.querySelector(".mainBoard-item-" +index);
      if (deleteItem) {
        deleteItem.remove();
      }
    }
    
    //Get product ID
    const getProduct = (index) => {
      itemId.value = index;
      console.log('itemId in getProduct', itemId.value);
      let found = posts.find(e => e.id === index);
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
      let found = posts.find(e => e.id === index)
      for (const property in found) {
        if(property !== 'id') {
          found[property] = form[property];
        }
      }
      // createFlag.value = true;
    }

    //Add products
    const watchFlag = ref(false);
    const addProduct = () => {
      console.log('form in addProduct', form);
      store.dispatch('addProduct', {addInfo: form});
      
      store.dispatch('fetchAllPosts');
      posts = store.state.posts;
      watchFlag.value = !watchFlag.value

      console.log('posts after add', posts);
      console.log('store.state.postsLen', store.state.postsLen);
    }

    const reconizeAction = (res) => {
      console.log('res in reconizeAction', res)
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


      

      function setNumBtn(len, str) {
        // console.log(Object.keys(posts.value).length);
        element.innerHTML = ``;
        let tmp = parseInt(len / maxItemsPerPage);
        numBtn = (len%maxItemsPerPage==0) ? tmp : (tmp+1)
        console.log('tmp = ', tmp);
        console.log('numBtn = ', numBtn);
        createBtn(numBtn, str) 
      };

      function createBtn(n, str) {
        for(let i=0; i<n; i++){
          const btn = document.createElement('button');
          btn.className = 'buttonPage';
          let node = document.createTextNode("" +(i+1));
          btn.appendChild(node)
          element.appendChild(btn);
        }
        buttons = document.querySelectorAll(".buttonPage");
        showItems(slideIndex, str);
      }

      /* show fitered items */
      function showItems(n, str) {

        for (let i = 0; i < buttons.length; i++) {
          buttons[i].classList.remove("active");
        }
        buttons[n].classList.add("active");

        filteredItems.value = [];
        // posts = store.state.posts;

        console.log('posts in showItems', posts)
        console.log(posts[posts.length - 1])
        for(let i=0; i<maxItemsPerPage; i++) {
          
          if(posts[n*maxItemsPerPage+i]) {
            console.log(true)
            filteredItems.value.push(posts[n*maxItemsPerPage+i]);          
          } else {
            break;
          }
        }

        noticeDelivering.value = posts.filter((value) => value.status === 'Delivering').length;
        noticeDelivered.value = posts.filter((value) => value.status === 'Delivered').length;
        noticeCancelled.value = posts.filter((value) => value.status === 'Cancelled').length;
        console.log(filteredItems.value);	//show items after filtered

      }


      /* set click event to buttons */
      
      function setClickBtn() {
        buttons.forEach((item, index) => {
          item.addEventListener('click', ()=>{
            slideIndex = index;
            showItems(slideIndex);
          })
        })
      }


      function resetPageIndex(index) {
        if(index > (buttons.length-1)) {
          slideIndex = buttons.length-1;
        } 
        else if (index < 0) {
          slideIndex = 0
        }
      }


    onMounted(() => {

      element = document.getElementById("control");         //Show pagination buttons
      console.log(element)
      addItemBtn = document.querySelector('.addProduct');
      // console.log(addItemBtn);          //Add New Item button
      prev = document.querySelector('.pagePrev')
      console.log(prev);
      next = document.querySelector('.pageNext')
      console.log(next);

      selectElement = document.querySelectorAll('select');
    })

    postsLength.value = store.state.postsLen;
    watch(()=>store.state.postsLen, (newValue, oldValue) => {
      console.log('watch accessed');
      setNumBtn(store.state.postsLen, 0);
      setClickBtn();
    });


    //SEARCH FUNCTION
    let noPostsFound = ref(false);
    watch([searchName, searchGenre, searchStatus], 
          ([newSearchName, newSearchGenre, newSearchStatus], [oldSearchName, oldSearchGenre, oldSearchStatus]) => {
      posts = store.state.posts;
      posts = posts.filter(element => {
        // 👇️ using AND (&&) operator
        const filterName = element.name.includes(newSearchName);
        const filterGenre = element.genre.includes(newSearchGenre);
        const filterStatus = element.status.includes(newSearchStatus);
        const filterResult = filterName && filterGenre && filterStatus;
        return filterResult;

      });
      console.log('posts in watch', posts);
      if(posts.length > 0) {
        noPostsFound.value = false;
        setNumBtn(posts.length, 0);
        setClickBtn();
      }
      else {
        noPostsFound.value = true;
        noticeDelivering.value = 0;
        noticeDelivered.value = 0;
        noticeCancelled.value = 0;
      }
      
    });

    function clearSearch() {
      console.log(selectElement);
      selectElement.value = '';
      searchName.value = '';
      searchGenre.value = '';
      searchStatus.value = '';
      noPostsFound.value = false;
    }


    return {handlesSignOut, user, posts, filteredItems, form, addProduct, editProduct, 
            getProduct, reconizeAction, createFlag, itemId, deleteProduct,
            filteredItems, postsLength, root, 
            element, addItemBtn, prev, next,
            noticeDelivering, noticeDelivered, noticeCancelled,
            searchName, searchStatus, searchGenre, clearSearch, selectElement, 
            noPostsFound}
  },

}
</script>

<style scoped>
  @import '../assets/css/Feed.css';

  

</style>