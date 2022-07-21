import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/', component: Home
  },
  {
    path: '/register', component: () => import('../views/Register.vue')
  },
  {
    path: '/sign-in', component: () => import('../views/SignIn.vue')
  },
  {
    path: '/feed', component: () => import('../views/Feed.vue'),
    meta: {
      requiresAuth: true,
    }
  }
]

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(), (user) => {
        removeListener();
        resolve(user)
      },
      reject
    )
  })
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// GOOD
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if(await getCurrentUser()) {
      next()
    } else {
      alert('you dont have access')
      next('/')
    }
  }
  else next()
})

export default router
