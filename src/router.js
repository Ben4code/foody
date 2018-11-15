import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './components/Dashboard'
import AddSmoothie from './components/AddSmoothie'
import EditSmoothie from './components/EditSmoothie.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/add',
      name: 'addsmoothie',
      component: AddSmoothie
    },
    {
      path: '/edit-smoothie/:smoothie_slug',
      name: 'editSmoothie',
      component: EditSmoothie
    },
  ]
})
